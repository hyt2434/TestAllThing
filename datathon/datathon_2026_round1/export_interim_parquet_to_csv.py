from __future__ import annotations

import argparse
from pathlib import Path

import pandas as pd


def export_parquet_files(input_dir: Path, output_dir: Path) -> None:
    parquet_files = sorted(input_dir.glob("*_base.parquet"))

    if not parquet_files:
        raise FileNotFoundError(
            f"Khong tim thay file '*_base.parquet' trong thu muc: {input_dir}"
        )

    output_dir.mkdir(parents=True, exist_ok=True)

    print(f"Doc parquet tu: {input_dir}")
    print(f"Ghi csv ra: {output_dir}")

    for parquet_file in parquet_files:
        csv_file = output_dir / f"{parquet_file.stem}.csv"
        df = pd.read_parquet(parquet_file)
        df.to_csv(csv_file, index=False, encoding="utf-8-sig")
        print(f"Da xuat: {csv_file.name} | shape={df.shape}")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Doc cac file parquet da clean trong dataset/interim va xuat sang CSV."
    )
    parser.add_argument(
        "--input-dir",
        type=Path,
        default=Path("dataset/interim"),
        help="Thu muc chua cac file parquet da clean. Mac dinh: dataset/interim",
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=Path("dataset/interim/csv_exports"),
        help="Thu muc de ghi file CSV. Mac dinh: dataset/interim/csv_exports",
    )
    return parser


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()
    export_parquet_files(args.input_dir, args.output_dir)


if __name__ == "__main__":
    main()
