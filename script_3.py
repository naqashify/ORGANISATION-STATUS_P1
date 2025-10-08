# Analyze the specific columns with correct names (including trailing spaces)
cols_to_analyze = ['ORG NAME', 'ORG STATUS ', 'MULTIPLE DOMAIN ', 'BASE STATE', 'MAIN DOMAIN ']

print("Analysis of requested columns:")
print("="*50)

analysis_data = {}

for col in cols_to_analyze:
    clean_col_name = col.strip()
    print(f"\n{clean_col_name}:")
    print(f"  - Unique values: {df[col].nunique()}")
    print(f"  - Null values: {df[col].isnull().sum()}")
    print(f"  - Value counts:")
    value_counts = df[col].value_counts()
    print(value_counts.head())
    
    # Store data for dashboard
    analysis_data[clean_col_name] = {
        'unique_count': df[col].nunique(),
        'null_count': df[col].isnull().sum(),
        'value_counts': value_counts.reset_index()
    }
    
    print("-" * 30)

# Create summary data for dashboard
org_status_data = df['ORG STATUS '].value_counts().reset_index()
org_status_data.columns = ['Status', 'Count']

multiple_domain_data = df['MULTIPLE DOMAIN '].value_counts().reset_index()
multiple_domain_data.columns = ['Has_Multiple_Domains', 'Count']

base_state_data = df['BASE STATE'].value_counts().reset_index()
base_state_data.columns = ['State', 'Count']

main_domain_data = df['MAIN DOMAIN '].value_counts().reset_index()
main_domain_data.columns = ['Domain', 'Count']

# Save data for dashboard
org_status_data.to_csv('org_status_analysis.csv', index=False)
multiple_domain_data.to_csv('multiple_domain_analysis.csv', index=False)
base_state_data.to_csv('base_state_analysis.csv', index=False)
main_domain_data.to_csv('main_domain_analysis.csv', index=False)

# Complete dataset for dashboard
dashboard_data = df[cols_to_analyze].copy()
dashboard_data.columns = [col.strip() for col in dashboard_data.columns]  # Remove trailing spaces
dashboard_data.to_csv('complete_org_data.csv', index=False)

print("\nSummary data files created for dashboard:")
print("- org_status_analysis.csv")
print("- multiple_domain_analysis.csv") 
print("- base_state_analysis.csv")
print("- main_domain_analysis.csv")
print("- complete_org_data.csv")