# ملكية الميزات والشاشات — النسخة الحالية

الخريطة الحالية مستخرجة من route modules والمصدر. ليست نسب إنجاز ولا إثباتًا لوجود Backend. مرجع الإزالة: `REMOVAL_LEDGER.md`، ونتائج التنفيذ: `VERIFICATION.md`.

## الفصل بين التنقل والنطاق التجاري

`app` يركّب المسارات والمزوديـن والتخطيط؛ `core` للبنية التحتية؛ `shared` لمكونات وأدوات لا تعرف بيانات ERP. وحدات التنقل لا تعادل دائمًا مالك الحسابات أو العقود.

| النطاق | المسؤولية |
|---|---|
| ledger | العقود والحسابات المالية الأساسية، الدفاتر والعملات والصندوق، سجلات المصروفات المالية. |
| organization | المنشأة والفروع والسياسات والنسخ الاحتياطية وقواعد الإعدادات. |
| stock | عقود الأصناف والمخازن والوحدات والأرصدة والحركات والمستندات. |
| personnel | عقود الموظفين وحركات الرواتب والسلف. |
| parties | عقود العملاء والموردين والمجموعات المشتركة. |
| trade | عقود الفواتير والمرتجعات والحسابات المشتركة للمبيعات والمشتريات. |
| master-data | تحرير التعريفات وحقول lookup التي تعتمد على نطاق تجاري، ولذلك لا توضع في shared. |

هذه الوحدات لا تنشئ ميزات منتج جديدة؛ أعيد تصنيف تنفيذ وعقود موجودة لحل الاعتماد المتبادل. الإعدادات السنوية تبقى شاشة محاسبية ضمن مسار الإعدادات؛ شاشة المستند المختلط `app/pages/InvoiceDetailsPage.tsx` تختار شاشة البيع/الشراء من نوع المستند المحمل.

## قواعد الملكية

Pages تعرض شاشة محددة وتستخدم components/hooks. Hooks تنسق الحالة والنموذج والعمليات. Queries تملك مفاتيح cache وطلب البيانات. API يحدد method/path ويحيل النقل إلى `apiClient`. Mappers يحوّل إدخال UI إلى DTO؛ validation يملك Zod وقواعد UX؛ services تملك الحسابات النقية. ليس كل ملف بحاجة إلى المرور بطبقة service إضافية إن لم توجد عملية تحويل/حساب. لا يُضاف مجلد أو wrapper لمجرد إكمال الشكل.

المسارات في `app/router` لأنها تركّب الميزات؛ طبقة core لا تستورد شاشات الميزات. المسارات التقنية لا تخلط مع API endpoints. `public/` يحوي عقودًا ضيقة وتنفيذًا معلنًا يستهلكه نطاق آخر؛ لا توجد broad forwarding barrels.

الصلاحيات الحالية في `core/auth/permissions.ts` ومصادقة المسار في `app/router/ProtectedRoute.tsx` وشروط كل ميزة محفوظة. ضمان الصلاحيات والفروع على الخادم غير متحقق.

## Navigation → Module → Feature → Page

