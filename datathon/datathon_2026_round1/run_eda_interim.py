from __future__ import annotations

import argparse
from pathlib import Path

import matplotlib.pyplot as plt
import pandas as pd


INTERIM_DIR = Path("dataset/interim")
DAILY_DIR = Path("dataset/daily")
OUTPUT_DIR = Path("outputs/eda")


def read_parquet_tables(folder: Path, pattern: str) -> dict[str, pd.DataFrame]:
    tables: dict[str, pd.DataFrame] = {}
    for path in sorted(folder.glob(pattern)):
        tables[path.stem] = pd.read_parquet(path)
    return tables


def ensure_dirs(base_dir: Path) -> tuple[Path, Path]:
    summary_dir = base_dir / "summaries"
    charts_dir = base_dir / "charts"
    summary_dir.mkdir(parents=True, exist_ok=True)
    charts_dir.mkdir(parents=True, exist_ok=True)
    return summary_dir, charts_dir


def save_dataframe(df: pd.DataFrame, path: Path) -> None:
    df.to_csv(path, index=False, encoding="utf-8-sig")


def series_to_frame(series: pd.Series, index_name: str, value_name: str) -> pd.DataFrame:
    out = series.rename(value_name).reset_index()
    out.columns = [index_name, value_name]
    return out


def table_overview(df: pd.DataFrame, table_name: str) -> pd.DataFrame:
    summary = pd.DataFrame(
        {
            "table_name": [table_name],
            "row_count": [len(df)],
            "column_count": [df.shape[1]],
            "duplicate_rows": [int(df.duplicated().sum())],
            "missing_cells": [int(df.isna().sum().sum())],
        }
    )
    return summary


def schema_summary(df: pd.DataFrame) -> pd.DataFrame:
    missing_count = df.isna().sum()
    out = pd.DataFrame(
        {
            "column_name": df.columns,
            "dtype": [str(dtype) for dtype in df.dtypes],
            "non_null_count": df.notna().sum().values,
            "missing_count": missing_count.values,
            "missing_pct": (missing_count / len(df) * 100).round(2).values,
            "nunique": df.nunique(dropna=True).values,
        }
    )
    return out.sort_values(["missing_pct", "column_name"], ascending=[False, True])


def numeric_summary(df: pd.DataFrame) -> pd.DataFrame:
    numeric_df = df.select_dtypes(include=["number"])
    if numeric_df.empty:
        return pd.DataFrame(columns=["column_name"])

    summary = numeric_df.describe().transpose().reset_index()
    summary = summary.rename(columns={"index": "column_name"})
    return summary.round(4)


def categorical_top_values(df: pd.DataFrame, top_n: int = 10) -> pd.DataFrame:
    cat_cols = df.select_dtypes(include=["object", "category"]).columns.tolist()
    if not cat_cols:
        return pd.DataFrame(columns=["column_name", "value", "count"])

    rows: list[dict[str, object]] = []
    for col in cat_cols:
        counts = df[col].astype("string").fillna("<NA>").value_counts(dropna=False).head(top_n)
        for value, count in counts.items():
            rows.append({"column_name": col, "value": value, "count": int(count)})
    return pd.DataFrame(rows)


def plot_bar(series: pd.Series, title: str, xlabel: str, ylabel: str, output_path: Path) -> None:
    plt.figure(figsize=(10, 6))
    series.plot(kind="bar", color="#2a6f97")
    plt.title(title)
    plt.xlabel(xlabel)
    plt.ylabel(ylabel)
    plt.xticks(rotation=45, ha="right")
    plt.tight_layout()
    plt.savefig(output_path, dpi=150)
    plt.close()


