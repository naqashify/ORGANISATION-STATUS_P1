# Let's check the exact column names first
print("Exact column names in the dataset:")
for i, col in enumerate(df.columns):
    print(f"{i}: '{col}'")

print(f"\nDataset shape: {df.shape}")

# Map the requested columns to actual column names
column_mapping = {
    'Org Name': 'ORG NAME',
    'Org status': 'ORG STATUS', 
    'Multiple Domain': 'MULTIPLE DOMAIN',
    'Base State': 'BASE STATE',
    'Main Domain': 'MAIN DOMAIN'
}

# Find the actual column names
actual_cols = []
for requested, expected in column_mapping.items():
    for actual_col in df.columns:
        if expected.lower() in actual_col.lower():
            actual_cols.append(actual_col)
            print(f"Found: {requested} -> {actual_col}")
            break
    else:
        print(f"Not found: {requested} (expected: {expected})")

print(f"\nActual columns to analyze: {actual_cols}")