EDA outputs created by run_eda_interim.py

summaries/: CSV summaries for schema, numeric stats, top categorical values, and business aggregates.
charts/: PNG charts for distributions, time trends, and correlation matrices.

Suggested reading order:
1. summaries/table_overview.csv
2. *_schema.csv files to inspect missing values and dtypes
3. business summary CSVs such as revenue_by_category.csv
4. charts/*.png for visual exploration