def plot_line(
    df: pd.DataFrame,
    x_col: str,
    y_col: str,
    title: str,
    ylabel: str,
    output_path: Path,
) -> None:
    plot_df = df[[x_col, y_col]].dropna().sort_values(x_col).copy()
    if plot_df.empty:
        return

    plt.figure(figsize=(11, 6))
    plt.plot(plot_df[x_col], plot_df[y_col], color="#bc4749", linewidth=1.8)
    plt.title(title)
    plt.xlabel(x_col)
    plt.ylabel(ylabel)
    plt.tight_layout()
    plt.savefig(output_path, dpi=150)
    plt.close()


def plot_corr_matrix(df: pd.DataFrame, title: str, output_path: Path) -> None:
    numeric_df = df.select_dtypes(include=["number"])
    if numeric_df.shape[1] < 2:
        return

    corr = numeric_df.corr(numeric_only=True)

    fig, ax = plt.subplots(figsize=(12, 10))
    im = ax.imshow(corr, cmap="coolwarm", vmin=-1, vmax=1)
    ax.set_xticks(range(len(corr.columns)))
    ax.set_yticks(range(len(corr.columns)))
    ax.set_xticklabels(corr.columns, rotation=90)
    ax.set_yticklabels(corr.columns)
    ax.set_title(title)

    for i in range(len(corr.index)):
        for j in range(len(corr.columns)):
            ax.text(j, i, f"{corr.iloc[i, j]:.2f}", ha="center", va="center", fontsize=7)

    fig.colorbar(im, ax=ax, fraction=0.046, pad=0.04)
    plt.tight_layout()
    plt.savefig(output_path, dpi=150)
    plt.close()


def build_daily_master_table(daily_tables: dict[str, pd.DataFrame]) -> pd.DataFrame:
    renamed_tables: list[pd.DataFrame] = []

    for name, df in daily_tables.items():
        if "Date" not in df.columns:
            continue

        temp = df.copy()
        temp["Date"] = pd.to_datetime(temp["Date"])

        if name == "sales_daily":
            temp = temp.rename(columns={"Revenue": "revenue", "COGS": "cogs"})

        renamed_tables.append(temp)

    if not renamed_tables:
        return pd.DataFrame()

    merged = renamed_tables[0]
    for temp in renamed_tables[1:]:
        merged = merged.merge(temp, on="Date", how="outer")

    return merged.sort_values("Date")


def create_interim_summaries(
    interim_tables: dict[str, pd.DataFrame], summary_dir: Path, charts_dir: Path
) -> None:
    overview_frames: list[pd.DataFrame] = []

    for table_name, df in interim_tables.items():
        overview_frames.append(table_overview(df, table_name))
        save_dataframe(schema_summary(df), summary_dir / f"{table_name}_schema.csv")
        save_dataframe(numeric_summary(df), summary_dir / f"{table_name}_numeric_summary.csv")
        save_dataframe(categorical_top_values(df), summary_dir / f"{table_name}_top_categories.csv")

        missing_df = schema_summary(df)
        missing_df = missing_df[missing_df["missing_count"] > 0].copy()
        if not missing_df.empty:
            missing_series = missing_df.set_index("column_name")["missing_pct"].sort_values(ascending=False)
            plot_bar(
                missing_series,
                title=f"Missing percentage - {table_name}",
                xlabel="Column",
                ylabel="Missing %",
                output_path=charts_dir / f"{table_name}_missing_pct.png",
            )

    save_dataframe(pd.concat(overview_frames, ignore_index=True), summary_dir / "table_overview.csv")


