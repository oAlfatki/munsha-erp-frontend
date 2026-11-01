import { LoadingState } from '@/core/components/shared/feedback/LoadingState';
import type { RouteObject } from 'react-router-dom';
export const APP_ROUTES: RouteObject[] = [
  // accounting
  {
    path: '/accounting',
    lazy: async () => ({
      Component: (await import('@/features/accounting/pages/AccountingOverviewPage')).default,
    }),
    handle: { module: 'accounting', title: '', legacyId: 'accounts' },
  },
  {
    path: '/accounting/action/payment',
    lazy: async () => ({
      Component: (await import('@/features/accounting/pages/AccountingOverviewPage')).default,
    }),
    handle: { module: 'accounting', title: '', legacyId: 'accounts:payment' },
  },
  {
    path: '/accounting/action/receipt',
    lazy: async () => ({
      Component: (await import('@/features/accounting/pages/AccountingOverviewPage')).default,
    }),
    handle: { module: 'accounting', title: '', legacyId: 'accounts:receipt' },
  },
  {
    path: '/accounting/accounts',
    lazy: async () => ({
      Component: (await import('@/features/accounting/pages/ChartOfAccountsPage')).default,
    }),
    handle: {
      module: 'accounting',
      title: 'إضافة حساب ودليل الحسابات',
      legacyId: 'accounts~accounts',
      navModule: 'accounts',
    },
  },
  {
    path: '/accounting/asset-purchase',
    lazy: async () => ({
      Component: (await import('@/features/accounting/pages/AssetAcquisitionPage')).default,
    }),
    handle: {
      module: 'accounting',
      title: 'إثبات اقتناء أصل',
      legacyId: 'accounts~asset-purchase',
      navModule: 'accounts',
    },
  },
  {
    path: '/accounting/asset-report',
    lazy: async () => ({
      Component: (await import('@/features/accounting/pages/AssetDepreciationReportPage')).default,
    }),
    handle: {
      module: 'accounting',
      title: 'تقرير الأصول والإهلاك',
      legacyId: 'accounts~asset-report',
      navModule: 'accounts',
    },
  },
  {
    path: '/accounting/assets',
    lazy: async () => ({
      Component: (await import('@/features/accounting/pages/AssetListPage')).default,
    }),
    handle: {
      module: 'accounting',
      title: 'قائمة الأصول الثابتة',
      legacyId: 'accounts~assets',
      navModule: 'accounts',
    },
  },
  {
    path: '/accounting/assets-add',
    lazy: async () => ({
      Component: (await import('@/features/accounting/pages/CreateAssetPage')).default,
    }),
    handle: {
      module: 'accounting',
      title: 'إضافة أصل ثابت',
      legacyId: 'accounts~assets-add',
      navModule: 'accounts',
    },
  },
  {
    path: '/accounting/cash-bank',
    lazy: async () => ({
      Component: (await import('@/features/accounting/pages/CreateCashAccountPage')).default,
    }),
    handle: {
      module: 'accounting',
      title: 'إضافة الصناديق والبنوك',
      legacyId: 'accounts~cash-bank',
      navModule: 'accounts',
    },
  },
  {
    path: '/accounting/cash-bank-list',
    lazy: async () => ({
      Component: (await import('@/features/accounting/pages/CashAccountListPage')).default,
    }),
    handle: {
      module: 'accounting',
      title: 'قائمة الصناديق والبنوك',
      legacyId: 'accounts~cash-bank-list',
      navModule: 'accounts',
    },
  },
  {
    path: '/accounting/cash-movement',
    lazy: async () => ({
      Component: (await import('@/features/accounting/pages/CashMovementPage')).default,
    }),
    handle: {
      module: 'accounting',
      title: 'حركة الصندوق',
      legacyId: 'accounts~cash-movement',
      navModule: 'accounts',
    },
  },
  {
    path: '/accounting/close',
    lazy: async () => ({
      Component: (await import('@/features/accounting/pages/FiscalYearClosingPage')).default,
    }),
    handle: {
      module: 'accounting',
      title: 'مراجعة إقفال السنة والفترة',
      legacyId: 'accounts~close',
      navModule: 'accounts',
    },
  },
  {
    path: '/accounting/contacts',
    lazy: async () => ({
      Component: (await import('@/features/accounting/pages/AccountingContactListPage')).default,
    }),
    handle: {
      module: 'accounting',
      title: 'حسابات الدائنين والمدينين المتنوعين',
      legacyId: 'accounts~contacts',
      navModule: 'accounts',
    },
  },
  {
    path: '/accounting/contacts-ledger',
    lazy: async () => ({
      Component: (await import('@/features/accounting/pages/AccountingContactLedgerPage')).default,
    }),
    handle: {
      module: 'accounting',
      title: 'حركة الأطراف المتنوعة وكشف الحساب',
      legacyId: 'accounts~contacts-ledger',
      navModule: 'accounts',
    },
  },
  {
    path: '/accounting/currencies',
    lazy: async () => ({
      Component: (await import('@/features/accounting/pages/CurrencyListPage')).default,
    }),
    handle: {
      module: 'accounting',
      title: 'قائمة العملات',
      legacyId: 'accounts~currencies',
      navModule: 'accounts',
    },
  },
  {
    path: '/accounting/currencies-add',
    lazy: async () => ({
      Component: (await import('@/features/accounting/pages/CreateCurrencyPage')).default,
    }),
    handle: {
      module: 'accounting',
      title: 'إضافة عملة وسعر صرف',
      legacyId: 'accounts~currencies-add',
      navModule: 'accounts',
    },
  },
  {
    path: '/accounting/depreciation',
    lazy: async () => ({
      Component: (await import('@/features/accounting/pages/AssetDepreciationPage')).default,
    }),
    handle: {
      module: 'accounting',
      title: 'إثبات إهلاك فترة',
      legacyId: 'accounts~depreciation',
      navModule: 'accounts',
    },
  },
  {
    path: '/accounting/end-balances',
    lazy: async () => ({
      Component: (await import('@/features/accounting/pages/ClosingAccountBalancesPage')).default,
    }),
    handle: {
      module: 'accounting',
      title: 'الحسابات في الفترة المنتهية',
      legacyId: 'accounts~end-balances',
      navModule: 'accounts',
    },
  },
  {
    path: '/accounting/fx',
    lazy: async () => ({
      Component: (await import('@/features/accounting/pages/CurrencyDocumentsPage')).default,
    }),
    handle: {
      module: 'accounting',
      title: 'مراجعة أرصدة العملات',
      legacyId: 'accounts~fx',
      navModule: 'accounts',
    },
  },
  {
    path: '/accounts~journal/new',
    lazy: async () => ({
      Component: (await import('@/features/accounting/pages/CreateJournalEntryPage')).default,
    }),
    handle: {
      module: 'accounting',
      title: 'إضافة قيد يومي يدوي',
      legacyId: 'accounts~journal-new',
      navModule: 'accounts',
    },
  },
  {
    path: '/accounting/opening',
    lazy: async () => ({
      Component: (await import('@/features/accounting/pages/OpeningAccountBalancesPage')).default,
    }),
    handle: {
      module: 'accounting',
      title: 'إضافة الأرصدة الافتتاحية',
      legacyId: 'accounts~opening',
      navModule: 'accounts',
    },
  },
  {
    path: '/accounting/opening-report',
    lazy: async () => ({
      Component: (await import('@/features/accounting/pages/OpeningAccountBalancesReportPage'))
        .default,
    }),
    handle: {
      module: 'accounting',
      title: 'تقرير الأرصدة الافتتاحية',
      legacyId: 'accounts~opening-report',
      navModule: 'accounts',
    },
  },
  {
    path: '/accounting/periods',
    lazy: async () => ({
      Component: (await import('@/features/accounting/pages/FiscalPeriodReviewPage')).default,
    }),
    handle: {
      module: 'accounting',
      title: 'السنة والفترات المالية',
      legacyId: 'accounts~periods',
      navModule: 'accounts',
    },
  },
  {
    path: '/accounting/reopen',
    lazy: async () => ({
      Component: (await import('@/features/accounting/pages/FiscalYearReopeningPage')).default,
    }),
    handle: {
      module: 'accounting',
      title: 'طلب إعادة فتح فترة',
      legacyId: 'accounts~reopen',
      navModule: 'accounts',
    },
  },
  {
    path: '/accounting/statement',
    lazy: async () => ({
      Component: (await import('@/features/accounting/pages/AccountStatementPage')).default,
    }),
    handle: {
      module: 'accounting',
      title: 'كشف حساب',
      legacyId: 'accounts~statement',
      navModule: 'accounts',
    },
  },
  {
    path: '/accounting/tax-report',
    lazy: async () => ({
      Component: (await import('@/features/accounting/pages/TaxReportPage')).default,
    }),
    handle: {
      module: 'accounting',
      title: 'تقرير الضرائب',
      legacyId: 'accounts~tax-report',
      navModule: 'accounts',
    },
  },
  {
    path: '/accounting/vouchers',
    lazy: async () => ({
      Component: (await import('@/features/accounting/pages/VoucherListPage')).default,
    }),
    handle: {
      module: 'accounting',
      title: 'بحث سندات الصرف والقبض',
      legacyId: 'accounts~vouchers',
      navModule: 'accounts',
    },
  },
  {
    path: '/accounting/action/:actionId',
    lazy: async () => ({
      Component: (await import('@/features/accounting/pages/AccountingOverviewPage')).default,
    }),
    handle: { module: 'accounting', title: '', legacyId: 'accounts:', param: 'actionId' },
  },
  // auth
  {
    path: '/login',
    hydrateFallbackElement: <LoadingState />,
    lazy: async () => ({ Component: (await import('@/features/auth/pages/LoginPage')).default }),
    handle: { module: 'auth', title: '', legacyId: 'login' },
  },
  // customers
  {
    path: '/customers',
    lazy: async () => ({
      Component: (await import('@/features/customers/pages/CustomerListPage')).default,
    }),
    handle: { module: 'customers', title: '', legacyId: 'customers' },
  },
  {
    path: '/customers/new',
    lazy: async () => ({
      Component: (await import('@/features/customers/pages/CustomerListPage')).default,
    }),
    handle: { module: 'customers', title: '', legacyId: 'customers-new' },
  },
  {
    path: '/customers/customer-balances',
    lazy: async () => ({
      Component: (await import('@/features/customers/pages/CustomerBalancesPage')).default,
    }),
    handle: {
      module: 'customers',
      title: 'تقرير حسابات العملاء',
      legacyId: 'customers~customer-balances',
      navModule: 'accounts',
    },
  },
  // parties
  {
    path: '/customers/groups',
    lazy: async () => ({
      Component: (await import('@/features/parties/pages/PartyGroupListPage')).default,
    }),
    handle: {
      module: 'parties',
      title: 'مجموعات العملاء والموردين',
      legacyId: 'customers~groups',
      navModule: 'customers',
    },
  },
  // dashboard
  {
    path: '/dashboard',
    lazy: async () => ({
      Component: (await import('@/features/dashboard/pages/DashboardPage')).default,
    }),
    handle: { module: 'dashboard', title: '', legacyId: 'dashboard' },
  },
  // employees
  {
    path: '/employees',
    lazy: async () => ({
      Component: (await import('@/features/employees/pages/EmployeeListPage')).default,
    }),
    handle: { module: 'employees', title: '', legacyId: 'employees' },
  },
  {
    path: '/employees/new',
    lazy: async () => ({
      Component: (await import('@/features/employees/pages/EmployeeListPage')).default,
    }),
    handle: { module: 'employees', title: '', legacyId: 'employees-new' },
  },
  {
    path: '/employees/advance',
    lazy: async () => ({
      Component: (await import('@/features/employees/pages/EmployeeAdvancePage')).default,
    }),
    handle: {
      module: 'employees',
      title: 'صرف سلفة موظف',
      legacyId: 'employees~advance',
      navModule: 'employees',
    },
  },
  {
    path: '/employees/payroll',
    lazy: async () => ({
      Component: (await import('@/features/employees/pages/PayrollAccrualPage')).default,
    }),
    handle: {
      module: 'employees',
      title: 'احتساب وإثبات رواتب فترة',
      legacyId: 'employees~payroll',
      navModule: 'employees',
    },
  },
  {
    path: '/employees/salary-payment',
    lazy: async () => ({
      Component: (await import('@/features/employees/pages/SalaryPaymentPage')).default,
    }),
    handle: {
      module: 'employees',
      title: 'صرف رواتب الموظفين',
      legacyId: 'employees~salary-payment',
      navModule: 'employees',
    },
  },
  {
    path: '/employees/salary-report',
    lazy: async () => ({
      Component: (await import('@/features/employees/pages/SalaryReportPage')).default,
    }),
    handle: {
      module: 'employees',
      title: 'تقرير رواتب الموظفين',
      legacyId: 'employees~salary-report',
      navModule: 'employees',
    },
  },
  {
    path: '/employees/withdrawals',
    lazy: async () => ({
      Component: (await import('@/features/employees/pages/EmployeeWithdrawalsPage')).default,
    }),
    handle: {
      module: 'employees',
      title: 'تقرير مسحوبات الموظفين',
      legacyId: 'employees~withdrawals',
      navModule: 'accounts',
    },
  },
  // expenses
  {
    path: '/expenses',
    lazy: async () => ({
      Component: (await import('@/features/expenses/pages/ExpenseOverviewPage')).default,
    }),
    handle: { module: 'expenses', title: '', legacyId: 'expenses' },
  },
  {
    path: '/expenses/add',
    lazy: async () => ({
      Component: (await import('@/features/expenses/pages/CreateExpensePage')).default,
    }),
    handle: {
      module: 'expenses',
      title: 'إضافة مصروف',
      legacyId: 'expenses~add',
      navModule: 'expenses',
    },
  },
  {
    path: '/expenses/expense-list',
    lazy: async () => ({
      Component: (await import('@/features/expenses/pages/ExpenseListPage')).default,
    }),
    handle: {
      module: 'expenses',
      title: 'قائمة المصروفات',
      legacyId: 'expenses~expense-list',
      navModule: 'expenses',
    },
  },
  {
    path: '/expenses/expense-report',
    lazy: async () => ({
      Component: (await import('@/features/expenses/pages/ExpenseReportPage')).default,
    }),
    handle: {
      module: 'expenses',
      title: 'تقارير المصروفات',
      legacyId: 'expenses~expense-report',
      navModule: 'accounts',
    },
  },
  {
    path: '/expenses/expense-types',
    lazy: async () => ({
      Component: (await import('@/features/expenses/pages/ExpenseTypeListPage')).default,
    }),
    handle: {
      module: 'expenses',
      title: 'أنواع المصروفات',
      legacyId: 'expenses~expense-types',
      navModule: 'expenses',
    },
  },
  // financial
  {
    path: '/financial-statements',
    lazy: async () => ({
      Component: (await import('@/features/financial/pages/FinancialOverviewPage')).default,
    }),
    handle: { module: 'financial', title: '', legacyId: 'financial' },
  },
  {
    path: '/financial-statements/balance-sheet',
    lazy: async () => ({
      Component: (await import('@/features/financial/pages/BalanceSheetPage')).default,
    }),
    handle: {
      module: 'financial',
      title: 'قائمة المركز المالي',
      legacyId: 'financial~balance-sheet',
      navModule: 'financial',
    },
  },
  {
    path: '/financial-statements/cash-flow',
    lazy: async () => ({
      Component: (await import('@/features/financial/pages/CashFlowPage')).default,
    }),
    handle: {
      module: 'financial',
      title: 'قائمة التدفقات النقدية',
      legacyId: 'financial~cash-flow',
      navModule: 'financial',
    },
  },
  {
    path: '/financial-statements/income',
    lazy: async () => ({
      Component: (await import('@/features/financial/pages/IncomeStatementPage')).default,
    }),
    handle: {
      module: 'financial',
      title: 'قائمة الدخل',
      legacyId: 'financial~income',
      navModule: 'financial',
    },
  },
  {
    path: '/financial-statements/mapping',
    lazy: async () => ({
      Component: (await import('@/features/financial/pages/FinancialAccountMappingPage')).default,
    }),
    handle: {
      module: 'financial',
      title: 'ربط الحسابات بالقوائم المالية',
      legacyId: 'financial~mapping',
      navModule: 'financial',
    },
  },
  {
    path: '/financial-statements/profit-customers',
    lazy: async () => ({
      Component: (await import('@/features/financial/pages/CustomerProfitPage')).default,
    }),
    handle: {
      module: 'financial',
      title: 'الأرباح من العملاء',
      legacyId: 'financial~profit-customers',
      navModule: 'financial',
    },
  },
  {
    path: '/financial-statements/profit-items',
    lazy: async () => ({
      Component: (await import('@/features/financial/pages/ProductProfitPage')).default,
    }),
    handle: {
      module: 'financial',
      title: 'الأرباح من الأصناف',
      legacyId: 'financial~profit-items',
      navModule: 'financial',
    },
  },
  // inventory
  {
    path: '/inventory',
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/InventoryBalancesPage')).default,
    }),
    handle: { module: 'inventory', title: '', legacyId: 'inventory' },
  },
  {
    path: '/inventory/movements',
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/InventoryBalancesPage')).default,
    }),
    handle: { module: 'inventory', title: '', legacyId: 'inventory:movements' },
  },
  {
    path: '/inventory/adjustment',
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/StockAdjustmentPage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'فاتورة تسوية المخزون',
      legacyId: 'inventory~adjustment',
      navModule: 'inventory',
    },
  },
  {
    path: '/inventory/adjustments',
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/StockAdjustmentHistoryPage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'قائمة تسويات المخزون',
      legacyId: 'inventory~adjustments',
      navModule: 'inventory',
    },
  },
  {
    path: '/inventory/cost',
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/InventoryValuationPage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'تقرير تكلفة المخزون',
      legacyId: 'inventory~cost',
      navModule: 'inventory',
    },
  },
  {
    path: '/inventory/count',
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/StockCountPage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'الجرد الفعلي',
      legacyId: 'inventory~count',
      navModule: 'inventory',
    },
  },
  {
    path: '/inventory/end-stock',
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/ClosingStockPage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'تقرير مخزون آخر المدة',
      legacyId: 'inventory~end-stock',
      navModule: 'inventory',
    },
  },
  {
    path: '/inventory/groups',
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/ItemGroupListPage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'قائمة المجموعات',
      legacyId: 'inventory~groups',
      navModule: 'inventory',
    },
  },
  {
    path: '/inventory/groups-add',
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/CreateItemGroupPage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'إضافة مجموعة',
      legacyId: 'inventory~groups-add',
      navModule: 'inventory',
    },
  },
  {
    path: '/inventory/historical-cost',
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/HistoricalInventoryCostPage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'مراجعة تكلفة الصنف التاريخية',
      legacyId: 'inventory~historical-cost',
      navModule: 'inventory',
    },
  },
  {
    path: '/inventory/opening-stock',
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/OpeningStockPage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'إضافة أصناف بداية المدة',
      legacyId: 'inventory~opening-stock',
      navModule: 'inventory',
    },
  },
  {
    path: '/inventory/opening-stock-report',
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/OpeningStockReportPage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'تقرير أصناف بداية المدة',
      legacyId: 'inventory~opening-stock-report',
      navModule: 'inventory',
    },
  },
  {
    path: '/inventory/reorder',
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/ReorderAlertsPage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'أصناف بلغت حد الطلب',
      legacyId: 'inventory~reorder',
      navModule: 'inventory',
    },
  },
  {
    path: '/inventory/stagnant',
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/StagnantInventoryPage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'الأصناف الراكدة',
      legacyId: 'inventory~stagnant',
      navModule: 'inventory',
    },
  },
  {
    path: '/inventory/transfer-document',
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/StockTransferPage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'إضافة فاتورة تحويل مخزني',
      legacyId: 'inventory~transfer-document',
      navModule: 'inventory',
    },
  },
  {
    path: '/inventory/transfers',
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/StockTransferHistoryPage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'فواتير التحويل بين المخازن',
      legacyId: 'inventory~transfers',
      navModule: 'inventory',
    },
  },
  {
    path: '/inventory/units',
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/UnitListPage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'قائمة الوحدات',
      legacyId: 'inventory~units',
      navModule: 'inventory',
    },
  },
  {
    path: '/inventory/units-add',
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/CreateUnitPage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'إضافة وحدة',
      legacyId: 'inventory~units-add',
      navModule: 'inventory',
    },
  },
  {
    path: '/inventory/warehouses',
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/WarehouseListPage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'قائمة المخازن',
      legacyId: 'inventory~warehouses',
      navModule: 'inventory',
    },
  },
  {
    path: '/inventory/warehouses-add',
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/CreateWarehousePage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'إضافة مخزن',
      legacyId: 'inventory~warehouses-add',
      navModule: 'inventory',
    },
  },
  {
    path: '/inventory/items',
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/ProductListPage')).default,
    }),
    handle: { module: 'inventory', title: '', legacyId: 'products' },
  },
  {
    path: '/inventory/items/new',
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/ProductListPage')).default,
    }),
    handle: { module: 'inventory', title: '', legacyId: 'products-new' },
  },
  // purchases
  {
    path: '/purchases',
    lazy: async () => ({
      Component: (await import('@/features/purchases/pages/PurchaseInvoiceListPage')).default,
    }),
    handle: { module: 'purchases', title: '', legacyId: 'purchases' },
  },
  {
    path: '/purchases/new',
    lazy: async () => ({
      Component: (await import('@/features/purchases/pages/PurchaseInvoiceListPage')).default,
    }),
    handle: { module: 'purchases', title: '', legacyId: 'purchases-new' },
  },
  {
    path: '/purchases/purchase-report',
    lazy: async () => ({
      Component: (await import('@/features/purchases/pages/PurchaseSummaryPage')).default,
    }),
    handle: {
      module: 'purchases',
      title: 'تقرير المشتريات',
      legacyId: 'purchases~purchase-report',
      navModule: 'purchases',
    },
  },
  {
    path: '/purchases/purchase-returns',
    lazy: async () => ({
      Component: (await import('@/features/purchases/pages/PurchaseReturnsPage')).default,
    }),
    handle: {
      module: 'purchases',
      title: 'فاتورة مرتجع شراء',
      legacyId: 'purchases~purchase-returns',
      navModule: 'purchases',
    },
  },
  // reports
  {
    path: '/reports',
    lazy: async () => ({
      Component: (await import('@/features/reports/pages/ReportsPage')).default,
    }),
    handle: { module: 'reports', title: '', legacyId: 'reports' },
  },
  // sales
  {
    path: '/sales',
    lazy: async () => ({
      Component: (await import('@/features/sales/pages/SalesInvoiceListPage')).default,
    }),
    handle: { module: 'sales', title: '', legacyId: 'sales' },
  },
  {
    path: '/sales/new',
    lazy: async () => ({
      Component: (await import('@/features/sales/pages/SalesInvoiceListPage')).default,
    }),
    handle: { module: 'sales', title: '', legacyId: 'sales-new' },
  },
  {
    path: '/sales/sales-chart',
    lazy: async () => ({
      Component: (await import('@/features/sales/pages/SalesChartPage')).default,
    }),
    handle: {
      module: 'sales',
      title: 'الرسم البياني لحركة المبيعات',
      legacyId: 'sales~sales-chart',
      navModule: 'sales',
    },
  },
  {
    path: '/sales/sales-report',
    lazy: async () => ({
      Component: (await import('@/features/sales/pages/SalesSummaryPage')).default,
    }),
    handle: {
      module: 'sales',
      title: 'تقرير المبيعات',
      legacyId: 'sales~sales-report',
      navModule: 'sales',
    },
  },
  {
    path: '/sales/sales-returns',
    lazy: async () => ({
      Component: (await import('@/features/sales/pages/SalesReturnsPage')).default,
    }),
    handle: {
      module: 'sales',
      title: 'فاتورة مرتجع مبيعات',
      legacyId: 'sales~sales-returns',
      navModule: 'sales',
    },
  },
  {
    path: '/sales/targets',
    lazy: async () => ({
      Component: (await import('@/features/sales/pages/SalesTargetsPage')).default,
    }),
    handle: {
      module: 'sales',
      title: 'أهداف المبيعات ومتابعة الإنجاز',
      legacyId: 'sales~targets',
      navModule: 'sales',
    },
  },
  {
    path: '/inventory/prices',
    lazy: async () => ({
      Component: (await import('@/features/sales/pages/SalesItemPricingPage')).default,
    }),
    handle: {
      module: 'sales',
      title: 'تسعيرة الأصناف',
      legacyId: 'inventory~prices',
      navModule: 'sales',
    },
  },
  // settings
  {
    path: '/settings',
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/SettingsOverviewPage')).default,
    }),
    handle: { module: 'settings', title: '', legacyId: 'settings' },
  },
  {
    path: '/settings/annual-books',
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/FinancialBooksPage')).default,
    }),
    handle: {
      module: 'settings',
      title: 'إنشاء الفترة المالية وترحيل الأرصدة',
      legacyId: 'settings~annual-books',
      navModule: 'settings',
    },
  },
  {
    path: '/settings/backup',
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/BackupListPage')).default,
    }),
    handle: {
      module: 'settings',
      title: 'النسخ الاحتياطي',
      legacyId: 'settings~backup',
      navModule: 'settings',
    },
  },
  {
    path: '/settings/backup-policy',
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/BackupPolicyPage')).default,
    }),
    handle: {
      module: 'settings',
      title: 'إعدادات النسخ الاحتياطي',
      legacyId: 'settings~backup-policy',
      navModule: 'settings',
    },
  },
  {
    path: '/settings/branches',
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/BranchListPage')).default,
    }),
    handle: {
      module: 'settings',
      title: 'بطاقات الفروع ومواقع التشغيل',
      legacyId: 'settings~branches',
      navModule: 'settings',
    },
  },
  {
    path: '/settings/branding',
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/CompanySettingsPage')).default,
    }),
    handle: { module: 'settings', title: '', legacyId: 'settings~branding' },
  },
  {
    path: '/settings/business',
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/CompanySettingsPage')).default,
    }),
    handle: { module: 'settings', title: '', legacyId: 'settings~business' },
  },
  {
    path: '/settings/database',
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/DatabaseStatusPage')).default,
    }),
    handle: {
      module: 'settings',
      title: 'حالة الاتصال بقاعدة البيانات',
      legacyId: 'settings~database',
      navModule: 'settings',
    },
  },
  {
    path: '/settings/general',
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/GeneralSettingsPage')).default,
    }),
    handle: { module: 'settings', title: '', legacyId: 'settings~general' },
  },
  {
    path: '/settings/migration',
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/ImportMasterDataPage')).default,
    }),
    handle: {
      module: 'settings',
      title: 'استيراد البطاقات من CSV',
      legacyId: 'settings~migration',
      navModule: 'settings',
    },
  },
  {
    path: '/settings/restore',
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/RestoreBackupPage')).default,
    }),
    handle: {
      module: 'settings',
      title: 'استرجاع نسخة احتياطية',
      legacyId: 'settings~restore',
      navModule: 'settings',
    },
  },
  {
    path: '/settings/sync',
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/DatabaseStatusPage')).default,
    }),
    handle: { module: 'settings', title: '', legacyId: 'settings~sync' },
  },
  {
    path: '/settings/system-accounting',
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/AccountingSettingsPage')).default,
    }),
    handle: {
      module: 'settings',
      title: 'إعدادات المحاسبة والضرائب',
      legacyId: 'settings~system-accounting',
      navModule: 'settings',
    },
  },
  {
    path: '/settings/system-branches',
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/BranchesSettingsPage')).default,
    }),
    handle: {
      module: 'settings',
      title: 'إعدادات الفروع',
      legacyId: 'settings~system-branches',
      navModule: 'settings',
    },
  },
  {
    path: '/settings/system-company',
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/CompanySettingsPage')).default,
    }),
    handle: {
      module: 'settings',
      title: 'إعدادات المنشأة',
      legacyId: 'settings~system-company',
      navModule: 'settings',
    },
  },
  {
    path: '/settings/system-documents',
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/DocumentsSettingsPage')).default,
    }),
    handle: {
      module: 'settings',
      title: 'إعدادات المستندات والترقيم',
      legacyId: 'settings~system-documents',
      navModule: 'settings',
    },
  },
  {
    path: '/settings/system-expenses',
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/ExpensesSettingsPage')).default,
    }),
    handle: {
      module: 'settings',
      title: 'إعدادات المصروفات والسندات',
      legacyId: 'settings~system-expenses',
      navModule: 'settings',
    },
  },
  {
    path: '/settings/system-general',
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/GeneralSettingsPage')).default,
    }),
    handle: {
      module: 'settings',
      title: 'الإعدادات العامة',
      legacyId: 'settings~system-general',
      navModule: 'settings',
    },
  },
  {
    path: '/settings/system-inventory',
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/InventorySettingsPage')).default,
    }),
    handle: {
      module: 'settings',
      title: 'إعدادات المخزون',
      legacyId: 'settings~system-inventory',
      navModule: 'settings',
    },
  },
  {
    path: '/settings/system-printing',
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/PrintingSettingsPage')).default,
    }),
    handle: {
      module: 'settings',
      title: 'إعدادات الطباعة',
      legacyId: 'settings~system-printing',
      navModule: 'settings',
    },
  },
  {
    path: '/settings/system-purchases',
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/PurchasesSettingsPage')).default,
    }),
    handle: {
      module: 'settings',
      title: 'إعدادات المشتريات',
      legacyId: 'settings~system-purchases',
      navModule: 'settings',
    },
  },
  {
    path: '/settings/system-sales',
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/SalesSettingsPage')).default,
    }),
    handle: {
      module: 'settings',
      title: 'إعدادات المبيعات',
      legacyId: 'settings~system-sales',
      navModule: 'settings',
    },
  },
  // suppliers
  {
    path: '/suppliers',
    lazy: async () => ({
      Component: (await import('@/features/suppliers/pages/SupplierListPage')).default,
    }),
    handle: { module: 'suppliers', title: '', legacyId: 'suppliers' },
  },
  {
    path: '/suppliers/new',
    lazy: async () => ({
      Component: (await import('@/features/suppliers/pages/SupplierListPage')).default,
    }),
    handle: { module: 'suppliers', title: '', legacyId: 'suppliers-new' },
  },
  {
    path: '/suppliers/supplier-balances',
    lazy: async () => ({
      Component: (await import('@/features/suppliers/pages/SupplierBalancesPage')).default,
    }),
    handle: {
      module: 'suppliers',
      title: 'تقرير حسابات الموردين',
      legacyId: 'suppliers~supplier-balances',
      navModule: 'accounts',
    },
  },
  // trade
  {
    path: '/documents/:documentId',
    lazy: async () => ({
      Component: (await import('@/features/trade/pages/InvoiceDetailsPage')).default,
    }),
    handle: { module: 'trade', title: '', legacyId: 'doc:', param: 'documentId' },
  },
  // users
  {
    path: '/users',
    lazy: async () => ({
      Component: (await import('@/features/users/pages/UserListPage')).default,
    }),
    handle: { module: 'users', title: '', legacyId: 'access' },
  },
  {
    path: '/users/audit',
    lazy: async () => ({
      Component: (await import('@/features/users/pages/UserAuditPage')).default,
    }),
    handle: {
      module: 'users',
      title: 'حركات المستخدمين',
      legacyId: 'access~audit',
      navModule: 'access',
    },
  },
  {
    path: '/users/matrix',
    lazy: async () => ({
      Component: (await import('@/features/users/pages/UserPermissionsPage')).default,
    }),
    handle: {
      module: 'users',
      title: 'صلاحيات العمليات والنطاقات',
      legacyId: 'access~matrix',
      navModule: 'access',
    },
  },
  {
    path: '/users/password',
    lazy: async () => ({
      Component: (await import('@/features/users/pages/ChangePasswordPage')).default,
    }),
    handle: {
      module: 'users',
      title: 'تغيير كلمة مرور مستخدم',
      legacyId: 'access~password',
      navModule: 'access',
    },
  },
  {
    path: '/users/sessions',
    lazy: async () => ({
      Component: (await import('@/features/users/pages/UserSessionsPage')).default,
    }),
    handle: {
      module: 'users',
      title: 'الجلسات النشطة وقفل الجلسة',
      legacyId: 'access~sessions',
      navModule: 'access',
    },
  },
  {
    path: '/users/users',
    lazy: async () => ({
      Component: (await import('@/features/users/pages/UserDirectoryPage')).default,
    }),
    handle: {
      module: 'users',
      title: 'قائمة المستخدمين وبطاقة المستخدم',
      legacyId: 'access~users',
      navModule: 'access',
    },
  },
  {
    path: '/users/users-add',
    lazy: async () => ({
      Component: (await import('@/features/users/pages/CreateUserPage')).default,
    }),
    handle: {
      module: 'users',
      title: 'إضافة مستخدم',
      legacyId: 'access~users-add',
      navModule: 'access',
    },
  },
];
