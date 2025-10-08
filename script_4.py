# Clean and consolidate the data for better dashboard visualization
# There seem to be duplicate categories with inconsistent casing/spacing

# Fix ORG STATUS inconsistencies
df['ORG_STATUS_CLEAN'] = df['ORG STATUS '].str.strip().str.title()
org_status_clean = df['ORG_STATUS_CLEAN'].value_counts().reset_index()
org_status_clean.columns = ['Status', 'Count']

# Fix MULTIPLE DOMAIN inconsistencies  
df['MULTIPLE_DOMAIN_CLEAN'] = df['MULTIPLE DOMAIN '].str.strip().str.upper()
multiple_domain_clean = df['MULTIPLE_DOMAIN_CLEAN'].value_counts().reset_index()
multiple_domain_clean.columns = ['Has_Multiple_Domains', 'Count']

# Fix BASE STATE inconsistencies
df['BASE_STATE_CLEAN'] = df['BASE STATE'].str.strip().str.upper()
base_state_clean = df['BASE_STATE_CLEAN'].value_counts().reset_index()
base_state_clean.columns = ['State', 'Count']

# Fix MAIN DOMAIN inconsistencies
df['MAIN_DOMAIN_CLEAN'] = df['MAIN DOMAIN '].str.strip().str.title()
main_domain_clean = df['MAIN_DOMAIN_CLEAN'].value_counts().reset_index()
main_domain_clean.columns = ['Domain', 'Count']

print("Cleaned Data Analysis:")
print("="*30)
print("ORG STATUS:")
print(org_status_clean)
print("\nMULTIPLE DOMAIN:")
print(multiple_domain_clean)
print("\nBASE STATE:")
print(base_state_clean)
print("\nMAIN DOMAIN (top 10):")
print(main_domain_clean.head(10))

# Save cleaned data
org_status_clean.to_csv('org_status_clean.csv', index=False)
multiple_domain_clean.to_csv('multiple_domain_clean.csv', index=False)
base_state_clean.to_csv('base_state_clean.csv', index=False)
main_domain_clean.to_csv('main_domain_clean.csv', index=False)

# Complete cleaned dataset
dashboard_clean_data = df[['ORG NAME', 'ORG_STATUS_CLEAN', 'MULTIPLE_DOMAIN_CLEAN', 'BASE_STATE_CLEAN', 'MAIN_DOMAIN_CLEAN']].copy()
dashboard_clean_data.columns = ['Org_Name', 'Org_Status', 'Multiple_Domain', 'Base_State', 'Main_Domain']
dashboard_clean_data.to_csv('dashboard_clean_data.csv', index=False)

print("\nCleaned data files created for dashboard.")