def create_business_outputs(
    interim_tables: dict[str, pd.DataFrame], daily_tables: dict[str, pd.DataFrame], summary_dir: Path, charts_dir: Path
) -> None:
    orders = interim_tables["orders_base"].copy()
    order_items = interim_tables["order_items_base"].copy()
    products = interim_tables["products_base"].copy()
    payments = interim_tables["payments_base"].copy()
    customers = interim_tables["customers_base"].copy()
    returns = interim_tables["returns_base"].copy()
    geography = interim_tables["geography_base"].copy()
    web_traffic = interim_tables["web_traffic_base"].copy()
    reviews = interim_tables["reviews_base"].copy()

    orders["order_date"] = pd.to_datetime(orders["order_date"])
    web_traffic["date"] = pd.to_datetime(web_traffic["date"])
    reviews["review_date"] = pd.to_datetime(reviews["review_date"])

    order_items["line_revenue"] = (
        order_items["quantity"].fillna(0) * order_items["unit_price"].fillna(0)
        - order_items["discount_amount"].fillna(0)
    )

    order_revenue = (
        order_items.groupby("order_id", as_index=False)["line_revenue"]
        .sum()
        .rename(columns={"line_revenue": "order_revenue"})
    )

    product_revenue = order_items.merge(
        products[["product_id", "category", "segment", "size"]],
        on="product_id",
        how="left",
    )
    revenue_by_category = (
        product_revenue.groupby("category", dropna=False)["line_revenue"]
        .sum()
        .sort_values(ascending=False)
    )
    revenue_by_segment = (
        product_revenue.groupby("segment", dropna=False)["line_revenue"]
        .sum()
        .sort_values(ascending=False)
    )

    order_region = orders.copy()
    order_region["zip"] = order_region["zip"].astype(str).str.strip()
    geography["zip"] = geography["zip"].astype(str).str.strip()
    order_region = order_region.merge(order_revenue, on="order_id", how="left")
    order_region = order_region.merge(geography[["zip", "region"]].drop_duplicates(), on="zip", how="left")
    revenue_by_region = (
        order_region.groupby("region", dropna=False)["order_revenue"]
        .sum()
        .sort_values(ascending=False)
    )

    return_reason = returns["return_reason"].astype("string").fillna("<NA>").value_counts().head(15)
    payment_method = payments["payment_method"].astype("string").fillna("<NA>").value_counts()
    order_status = orders["order_status"].astype("string").fillna("<NA>").value_counts()
    device_type = orders["device_type"].astype("string").fillna("<NA>").value_counts()
    order_source = orders["order_source"].astype("string").fillna("<NA>").value_counts()
    gender_dist = customers["gender"].astype("string").fillna("<NA>").value_counts()
    age_group_dist = customers["age_group"].astype("string").fillna("<NA>").value_counts()
    acquisition_dist = customers["acquisition_channel"].astype("string").fillna("<NA>").value_counts()

    orders_by_day = orders.groupby("order_date").size().rename("order_count").reset_index()
    traffic_by_day = web_traffic.groupby("date", as_index=False)["sessions"].sum()
    reviews_by_day = reviews.groupby("review_date", as_index=False)["rating"].mean()

    for series, filename, title, ylabel in [
        (order_status, "orders_by_status.png", "Orders by status", "Count"),
        (device_type, "orders_by_device_type.png", "Orders by device type", "Count"),
        (order_source, "orders_by_source.png", "Orders by source", "Count"),
        (payment_method, "payments_by_method.png", "Payments by method", "Count"),
        (revenue_by_category.head(15), "revenue_by_category.png", "Revenue by category", "Revenue"),
        (revenue_by_segment.head(15), "revenue_by_segment.png", "Revenue by segment", "Revenue"),
        (revenue_by_region, "revenue_by_region.png", "Revenue by region", "Revenue"),
        (return_reason, "returns_by_reason.png", "Top return reasons", "Count"),
        (gender_dist, "customers_by_gender.png", "Customers by gender", "Count"),
        (age_group_dist, "customers_by_age_group.png", "Customers by age group", "Count"),
        (acquisition_dist, "customers_by_acquisition.png", "Customers by acquisition channel", "Count"),
    ]:
        plot_bar(series, title=title, xlabel="Category", ylabel=ylabel, output_path=charts_dir / filename)

    plot_line(
        orders_by_day,
        x_col="order_date",
        y_col="order_count",
        title="Orders over time",
        ylabel="Order count",
        output_path=charts_dir / "orders_over_time.png",
    )
    plot_line(
        traffic_by_day,
        x_col="date",
        y_col="sessions",
        title="Sessions over time",
        ylabel="Sessions",
        output_path=charts_dir / "sessions_over_time.png",
    )
    plot_line(
        reviews_by_day,
        x_col="review_date",
        y_col="rating",
        title="Average rating over time",
        ylabel="Average rating",
        output_path=charts_dir / "ratings_over_time.png",
    )

    save_dataframe(series_to_frame(revenue_by_category, "category", "revenue"), summary_dir / "revenue_by_category.csv")
    save_dataframe(series_to_frame(revenue_by_segment, "segment", "revenue"), summary_dir / "revenue_by_segment.csv")
    save_dataframe(series_to_frame(revenue_by_region, "region", "revenue"), summary_dir / "revenue_by_region.csv")
    save_dataframe(series_to_frame(order_status, "order_status", "count"), summary_dir / "orders_by_status.csv")
    save_dataframe(series_to_frame(payment_method, "payment_method", "count"), summary_dir / "payments_by_method.csv")
    save_dataframe(series_to_frame(return_reason, "return_reason", "count"), summary_dir / "returns_by_reason.csv")

    daily_master = build_daily_master_table(daily_tables)
    if not daily_master.empty:
        save_dataframe(daily_master, summary_dir / "daily_master_table.csv")
        plot_corr_matrix(
            daily_master,
            title="Correlation matrix - daily features",
            output_path=charts_dir / "daily_correlation_matrix.png",
        )

    order_level = orders.merge(order_revenue, on="order_id", how="left").merge(
        payments[["order_id", "payment_value", "installments"]],
        on="order_id",
        how="left",
    )
    numeric_order_level = order_level[["order_revenue", "payment_value", "installments"]].copy()
    if not numeric_order_level.empty:
        plot_corr_matrix(
            numeric_order_level,
            title="Correlation matrix - order financial features",
            output_path=charts_dir / "order_level_correlation_matrix.png",
        )


