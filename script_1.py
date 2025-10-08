# Analyze the specific columns requested
cols_to_analyze = ['ORG NAME', 'ORG STATUS', 'MULTIPLE DOMAIN', 'BASE STATE', 'MAIN DOMAIN']

print("Analysis of requested columns:")
print("="*50)

for col in cols_to_analyze:
    print(f"\n{col}:")
    print(f"  - Unique values: {df[col].nunique()}")
    print(f"  - Null values: {df[col].isnull().sum()}")
    print(f"  - Value counts:")
    print(df[col].value_counts().head())
    print("-" * 30)

# Create summary data for dashboard
org_status_data = df['ORG STATUS'].value_counts().reset_index()
org_status_data.columns = ['Status', 'Count']

multiple_domain_data = df['MULTIPLE DOMAIN'].value_counts().reset_index()
multiple_domain_data.columns = ['Has_Multiple_Domains', 'Count']

base_state_data = df['BASE STATE'].value_counts().reset_index()
base_state_data.columns = ['State', 'Count']

main_domain_data = df['MAIN DOMAIN'].value_counts().reset_index()
main_domain_data.columns = ['Domain', 'Count']

# Save data for dashboard
org_status_data.to_csv('org_status_analysis.csv', index=False)
multiple_domain_data.to_csv('multiple_domain_analysis.csv', index=False)
base_state_data.to_csv('base_state_analysis.csv', index=False)
main_domain_data.to_csv('main_domain_analysis.csv', index=False)
df[cols_to_analyze].to_csv('complete_org_data.csv', index=False)

print("Summary data files created for dashboard.")