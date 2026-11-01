import { CONFIG } from '@/core/config/env';
/** Existing HTTP paths, centralized without changing contracts. */
export const ENDPOINTS = {
  authRefresh: '/auth/refresh-token',
  command: (feature: unknown, type: unknown) => `/${feature}/commands/${type}`,
  fetchAccountingAccounts: `/accounting/accounts`,
  fetchAccountingAccountsByCode: (code: unknown) =>
    `/accounting/accounts/${encodeURIComponent(String(code))}`,
  fetchAccountingCashAccounts: `/accounting/cash-accounts`,
  fetchAccountingCashAccountsById: (id: unknown) =>
    `/accounting/cash-accounts/${encodeURIComponent(String(id))}`,
  fetchAccountingAssets: `/accounting/assets`,
  fetchAccountingAssetsById: (id: unknown) =>
    `/accounting/assets/${encodeURIComponent(String(id))}`,
  fetchAccountingContacts: `/accounting/contacts`,
  fetchAccountingContactsById: (id: unknown) =>
    `/accounting/contacts/${encodeURIComponent(String(id))}`,
  fetchAccountingCurrencies: `/accounting/currencies`,
  fetchAccountingCurrenciesByCode: (code: unknown) =>
    `/accounting/currencies/${encodeURIComponent(String(code))}`,
  fetchAccountingFinancialBooks: `/accounting/financial-books`,
  fetchAccountingFinancialBooksById: (id: unknown) =>
    `/accounting/financial-books/${encodeURIComponent(String(id))}`,
  fetchAccountingFinancialBooksByIdReadiness: (id: unknown) =>
    `/accounting/financial-books/${encodeURIComponent(String(id))}/readiness`,
  fetchAccountingVouchers: `/accounting/vouchers`,
  fetchAccountingVouchersById: (id: unknown) =>
    `/accounting/vouchers/${encodeURIComponent(String(id))}`,
  fetchAccountingJournals: `/accounting/journals`,
  fetchAccountingJournalsById: (id: unknown) =>
    `/accounting/journals/${encodeURIComponent(String(id))}`,
  fetchAccountingExchangeRates: `/accounting/exchange-rates`,
  fetchAccountingAssetAcquisitions: `/accounting/asset-acquisitions`,
  fetchAccountingAssetAcquisitionsById: (id: unknown) =>
    `/accounting/asset-acquisitions/${encodeURIComponent(String(id))}`,
  fetchAccountingDepreciation: `/accounting/depreciation`,
  fetchAccountingDepreciationById: (id: unknown) =>
    `/accounting/depreciation/${encodeURIComponent(String(id))}`,
  fetchAccountingFinancialBooksByIdClosingStock: (id: unknown) =>
    `/accounting/financial-books/${encodeURIComponent(String(id))}/closing-stock`,
  fetchAccountingFinancialBooksByIdClosingAccounts: (id: unknown) =>
    `/accounting/financial-books/${encodeURIComponent(String(id))}/closing-accounts`,
  fetchAccount: CONFIG.apiMode === 'site' ? '/auth' : '/auth/me',
  submitStatus: CONFIG.apiMode === 'site' ? '/auth?status=1' : '/auth/me',
  authAction: '/auth',
  authLogin: '/auth/login',
  authLogout: '/auth/logout',
  authHeartbeat: '/auth/heartbeat',
  authChangePassword: '/auth/change-password',
  authRevokeSession: (id: unknown) => '/auth/sessions/' + encodeURIComponent(String(String(id))),
  authRevokeOtherSessions: '/auth/sessions/others',
  createUser: '/users',
  updateUser: (id: unknown) => '/users/' + encodeURIComponent(String(String(id))),
  resetUserPassword: (id: unknown) =>
    '/users/' + encodeURIComponent(String(String(id))) + '/password',
  fetchCustomers: `/customers`,
  fetchCustomersById: (id: unknown) => `/customers/${encodeURIComponent(String(id))}`,
  fetchPartiesGroups: `/parties/groups`,
  fetchPartiesGroupsById: (id: unknown) => `/parties/groups/${encodeURIComponent(String(id))}`,
  fetchDashboard: `/dashboard`,
  fetchEmployees: `/employees`,
  fetchEmployeesById: (id: unknown) => `/employees/${encodeURIComponent(String(id))}`,
  fetchEmployeesPayrollAccruals: `/employees/payroll-accruals`,
  fetchEmployeesPayrollAccrualsById: (id: unknown) =>
    `/employees/payroll-accruals/${encodeURIComponent(String(id))}`,
  fetchEmployeesSalaryPayments: `/employees/salary-payments`,
  fetchEmployeesSalaryPaymentsById: (id: unknown) =>
    `/employees/salary-payments/${encodeURIComponent(String(id))}`,
  fetchEmployeesAdvances: `/employees/advances`,
  fetchEmployeesAdvancesById: (id: unknown) =>
    `/employees/advances/${encodeURIComponent(String(id))}`,
  fetchExpensesTypes: `/expenses/types`,
  fetchExpensesTypesById: (id: unknown) => `/expenses/types/${encodeURIComponent(String(id))}`,
  fetchExpensesDocuments: `/expenses/documents`,
  fetchExpensesDocumentsById: (id: unknown) =>
    `/expenses/documents/${encodeURIComponent(String(id))}`,
  fetchExpensesDocumentsByIdPayments: (id: unknown) =>
    `/expenses/documents/${encodeURIComponent(String(id))}/payments`,
  fetchExpensesDocumentsByIdConsumptions: (id: unknown) =>
    `/expenses/documents/${encodeURIComponent(String(id))}/consumptions`,
  fetchReportsFinancialProfitByItem: `/reports/financial/profit-by-item`,
  fetchReportsFinancialProfitByCustomer: `/reports/financial/profit-by-customer`,
  fetchReportsFinancialCashFlow: `/reports/financial/cash-flow`,
  fetchReportsFinancialAccountMapping: `/reports/financial/account-mapping`,
  fetchFinancialStatementsIncome: `/financial-statements/income`,
  fetchFinancialStatementsPosition: `/financial-statements/position`,
  fetchInventoryItems: `/inventory/items`,
  fetchInventoryItemsById: (id: unknown) => `/inventory/items/${encodeURIComponent(String(id))}`,
  fetchInventoryWarehouses: `/inventory/warehouses`,
  fetchInventoryWarehousesById: (id: unknown) =>
    `/inventory/warehouses/${encodeURIComponent(String(id))}`,
  fetchInventoryUnits: `/inventory/units`,
  fetchInventoryUnitsById: (id: unknown) => `/inventory/units/${encodeURIComponent(String(id))}`,
  fetchInventoryUnitCategories: `/inventory/unit-categories`,
  fetchInventoryUnitCategoriesById: (id: unknown) =>
    `/inventory/unit-categories/${encodeURIComponent(String(id))}`,
  fetchInventoryItemGroups: `/inventory/item-groups`,
  fetchInventoryItemGroupsById: (id: unknown) =>
    `/inventory/item-groups/${encodeURIComponent(String(id))}`,
  fetchInventoryStockDocuments: `/inventory/stock-documents`,
  fetchInventoryStockDocumentsById: (id: unknown) =>
    `/inventory/stock-documents/${encodeURIComponent(String(id))}`,
  fetchInventoryBalances: `/inventory/balances`,
  fetchInventoryMovements: `/inventory/movements`,
  fetchInventoryItemsByIdUnits: (id: unknown) =>
    `/inventory/items/${encodeURIComponent(String(id))}/units`,
  fetchInventoryStockCounts: `/inventory/stock-counts`,
  fetchInventoryStockCountsById: (id: unknown) =>
    `/inventory/stock-counts/${encodeURIComponent(String(id))}`,
  fetchSearchItems: `/search/items`,
  fetchPurchasesInvoices: `/purchases/invoices`,
  fetchPurchasesInvoicesById: (id: unknown) =>
    `/purchases/invoices/${encodeURIComponent(String(id))}`,
  fetchPurchasesReturns: `/purchases/returns`,
  fetchPurchasesReturnsById: (id: unknown) =>
    `/purchases/returns/${encodeURIComponent(String(id))}`,
  fetchPurchasesInvoicesByIdReturnAvailability: (id: unknown) =>
    `/purchases/invoices/${encodeURIComponent(String(id))}/return-availability`,
  fetchReportsInventoryValuation: `/reports/inventory/valuation`,
  fetchReportsInventoryOpeningStock: `/reports/inventory/opening-stock`,
  fetchReportsInventoryReorder: `/reports/inventory/reorder`,
  fetchReportsInventoryStagnant: `/reports/inventory/stagnant`,
  fetchReportsInventoryHistoricalCost: `/reports/inventory/historical-cost`,
  fetchReportsInventoryTransfers: `/reports/inventory/transfers`,
  fetchReportsInventoryAdjustments: `/reports/inventory/adjustments`,
  fetchReportsInventoryPrices: `/reports/inventory/prices`,
  fetchReportsCustomersBalances: `/reports/customers/balances`,
  fetchReportsSuppliersBalances: `/reports/suppliers/balances`,
  fetchReportsEmployeesPayroll: `/reports/employees/payroll`,
  fetchReportsEmployeesAdvances: `/reports/employees/advances`,
  fetchReportsExpensesRecognized: `/reports/expenses/recognized`,
  fetchReportsSalesSummary: `/reports/sales/summary`,
  fetchReportsPurchasesSummary: `/reports/purchases/summary`,
  fetchReportsSalesReturns: `/reports/sales/returns`,
  fetchReportsPurchasesReturns: `/reports/purchases/returns`,
  fetchReportsSalesChart: `/reports/sales/chart`,
  fetchReportsAccountingCashMovements: `/reports/accounting/cash-movements`,
  fetchReportsAccountingOpeningBalances: `/reports/accounting/opening-balances`,
  fetchReportsAccountingTrialBalance: `/reports/accounting/trial-balance`,
  fetchReportsAccountingTax: `/reports/accounting/tax`,
  fetchReportsAccountingForeignCurrency: `/reports/accounting/foreign-currency`,
  fetchReportsAccountingAssets: `/reports/accounting/assets`,
  fetchReportsSalesTargetAchievement: `/reports/sales/target-achievement`,
  fetchReportsAccountingAccountStatement: `/reports/accounting/account-statement`,
  fetchReportsAccountingContactLedger: `/reports/accounting/contact-ledger`,
  fetchSalesTargets: `/sales/targets`,
  fetchSalesTargetsById: (id: unknown) => `/sales/targets/${encodeURIComponent(String(id))}`,
  fetchSalesInvoices: `/sales/invoices`,
  fetchSalesInvoicesById: (id: unknown) => `/sales/invoices/${encodeURIComponent(String(id))}`,
  fetchSalesReturns: `/sales/returns`,
  fetchSalesReturnsById: (id: unknown) => `/sales/returns/${encodeURIComponent(String(id))}`,
  fetchSalesInvoicesByIdReturnAvailability: (id: unknown) =>
    `/sales/invoices/${encodeURIComponent(String(id))}/return-availability`,
  fetchBackups: '/backups',
  submitBackupAction: (action: unknown) =>
    CONFIG.apiMode === 'site' ? '/backups' : '/backups/' + String(action),
  fetchBranches: `/branches`,
  fetchBranchesById: (id: unknown) => `/branches/${encodeURIComponent(String(id))}`,
  fetchSettingsCompany: `/settings/company`,
  fetchSettingsBranding: `/settings/branding`,
  fetchSettingsSystem: `/settings/system`,
  fetchSettingsBackupPolicy: `/settings/backup-policy`,
  fetchSettingsSystemAccounting: `/settings/system/accounting`,
  fetchSettingsSystemSales: `/settings/system/sales`,
  fetchSettingsSystemPurchases: `/settings/system/purchases`,
  fetchSettingsSystemInventory: `/settings/system/inventory`,
  fetchSettingsSystemExpenses: `/settings/system/expenses`,
  fetchSettingsSystemDocuments: `/settings/system/documents`,
  fetchSettingsSystemBranches: `/settings/system/branches`,
  fetchSettingsSystemCompany: `/settings/system/company`,
  fetchSettingsServiceStatus: `/settings/service-status`,
  fetchSettingsImportTemplatesByKind: (kind: unknown) =>
    `/settings/import-templates/${encodeURIComponent(String(kind))}`,
  fetchUiDraftsByKey: (key: unknown) => `/ui-drafts/${encodeURIComponent(String(key))}`,
  fetchLookupsByResource: (resource: unknown) => `/lookups/${encodeURIComponent(String(resource))}`,
  fetchSuppliers: `/suppliers`,
  fetchSuppliersById: (id: unknown) => `/suppliers/${encodeURIComponent(String(id))}`,
  fetchUsers: `/users`,
  fetchUsersById: (id: unknown) => `/users/${encodeURIComponent(String(id))}`,
  fetchAuthSessions: `/auth/sessions`,
  fetchUsersByIdSessions: (id: unknown) => `/users/${encodeURIComponent(String(id))}/sessions`,
  fetchAuthPermissions: `/auth/permissions`,
  fetchAuditEvents: `/audit/events`,
} as const;
