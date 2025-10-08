import pandas as pd
import numpy as np

# Load the Excel file
df = pd.read_excel('P1-ORGS_DL_MUM_2025.xlsx')

print("Dataset shape:", df.shape)
print("\nColumn names:")
print(df.columns.tolist())

# Display first few rows to understand structure
print("\nFirst 5 rows:")
df.head()