def write_readme(output_dir: Path) -> None:
    readme = output_dir / "README.txt"
    readme.write_text(
        "\n".join(
            [
                "EDA outputs created by run_eda_interim.py",
                "",
                "summaries/: CSV summaries for schema, numeric stats, top categorical values, and business aggregates.",
                "charts/: PNG charts for distributions, time trends, and correlation matrices.",
                "",
                "Suggested reading order:",
                "1. summaries/table_overview.csv",
                "2. *_schema.csv files to inspect missing values and dtypes",
                "3. business summary CSVs such as revenue_by_category.csv",
                "4. charts/*.png for visual exploration",
            ]
        ),
        encoding="utf-8",
    )


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Run exploratory data analysis on cleaned interim parquet tables."
    )
    parser.add_argument(
        "--interim-dir",
        type=Path,
        default=INTERIM_DIR,
        help="Directory containing *_base.parquet files.",
    )
    parser.add_argument(
        "--daily-dir",
        type=Path,
        default=DAILY_DIR,
        help="Directory containing daily parquet tables.",
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=OUTPUT_DIR,
        help="Directory where EDA outputs will be written.",
    )
    return parser


def main() -> None:
    args = build_parser().parse_args()
    summary_dir, charts_dir = ensure_dirs(args.output_dir)

    interim_tables = read_parquet_tables(args.interim_dir, "*_base.parquet")
    daily_tables = read_parquet_tables(args.daily_dir, "*.parquet")

    if not interim_tables:
        raise FileNotFoundError(f"No *_base.parquet files found in {args.interim_dir}")

    create_interim_summaries(interim_tables, summary_dir, charts_dir)
    create_business_outputs(interim_tables, daily_tables, summary_dir, charts_dir)
    write_readme(args.output_dir)

    print(f"EDA complete. See outputs in: {args.output_dir}")


if __name__ == "__main__":
    main()