| المسار | وحدة التجميع | مالك الشاشة | الملف |
|---|---|---|---|
| `/accounting` | accounting | accounting | `src/features/accounting/pages/AccountingOverviewPage.tsx` |
| `/accounting/vouchers/payment/new` | accounting | accounting | `src/features/accounting/pages/CreatePaymentVoucherPage.tsx` |
| `/accounting/vouchers/receipt/new` | accounting | accounting | `src/features/accounting/pages/CreateReceiptVoucherPage.tsx` |
| `/accounting/accounts` | accounting | accounting | `src/features/accounting/pages/ChartOfAccountsPage.tsx` |
| `/accounting/asset-purchase` | accounting | accounting | `src/features/accounting/pages/AssetAcquisitionPage.tsx` |
| `/accounting/asset-report` | accounting | accounting | `src/features/accounting/pages/AssetDepreciationReportPage.tsx` |
| `/accounting/assets` | accounting | accounting | `src/features/accounting/pages/AssetListPage.tsx` |
| `/accounting/assets-add` | accounting | accounting | `src/features/accounting/pages/CreateAssetPage.tsx` |
| `/accounting/cash-bank` | accounting | accounting | `src/features/accounting/pages/CreateCashAccountPage.tsx` |
| `/accounting/cash-bank-list` | accounting | accounting | `src/features/accounting/pages/CashAccountListPage.tsx` |
| `/accounting/cash-movement` | accounting | accounting | `src/features/accounting/pages/CashMovementPage.tsx` |
| `/accounting/close` | accounting | accounting | `src/features/accounting/pages/FiscalYearClosingPage.tsx` |
| `/accounting/contacts` | accounting | accounting | `src/features/accounting/pages/AccountingContactListPage.tsx` |
| `/accounting/contacts-ledger` | accounting | accounting | `src/features/accounting/pages/AccountingContactLedgerPage.tsx` |
| `/accounting/currencies` | accounting | accounting | `src/features/accounting/pages/CurrencyListPage.tsx` |
| `/accounting/currencies-add` | accounting | accounting | `src/features/accounting/pages/CreateCurrencyPage.tsx` |
| `/accounting/depreciation` | accounting | accounting | `src/features/accounting/pages/AssetDepreciationPage.tsx` |
| `/accounting/end-balances` | accounting | accounting | `src/features/accounting/pages/ClosingAccountBalancesPage.tsx` |
| `/accounting/fx` | accounting | accounting | `src/features/accounting/pages/CurrencyDocumentsPage.tsx` |
| `/accounting/journal/new` | accounting | accounting | `src/features/accounting/pages/CreateJournalEntryPage.tsx` |
| `/accounting/opening` | accounting | accounting | `src/features/accounting/pages/OpeningAccountBalancesPage.tsx` |
| `/accounting/opening-report` | accounting | accounting | `src/features/accounting/pages/OpeningAccountBalancesReportPage.tsx` |
| `/accounting/periods` | accounting | accounting | `src/features/accounting/pages/FiscalPeriodReviewPage.tsx` |
| `/accounting/reopen` | accounting | accounting | `src/features/accounting/pages/FiscalYearReopeningPage.tsx` |
| `/accounting/statement` | accounting | accounting | `src/features/accounting/pages/AccountStatementPage.tsx` |
| `/accounting/tax-report` | accounting | accounting | `src/features/accounting/pages/TaxReportPage.tsx` |
| `/accounting/vouchers` | accounting | accounting | `src/features/accounting/pages/VoucherListPage.tsx` |
| `/accounting/statement/:partyId` | accounting | accounting | `src/features/accounting/pages/PartyAccountStatementPage.tsx` |
| `/login` | auth | auth | `src/features/auth/pages/LoginPage.tsx` |
| `/customers` | customers | customers | `src/features/customers/pages/CustomerListPage.tsx` |
| `/customers/new` | customers | customers | `src/features/customers/pages/CreateCustomerPage.tsx` |
| `/customers/customer-balances` | customers | customers | `src/features/customers/pages/CustomerBalancesPage.tsx` |
| `/customers/groups` | customers | customers | `src/features/customers/pages/PartyGroupListPage.tsx` |
| `/dashboard` | dashboard | dashboard | `src/features/dashboard/pages/DashboardPage.tsx` |
| `/employees` | employees | employees | `src/features/employees/pages/EmployeeListPage.tsx` |
| `/employees/new` | employees | employees | `src/features/employees/pages/CreateEmployeePage.tsx` |
| `/employees/advance` | employees | employees | `src/features/employees/pages/EmployeeAdvancePage.tsx` |
| `/employees/payroll` | employees | employees | `src/features/employees/pages/PayrollAccrualPage.tsx` |
| `/employees/salary-payment` | employees | employees | `src/features/employees/pages/SalaryPaymentPage.tsx` |
| `/employees/salary-report` | employees | employees | `src/features/employees/pages/SalaryReportPage.tsx` |
| `/employees/withdrawals` | employees | employees | `src/features/employees/pages/EmployeeWithdrawalsPage.tsx` |
| `/expenses` | expenses | expenses | `src/features/expenses/pages/ExpenseOverviewPage.tsx` |
| `/expenses/add` | expenses | expenses | `src/features/expenses/pages/CreateExpensePage.tsx` |
| `/expenses/expense-list` | expenses | expenses | `src/features/expenses/pages/ExpenseListPage.tsx` |
| `/expenses/expense-report` | expenses | expenses | `src/features/expenses/pages/ExpenseReportPage.tsx` |
| `/expenses/expense-types` | expenses | expenses | `src/features/expenses/pages/ExpenseTypeListPage.tsx` |
| `/financial-statements` | financial | financial | `src/features/financial/pages/FinancialOverviewPage.tsx` |
| `/financial-statements/balance-sheet` | financial | financial | `src/features/financial/pages/BalanceSheetPage.tsx` |
| `/financial-statements/cash-flow` | financial | financial | `src/features/financial/pages/CashFlowPage.tsx` |
| `/financial-statements/income` | financial | financial | `src/features/financial/pages/IncomeStatementPage.tsx` |
| `/financial-statements/mapping` | financial | financial | `src/features/financial/pages/FinancialAccountMappingPage.tsx` |
| `/financial-statements/profit-customers` | financial | financial | `src/features/financial/pages/CustomerProfitPage.tsx` |
| `/financial-statements/profit-items` | financial | financial | `src/features/financial/pages/ProductProfitPage.tsx` |
| `/inventory` | inventory | inventory | `src/features/inventory/pages/InventoryBalancesPage.tsx` |
| `/inventory/movements` | inventory | inventory | `src/features/inventory/pages/InventoryMovementsPage.tsx` |
| `/inventory/adjustment` | inventory | inventory | `src/features/inventory/pages/StockAdjustmentPage.tsx` |
| `/inventory/adjustments` | inventory | inventory | `src/features/inventory/pages/StockAdjustmentHistoryPage.tsx` |
| `/inventory/cost` | inventory | inventory | `src/features/inventory/pages/InventoryValuationPage.tsx` |
| `/inventory/count` | inventory | inventory | `src/features/inventory/pages/StockCountPage.tsx` |
| `/inventory/end-stock` | inventory | inventory | `src/features/inventory/pages/ClosingStockPage.tsx` |
| `/inventory/groups` | inventory | inventory | `src/features/inventory/pages/ItemGroupListPage.tsx` |
| `/inventory/groups-add` | inventory | inventory | `src/features/inventory/pages/CreateItemGroupPage.tsx` |
| `/inventory/historical-cost` | inventory | inventory | `src/features/inventory/pages/HistoricalInventoryCostPage.tsx` |
| `/inventory/opening-stock` | inventory | inventory | `src/features/inventory/pages/OpeningStockPage.tsx` |
| `/inventory/opening-stock-report` | inventory | inventory | `src/features/inventory/pages/OpeningStockReportPage.tsx` |
| `/inventory/reorder` | inventory | inventory | `src/features/inventory/pages/ReorderAlertsPage.tsx` |
| `/inventory/stagnant` | inventory | inventory | `src/features/inventory/pages/StagnantInventoryPage.tsx` |
| `/inventory/transfer-document` | inventory | inventory | `src/features/inventory/pages/StockTransferPage.tsx` |
| `/inventory/transfers` | inventory | inventory | `src/features/inventory/pages/StockTransferHistoryPage.tsx` |
| `/inventory/units` | inventory | inventory | `src/features/inventory/pages/UnitListPage.tsx` |
| `/inventory/units-add` | inventory | inventory | `src/features/inventory/pages/CreateUnitPage.tsx` |
| `/inventory/warehouses` | inventory | inventory | `src/features/inventory/pages/WarehouseListPage.tsx` |
| `/inventory/warehouses-add` | inventory | inventory | `src/features/inventory/pages/CreateWarehousePage.tsx` |
| `/inventory/items` | inventory | inventory | `src/features/inventory/pages/ProductListPage.tsx` |
| `/inventory/items/new` | inventory | inventory | `src/features/inventory/pages/CreateProductPage.tsx` |
| `/purchases` | purchases | purchases | `src/features/purchases/pages/PurchaseInvoiceListPage.tsx` |
| `/purchases/new` | purchases | purchases | `src/features/purchases/pages/CreatePurchaseInvoicePage.tsx` |
| `/purchases/purchase-report` | purchases | purchases | `src/features/purchases/pages/PurchaseSummaryPage.tsx` |
| `/purchases/purchase-returns` | purchases | purchases | `src/features/purchases/pages/PurchaseReturnsPage.tsx` |
| `/reports` | reports | reports | `src/features/reports/pages/ReportsPage.tsx` |
| `/sales` | sales | sales | `src/features/sales/pages/SalesInvoiceListPage.tsx` |
| `/sales/new` | sales | sales | `src/features/sales/pages/CreateSalesInvoicePage.tsx` |
| `/sales/sales-chart` | sales | sales | `src/features/sales/pages/SalesChartPage.tsx` |
| `/sales/sales-report` | sales | sales | `src/features/sales/pages/SalesSummaryPage.tsx` |
| `/sales/sales-returns` | sales | sales | `src/features/sales/pages/SalesReturnsPage.tsx` |
| `/sales/targets` | sales | sales | `src/features/sales/pages/SalesTargetsPage.tsx` |
| `/inventory/prices` | sales | sales | `src/features/sales/pages/SalesItemPricingPage.tsx` |
| `/settings` | settings | settings | `src/features/settings/pages/SettingsOverviewPage.tsx` |
| `/settings/annual-books` | settings | settings | `src/features/settings/pages/FinancialBooksPage.tsx` |
| `/settings/backup` | settings | settings | `src/features/settings/pages/BackupListPage.tsx` |
| `/settings/backup-policy` | settings | settings | `src/features/settings/pages/BackupPolicyPage.tsx` |
| `/settings/branches` | settings | settings | `src/features/settings/pages/BranchListPage.tsx` |
| `/settings/branding` | settings | settings | `src/features/settings/pages/CompanySettingsPage.tsx` |
| `/settings/business` | settings | settings | `src/features/settings/pages/CompanySettingsPage.tsx` |
| `/settings/database` | settings | settings | `src/features/settings/pages/DatabaseStatusPage.tsx` |
| `/settings/general` | settings | settings | `src/features/settings/pages/GeneralSettingsPage.tsx` |
| `/settings/migration` | settings | settings | `src/features/settings/pages/ImportMasterDataPage.tsx` |
| `/settings/restore` | settings | settings | `src/features/settings/pages/RestoreBackupPage.tsx` |
| `/settings/sync` | settings | settings | `src/features/settings/pages/DatabaseStatusPage.tsx` |
| `/settings/system-accounting` | settings | settings | `src/features/settings/pages/AccountingSettingsPage.tsx` |
| `/settings/system-branches` | settings | settings | `src/features/settings/pages/BranchesSettingsPage.tsx` |
| `/settings/system-company` | settings | settings | `src/features/settings/pages/CompanySettingsPage.tsx` |
| `/settings/system-documents` | settings | settings | `src/features/settings/pages/DocumentsSettingsPage.tsx` |
| `/settings/system-expenses` | settings | settings | `src/features/settings/pages/ExpensesSettingsPage.tsx` |
| `/settings/system-general` | settings | settings | `src/features/settings/pages/GeneralSettingsPage.tsx` |
| `/settings/system-inventory` | settings | settings | `src/features/settings/pages/InventorySettingsPage.tsx` |
| `/settings/system-printing` | settings | settings | `src/features/settings/pages/PrintingSettingsPage.tsx` |
| `/settings/system-purchases` | settings | settings | `src/features/settings/pages/PurchasesSettingsPage.tsx` |
| `/settings/system-sales` | settings | settings | `src/features/settings/pages/SalesSettingsPage.tsx` |
| `/suppliers` | suppliers | suppliers | `src/features/suppliers/pages/SupplierListPage.tsx` |
| `/suppliers/new` | suppliers | suppliers | `src/features/suppliers/pages/CreateSupplierPage.tsx` |
| `/suppliers/supplier-balances` | suppliers | suppliers | `src/features/suppliers/pages/SupplierBalancesPage.tsx` |
| `/documents/:documentId` | trade | app | `src/app/pages/InvoiceDetailsPage.tsx` |
| `/users` | users | users | `src/features/users/pages/UserListPage.tsx` |
| `/users/audit` | users | users | `src/features/users/pages/UserAuditPage.tsx` |
| `/users/matrix` | users | users | `src/features/users/pages/UserPermissionsPage.tsx` |
| `/users/password` | users | users | `src/features/users/pages/ChangePasswordPage.tsx` |
| `/users/sessions` | users | users | `src/features/users/pages/UserSessionsPage.tsx` |
| `/users/new` | users | users | `src/features/users/pages/CreateUserPage.tsx` |
| `/users/:id/edit` | users | users | `src/features/users/pages/EditUserPage.tsx` |

تفاصيل Queries وAPIs والـvalidation لكل مسار في CSV. قوائم source closure محافظة: وجود API module في شجرة الاستيراد لا يعني أن كل endpoint مُعلن فيه يُستدعى من الشاشة.

ملكية أنماط CSS موثقة في `STYLE_OWNERSHIP.json`. مدخل CSS الوحيد من bootstrap هو `app/styles.css`؛ يستورد الأساس في core وأجزاء الميزات في مواضعها الأصلية. تحوّل Tailwind/PostCSS imports إلى CSS نهائي، وحُفظ تسلسل القواعد والتصريحات قبل وبعد الفصل.
