import { ROUTES } from '@/core/config/navigation-paths';
import type { MenuItem } from '@/core/types/MenuItem';
export const MENU_ITEMS: Record<string, MenuItem[]> = {
  dashboard: [],
  access: [
    {
      id: ROUTES.USERS_NEW,
      label: 'إضافة مستخدم',
      target: ROUTES.USERS_NEW,
    },
    {
      id: ROUTES.USERS,
      label: 'قائمة المستخدمين',
      target: ROUTES.USERS,
    },
    {
      id: ROUTES.USERS_PASSWORD,
      label: 'تغيير كلمة مرور مستخدم',
      target: ROUTES.USERS_PASSWORD,
    },
    {
      id: ROUTES.USERS_MATRIX,
      label: 'صلاحيات العمليات والنطاقات',
      target: ROUTES.USERS_MATRIX,
    },
    {
      id: ROUTES.USERS_AUDIT,
      label: 'حركات المستخدمين',
      target: ROUTES.USERS_AUDIT,
    },
    {
      id: ROUTES.USERS_SESSIONS,
      label: 'الجلسات النشطة وقفل الجلسة',
      target: ROUTES.USERS_SESSIONS,
    },
  ],
  settings: [
    {
      id: ROUTES.SETTINGS,
      label: 'مركز الإعدادات',
      target: ROUTES.SETTINGS,
    },
    {
      id: ROUTES.SETTINGS_MIGRATION,
      label: 'استيراد بطاقات من CSV',
      target: ROUTES.SETTINGS_MIGRATION,
    },
    {
      id: 'backup',
      label: 'النسخ الاحتياطي والاسترجاع',
      children: [
        {
          id: ROUTES.SETTINGS_BACKUP,
          label: 'النسخ الاحتياطي',
          target: ROUTES.SETTINGS_BACKUP,
        },
        {
          id: ROUTES.SETTINGS_RESTORE,
          label: 'استرجاع نسخة احتياطية',
          target: ROUTES.SETTINGS_RESTORE,
        },
        {
          id: ROUTES.SETTINGS_BACKUP_POLICY,
          label: 'إعدادات النسخ الاحتياطي',
          target: ROUTES.SETTINGS_BACKUP_POLICY,
        },
      ],
    },
    {
      id: 'behavior',
      label: 'إعدادات سلوك النظام',
      children: [
        {
          id: ROUTES.SETTINGS_SYSTEM_COMPANY,
          label: 'إعدادات المنشأة',
          target: ROUTES.SETTINGS_SYSTEM_COMPANY,
        },
        {
          id: ROUTES.SETTINGS_SYSTEM_ACCOUNTING,
          label: 'إعدادات المحاسبة والضرائب',
          target: ROUTES.SETTINGS_SYSTEM_ACCOUNTING,
        },
        {
          id: ROUTES.SETTINGS_SYSTEM_BRANCHES,
          label: 'إعدادات الفروع',
          target: ROUTES.SETTINGS_SYSTEM_BRANCHES,
        },
        {
          id: ROUTES.SETTINGS_SYSTEM_SALES,
          label: 'إعدادات المبيعات',
          target: ROUTES.SETTINGS_SYSTEM_SALES,
        },
        {
          id: ROUTES.SETTINGS_SYSTEM_PURCHASES,
          label: 'إعدادات المشتريات',
          target: ROUTES.SETTINGS_SYSTEM_PURCHASES,
        },
        {
          id: ROUTES.SETTINGS_SYSTEM_INVENTORY,
          label: 'إعدادات المخزون',
          target: ROUTES.SETTINGS_SYSTEM_INVENTORY,
        },
        {
          id: ROUTES.SETTINGS_SYSTEM_EXPENSES,
          label: 'إعدادات المصروفات والسندات',
          target: ROUTES.SETTINGS_SYSTEM_EXPENSES,
        },
        {
          id: ROUTES.SETTINGS_SYSTEM_DOCUMENTS,
          label: 'إعدادات المستندات والترقيم',
          target: ROUTES.SETTINGS_SYSTEM_DOCUMENTS,
        },
        {
          id: ROUTES.SETTINGS_SYSTEM_PRINTING,
          label: 'إعدادات الطباعة',
          target: ROUTES.SETTINGS_SYSTEM_PRINTING,
        },
        {
          id: ROUTES.SETTINGS_SYSTEM_GENERAL,
          label: 'الإعدادات العامة',
          target: ROUTES.SETTINGS_SYSTEM_GENERAL,
        },
      ],
    },
    {
      id: ROUTES.SETTINGS_BRANCHES,
      label: 'إدارة الفروع',
      target: ROUTES.SETTINGS_BRANCHES,
    },
    {
      id: ROUTES.SETTINGS_DATABASE,
      label: 'الاتصال بقاعدة البيانات والفترات',
      target: ROUTES.SETTINGS_DATABASE,
    },
    {
      id: 'database-creation',
      label: 'إنشاء الفترة وترحيل الأرصدة',
      children: [
        {
          id: ROUTES.SETTINGS_ANNUAL_BOOKS,
          label: 'إنشاء الفترة المالية وترحيل الأرصدة',
          target: ROUTES.SETTINGS_ANNUAL_BOOKS,
        },
        {
          id: ROUTES.INVENTORY_END_STOCK,
          label: 'أرصدة مخزون آخر المدة',
          target: ROUTES.INVENTORY_END_STOCK,
        },
        {
          id: ROUTES.ACCOUNTING_END_BALANCES,
          label: 'أرصدة جميع الحسابات',
          target: ROUTES.ACCOUNTING_END_BALANCES,
        },
      ],
    },
  ],
  employees: [
    {
      id: ROUTES.EMPLOYEES_NEW,
      label: 'إضافة موظف',
      target: ROUTES.EMPLOYEES_NEW,
    },
    {
      id: ROUTES.EMPLOYEES,
      label: 'قائمة الموظفين',
      target: ROUTES.EMPLOYEES,
    },
    {
      id: ROUTES.EMPLOYEES_PAYROLL,
      label: 'احتساب وإثبات رواتب فترة',
      target: ROUTES.EMPLOYEES_PAYROLL,
    },
    {
      id: ROUTES.EMPLOYEES_SALARY_PAYMENT,
      label: 'صرف رواتب الموظفين',
      target: ROUTES.EMPLOYEES_SALARY_PAYMENT,
    },
    {
      id: ROUTES.EMPLOYEES_SALARY_REPORT,
      label: 'تقرير رواتب الموظفين',
      target: ROUTES.EMPLOYEES_SALARY_REPORT,
    },
    {
      id: ROUTES.EMPLOYEES_ADVANCE,
      label: 'صرف سلفة موظف',
      target: ROUTES.EMPLOYEES_ADVANCE,
    },
  ],
  customers: [
    {
      id: ROUTES.CUSTOMERS_NEW,
      label: 'إضافة عميل',
      target: ROUTES.CUSTOMERS_NEW,
    },
    {
      id: ROUTES.CUSTOMERS,
      label: 'قائمة العملاء',
      target: ROUTES.CUSTOMERS,
    },
    {
      id: ROUTES.CUSTOMERS_GROUPS,
      label: 'مجموعات العملاء والموردين',
      target: ROUTES.CUSTOMERS_GROUPS,
    },
  ],
  suppliers: [
    {
      id: ROUTES.SUPPLIERS_NEW,
      label: 'إضافة مورد',
      target: ROUTES.SUPPLIERS_NEW,
    },
    {
      id: ROUTES.SUPPLIERS,
      label: 'قائمة الموردين',
      target: ROUTES.SUPPLIERS,
    },
  ],
  inventory: [
    {
      id: ROUTES.INVENTORY_ITEMS_NEW,
      label: 'إضافة صنف',
      target: ROUTES.INVENTORY_ITEMS_NEW,
    },
    {
      id: ROUTES.INVENTORY_ITEMS,
      label: 'قائمة الأصناف',
      target: ROUTES.INVENTORY_ITEMS,
    },
    {
      id: 'units',
      label: 'الوحدات',
      children: [
        {
          id: ROUTES.INVENTORY_UNITS_ADD,
          label: 'إضافة وحدة',
          target: ROUTES.INVENTORY_UNITS_ADD,
        },
        {
          id: ROUTES.INVENTORY_UNITS,
          label: 'قائمة الوحدات',
          target: ROUTES.INVENTORY_UNITS,
        },
      ],
    },
    {
      id: 'groups',
      label: 'المجموعات',
      children: [
        {
          id: ROUTES.INVENTORY_GROUPS_ADD,
          label: 'إضافة مجموعة',
          target: ROUTES.INVENTORY_GROUPS_ADD,
        },
        {
          id: ROUTES.INVENTORY_GROUPS,
          label: 'قائمة المجموعات',
          target: ROUTES.INVENTORY_GROUPS,
        },
      ],
    },
    {
      id: ROUTES.INVENTORY_WAREHOUSES_ADD,
      label: 'إضافة مخزن',
      target: ROUTES.INVENTORY_WAREHOUSES_ADD,
    },
    {
      id: ROUTES.INVENTORY_WAREHOUSES,
      label: 'قائمة المخازن',
      target: ROUTES.INVENTORY_WAREHOUSES,
    },
    {
      id: ROUTES.INVENTORY,
      label: 'تقرير أرصدة المخازن',
      target: ROUTES.INVENTORY,
    },
    {
      id: ROUTES.INVENTORY_COST,
      label: 'تقرير تكلفة المخزون',
      target: ROUTES.INVENTORY_COST,
    },
    {
      id: ROUTES.INVENTORY_TRANSFER_DOCUMENT,
      label: 'التحويل بين المخازن',
      target: ROUTES.INVENTORY_TRANSFER_DOCUMENT,
    },
    {
      id: ROUTES.INVENTORY_TRANSFERS,
      label: 'فواتير التحويل بين المخازن',
      target: ROUTES.INVENTORY_TRANSFERS,
    },
    {
      id: ROUTES.INVENTORY_OPENING_STOCK,
      label: 'إضافة أصناف بداية المدة',
      target: ROUTES.INVENTORY_OPENING_STOCK,
    },
    {
      id: ROUTES.INVENTORY_OPENING_STOCK_REPORT,
      label: 'تقرير أصناف بداية المدة',
      target: ROUTES.INVENTORY_OPENING_STOCK_REPORT,
    },
    {
      id: ROUTES.INVENTORY_ADJUSTMENT,
      label: 'تسوية المخزون',
      target: ROUTES.INVENTORY_ADJUSTMENT,
    },
    {
      id: ROUTES.INVENTORY_MOVEMENTS,
      label: 'حركة الأصناف',
      target: ROUTES.INVENTORY_MOVEMENTS,
    },
    {
      id: ROUTES.INVENTORY_REORDER,
      label: 'أصناف وصلت حد الطلب',
      target: ROUTES.INVENTORY_REORDER,
    },
    {
      id: ROUTES.INVENTORY_STAGNANT,
      label: 'الأصناف الراكدة',
      target: ROUTES.INVENTORY_STAGNANT,
    },
    {
      id: 'inventory-extra',
      label: 'تقارير وإجراءات إضافية',
      children: [
        {
          id: ROUTES.INVENTORY_COUNT,
          label: 'الجرد الفعلي',
          target: ROUTES.INVENTORY_COUNT,
        },
        {
          id: ROUTES.INVENTORY_ADJUSTMENTS,
          label: 'قائمة تسويات المخزون',
          target: ROUTES.INVENTORY_ADJUSTMENTS,
        },
        {
          id: ROUTES.INVENTORY_HISTORICAL_COST,
          label: 'مراجعة تكلفة الصنف التاريخية',
          target: ROUTES.INVENTORY_HISTORICAL_COST,
        },
        {
          id: ROUTES.INVENTORY_END_STOCK,
          label: 'تقرير مخزون آخر المدة',
          target: ROUTES.INVENTORY_END_STOCK,
        },
      ],
    },
  ],
  expenses: [
    {
      id: ROUTES.EXPENSES_EXPENSE_TYPES,
      label: 'أنواع المصروفات',
      target: ROUTES.EXPENSES_EXPENSE_TYPES,
    },
    {
      id: ROUTES.EXPENSES_ADD,
      label: 'إضافة مصروف',
      target: ROUTES.EXPENSES_ADD,
    },
    {
      id: ROUTES.EXPENSES_EXPENSE_LIST,
      label: 'قائمة المصروفات',
      target: ROUTES.EXPENSES_EXPENSE_LIST,
    },
    {
      id: ROUTES.EXPENSES_EXPENSE_REPORT,
      label: 'تقارير المصروفات',
      target: ROUTES.EXPENSES_EXPENSE_REPORT,
    },
  ],
  purchases: [
    {
      id: ROUTES.PURCHASES_NEW,
      label: 'فاتورة شراء',
      target: ROUTES.PURCHASES_NEW,
    },
    {
      id: ROUTES.PURCHASES,
      label: 'فواتير المرتجعات والمشتريات',
      target: ROUTES.PURCHASES,
    },
    {
      id: ROUTES.PURCHASES_PURCHASE_RETURNS,
      label: 'فاتورة مرتجع شراء',
      target: ROUTES.PURCHASES_PURCHASE_RETURNS,
    },
    {
      id: ROUTES.PURCHASES_PURCHASE_REPORT,
      label: 'تقرير المشتريات',
      target: ROUTES.PURCHASES_PURCHASE_REPORT,
    },
  ],
  sales: [
    {
      id: ROUTES.SALES_NEW,
      label: 'فاتورة مبيعات',
      target: ROUTES.SALES_NEW,
    },
    {
      id: ROUTES.SALES,
      label: 'قائمة فواتير المبيعات',
      target: ROUTES.SALES,
    },
    {
      id: ROUTES.SALES_SALES_RETURNS,
      label: 'فاتورة مرتجع مبيعات',
      target: ROUTES.SALES_SALES_RETURNS,
    },
    {
      id: ROUTES.SALES_SALES_REPORT,
      label: 'تقرير المبيعات',
      target: ROUTES.SALES_SALES_REPORT,
    },
    {
      id: ROUTES.INVENTORY_PRICES,
      label: 'تسعيرة الأصناف',
      target: ROUTES.INVENTORY_PRICES,
    },
    {
      id: ROUTES.SALES_SALES_CHART,
      label: 'الرسم البياني لحركة المبيعات',
      target: ROUTES.SALES_SALES_CHART,
    },
    {
      id: ROUTES.SALES_TARGETS,
      label: 'أهداف المبيعات ومتابعة الإنجاز',
      target: ROUTES.SALES_TARGETS,
    },
  ],
  accounts: [
    {
      id: ROUTES.ACCOUNTING_VOUCHERS_PAYMENT_NEW,
      label: 'سند صرف',
      target: ROUTES.ACCOUNTING_VOUCHERS_PAYMENT_NEW,
    },
    {
      id: ROUTES.ACCOUNTING_VOUCHERS_RECEIPT_NEW,
      label: 'سند قبض',
      target: ROUTES.ACCOUNTING_VOUCHERS_RECEIPT_NEW,
    },
    {
      id: ROUTES.ACCOUNTING_VOUCHERS,
      label: 'بحث سندات الصرف والقبض',
      target: ROUTES.ACCOUNTING_VOUCHERS,
    },
    {
      id: ROUTES.ACCOUNTING_STATEMENT,
      label: 'كشف حساب',
      target: ROUTES.ACCOUNTING_STATEMENT,
    },
    {
      id: ROUTES.ACCOUNTING_CASH_MOVEMENT,
      label: 'حركة الصندوق',
      target: ROUTES.ACCOUNTING_CASH_MOVEMENT,
    },
    {
      id: ROUTES.CUSTOMERS_CUSTOMER_BALANCES,
      label: 'تقرير حسابات العملاء',
      target: ROUTES.CUSTOMERS_CUSTOMER_BALANCES,
    },
    {
      id: ROUTES.SUPPLIERS_SUPPLIER_BALANCES,
      label: 'تقرير حسابات الموردين',
      target: ROUTES.SUPPLIERS_SUPPLIER_BALANCES,
    },
    {
      id: ROUTES.EXPENSES_EXPENSE_REPORT,
      label: 'تقرير المصروفات',
      target: ROUTES.EXPENSES_EXPENSE_REPORT,
    },
    {
      id: ROUTES.EMPLOYEES_WITHDRAWALS,
      label: 'تقرير مسحوبات الموظفين',
      target: ROUTES.EMPLOYEES_WITHDRAWALS,
    },
    {
      id: ROUTES.ACCOUNTING_OPENING,
      label: 'إضافة الأرصدة الافتتاحية',
      target: ROUTES.ACCOUNTING_OPENING,
    },
    {
      id: ROUTES.ACCOUNTING_OPENING_REPORT,
      label: 'تقرير الأرصدة الافتتاحية',
      target: ROUTES.ACCOUNTING_OPENING_REPORT,
    },
    {
      id: ROUTES.ACCOUNTING_TAX_REPORT,
      label: 'تقرير الضرائب',
      target: ROUTES.ACCOUNTING_TAX_REPORT,
    },
    {
      id: ROUTES.ACCOUNTING,
      label: 'القيود اليومية',
      target: ROUTES.ACCOUNTING,
    },
    {
      id: 'currency',
      label: 'العملات',
      children: [
        {
          id: ROUTES.ACCOUNTING_CURRENCIES_ADD,
          label: 'إضافة عملة وسعر صرف',
          target: ROUTES.ACCOUNTING_CURRENCIES_ADD,
        },
        {
          id: ROUTES.ACCOUNTING_CURRENCIES,
          label: 'قائمة العملات',
          target: ROUTES.ACCOUNTING_CURRENCIES,
        },
        {
          id: ROUTES.ACCOUNTING_FX,
          label: 'مراجعة أرصدة العملات',
          target: ROUTES.ACCOUNTING_FX,
        },
      ],
    },
    {
      id: 'cash-bank',
      label: 'الصناديق والبنوك',
      children: [
        {
          id: ROUTES.ACCOUNTING_CASH_BANK,
          label: 'إضافة الصناديق والبنوك',
          target: ROUTES.ACCOUNTING_CASH_BANK,
        },
        {
          id: ROUTES.ACCOUNTING_CASH_BANK_LIST,
          label: 'قائمة الصناديق والبنوك',
          target: ROUTES.ACCOUNTING_CASH_BANK_LIST,
        },
      ],
    },
    {
      id: 'assets',
      label: 'الأصول الثابتة',
      children: [
        {
          id: ROUTES.ACCOUNTING_ASSETS_ADD,
          label: 'إضافة أصل ثابت',
          target: ROUTES.ACCOUNTING_ASSETS_ADD,
        },
        {
          id: ROUTES.ACCOUNTING_ASSETS,
          label: 'قائمة الأصول الثابتة',
          target: ROUTES.ACCOUNTING_ASSETS,
        },
        {
          id: ROUTES.ACCOUNTING_ASSET_PURCHASE,
          label: 'إثبات اقتناء أصل',
          target: ROUTES.ACCOUNTING_ASSET_PURCHASE,
        },
        {
          id: ROUTES.ACCOUNTING_DEPRECIATION,
          label: 'إثبات إهلاك فترة',
          target: ROUTES.ACCOUNTING_DEPRECIATION,
        },
        {
          id: ROUTES.ACCOUNTING_ASSET_REPORT,
          label: 'تقرير الأصول والإهلاك',
          target: ROUTES.ACCOUNTING_ASSET_REPORT,
        },
      ],
    },
    {
      id: 'contacts',
      label: 'الدائنون والمدينون',
      children: [
        {
          id: ROUTES.ACCOUNTING_CONTACTS,
          label: 'إضافة حساب دائن أو مدين',
          target: ROUTES.ACCOUNTING_CONTACTS,
        },
        {
          id: ROUTES.ACCOUNTING_CONTACTS_LEDGER,
          label: 'قائمة حسابات الدائنين والمدينين وحركتها',
          target: ROUTES.ACCOUNTING_CONTACTS_LEDGER,
        },
      ],
    },
    {
      id: 'journals',
      label: 'دليل الحسابات والقيود',
      children: [
        {
          id: ROUTES.ACCOUNTING_ACCOUNTS,
          label: 'إضافة حساب ودليل الحسابات',
          target: ROUTES.ACCOUNTING_ACCOUNTS,
        },
        {
          id: ROUTES.ACCOUNTING_JOURNAL_NEW,
          label: 'إضافة قيد يومي يدوي',
          target: ROUTES.ACCOUNTING_JOURNAL_NEW,
        },
      ],
    },
    {
      id: 'periods',
      label: 'السنة والفترات والإقفال',
      children: [
        {
          id: ROUTES.ACCOUNTING_PERIODS,
          label: 'السنة والفترات المالية',
          target: ROUTES.ACCOUNTING_PERIODS,
        },
        {
          id: ROUTES.ACCOUNTING_END_BALANCES,
          label: 'الحسابات في الفترة المنتهية',
          target: ROUTES.ACCOUNTING_END_BALANCES,
        },
        {
          id: ROUTES.ACCOUNTING_CLOSE,
          label: 'مراجعة إقفال السنة والفترة',
          target: ROUTES.ACCOUNTING_CLOSE,
        },
        {
          id: ROUTES.ACCOUNTING_REOPEN,
          label: 'طلب إعادة فتح فترة',
          target: ROUTES.ACCOUNTING_REOPEN,
        },
      ],
    },
  ],
  financial: [
    {
      id: ROUTES.FINANCIAL_STATEMENTS_PROFIT_ITEMS,
      label: 'الأرباح من الأصناف',
      target: ROUTES.FINANCIAL_STATEMENTS_PROFIT_ITEMS,
    },
    {
      id: ROUTES.FINANCIAL_STATEMENTS_PROFIT_CUSTOMERS,
      label: 'الأرباح من العملاء',
      target: ROUTES.FINANCIAL_STATEMENTS_PROFIT_CUSTOMERS,
    },
    {
      id: ROUTES.FINANCIAL_STATEMENTS_INCOME,
      label: 'قائمة الدخل',
      target: ROUTES.FINANCIAL_STATEMENTS_INCOME,
    },
    {
      id: ROUTES.FINANCIAL_STATEMENTS_BALANCE_SHEET,
      label: 'قائمة المركز المالي',
      target: ROUTES.FINANCIAL_STATEMENTS_BALANCE_SHEET,
    },
    {
      id: ROUTES.FINANCIAL_STATEMENTS_CASH_FLOW,
      label: 'قائمة التدفقات النقدية',
      target: ROUTES.FINANCIAL_STATEMENTS_CASH_FLOW,
    },
    {
      id: ROUTES.FINANCIAL_STATEMENTS_MAPPING,
      label: 'ربط الحسابات بالقوائم المالية',
      target: ROUTES.FINANCIAL_STATEMENTS_MAPPING,
    },
  ],
};
export const menuLeaves = (entries: MenuItem[]): MenuItem[] =>
  entries.flatMap((entry) => (entry.children ? menuLeaves(entry.children) : [entry]));
