import type { MenuItem } from '@/core/types/MenuItem';
export const MENU_ITEMS: Record<string, MenuItem[]> = {
  dashboard: [],
  access: [
    {
      id: '/users/users-add',
      label: 'إضافة مستخدم',
      target: '/users/users-add',
    },
    {
      id: '/users/users',
      label: 'قائمة المستخدمين',
      target: '/users/users',
    },
    {
      id: '/users/password',
      label: 'تغيير كلمة مرور مستخدم',
      target: '/users/password',
    },
    {
      id: '/users/matrix',
      label: 'صلاحيات العمليات والنطاقات',
      target: '/users/matrix',
    },
    {
      id: '/users/audit',
      label: 'حركات المستخدمين',
      target: '/users/audit',
    },
    {
      id: '/users/sessions',
      label: 'الجلسات النشطة وقفل الجلسة',
      target: '/users/sessions',
    },
  ],
  settings: [
    {
      id: '/settings',
      label: 'مركز الإعدادات',
      target: '/settings',
    },
    {
      id: '/settings/migration',
      label: 'استيراد بطاقات من CSV',
      target: '/settings/migration',
    },
    {
      id: 'backup',
      label: 'النسخ الاحتياطي والاسترجاع',
      children: [
        {
          id: '/settings/backup',
          label: 'النسخ الاحتياطي',
          target: '/settings/backup',
        },
        {
          id: '/settings/restore',
          label: 'استرجاع نسخة احتياطية',
          target: '/settings/restore',
        },
        {
          id: '/settings/backup-policy',
          label: 'إعدادات النسخ الاحتياطي',
          target: '/settings/backup-policy',
        },
      ],
    },
    {
      id: 'behavior',
      label: 'إعدادات سلوك النظام',
      children: [
        {
          id: '/settings/system-company',
          label: 'إعدادات المنشأة',
          target: '/settings/system-company',
        },
        {
          id: '/settings/system-accounting',
          label: 'إعدادات المحاسبة والضرائب',
          target: '/settings/system-accounting',
        },
        {
          id: '/settings/system-branches',
          label: 'إعدادات الفروع',
          target: '/settings/system-branches',
        },
        {
          id: '/settings/system-sales',
          label: 'إعدادات المبيعات',
          target: '/settings/system-sales',
        },
        {
          id: '/settings/system-purchases',
          label: 'إعدادات المشتريات',
          target: '/settings/system-purchases',
        },
        {
          id: '/settings/system-inventory',
          label: 'إعدادات المخزون',
          target: '/settings/system-inventory',
        },
        {
          id: '/settings/system-expenses',
          label: 'إعدادات المصروفات والسندات',
          target: '/settings/system-expenses',
        },
        {
          id: '/settings/system-documents',
          label: 'إعدادات المستندات والترقيم',
          target: '/settings/system-documents',
        },
        {
          id: '/settings/system-printing',
          label: 'إعدادات الطباعة',
          target: '/settings/system-printing',
        },
        {
          id: '/settings/system-general',
          label: 'الإعدادات العامة',
          target: '/settings/system-general',
        },
      ],
    },
    {
      id: '/settings/branches',
      label: 'إدارة الفروع',
      target: '/settings/branches',
    },
    {
      id: '/settings/database',
      label: 'الاتصال بقاعدة البيانات والفترات',
      target: '/settings/database',
    },
    {
      id: 'database-creation',
      label: 'إنشاء الفترة وترحيل الأرصدة',
      children: [
        {
          id: '/settings/annual-books',
          label: 'إنشاء الفترة المالية وترحيل الأرصدة',
          target: '/settings/annual-books',
        },
        {
          id: '/inventory/end-stock',
          label: 'أرصدة مخزون آخر المدة',
          target: '/inventory/end-stock',
        },
        {
          id: '/accounting/end-balances',
          label: 'أرصدة جميع الحسابات',
          target: '/accounting/end-balances',
        },
      ],
    },
  ],
  employees: [
    {
      id: '/employees/new',
      label: 'إضافة موظف',
      target: '/employees/new',
    },
    {
      id: '/employees',
      label: 'قائمة الموظفين',
      target: '/employees',
    },
    {
      id: '/employees/payroll',
      label: 'احتساب وإثبات رواتب فترة',
      target: '/employees/payroll',
    },
    {
      id: '/employees/salary-payment',
      label: 'صرف رواتب الموظفين',
      target: '/employees/salary-payment',
    },
    {
      id: '/employees/salary-report',
      label: 'تقرير رواتب الموظفين',
      target: '/employees/salary-report',
    },
    {
      id: '/employees/advance',
      label: 'صرف سلفة موظف',
      target: '/employees/advance',
    },
  ],
  customers: [
    {
      id: '/customers/new',
      label: 'إضافة عميل',
      target: '/customers/new',
    },
    {
      id: '/customers',
      label: 'قائمة العملاء',
      target: '/customers',
    },
    {
      id: '/customers/groups',
      label: 'مجموعات العملاء والموردين',
      target: '/customers/groups',
    },
  ],
  suppliers: [
    {
      id: '/suppliers/new',
      label: 'إضافة مورد',
      target: '/suppliers/new',
    },
    {
      id: '/suppliers',
      label: 'قائمة الموردين',
      target: '/suppliers',
    },
  ],
  inventory: [
    {
      id: '/inventory/items/new',
      label: 'إضافة صنف',
      target: '/inventory/items/new',
    },
    {
      id: '/inventory/items',
      label: 'قائمة الأصناف',
      target: '/inventory/items',
    },
    {
      id: 'units',
      label: 'الوحدات',
      children: [
        {
          id: '/inventory/units-add',
          label: 'إضافة وحدة',
          target: '/inventory/units-add',
        },
        {
          id: '/inventory/units',
          label: 'قائمة الوحدات',
          target: '/inventory/units',
        },
      ],
    },
    {
      id: 'groups',
      label: 'المجموعات',
      children: [
        {
          id: '/inventory/groups-add',
          label: 'إضافة مجموعة',
          target: '/inventory/groups-add',
        },
        {
          id: '/inventory/groups',
          label: 'قائمة المجموعات',
          target: '/inventory/groups',
        },
      ],
    },
    {
      id: '/inventory/warehouses-add',
      label: 'إضافة مخزن',
      target: '/inventory/warehouses-add',
    },
    {
      id: '/inventory/warehouses',
      label: 'قائمة المخازن',
      target: '/inventory/warehouses',
    },
    {
      id: '/inventory',
      label: 'تقرير أرصدة المخازن',
      target: '/inventory',
    },
    {
      id: '/inventory/cost',
      label: 'تقرير تكلفة المخزون',
      target: '/inventory/cost',
    },
    {
      id: '/inventory/transfer-document',
      label: 'التحويل بين المخازن',
      target: '/inventory/transfer-document',
    },
    {
      id: '/inventory/transfers',
      label: 'فواتير التحويل بين المخازن',
      target: '/inventory/transfers',
    },
    {
      id: '/inventory/opening-stock',
      label: 'إضافة أصناف بداية المدة',
      target: '/inventory/opening-stock',
    },
    {
      id: '/inventory/opening-stock-report',
      label: 'تقرير أصناف بداية المدة',
      target: '/inventory/opening-stock-report',
    },
    {
      id: '/inventory/adjustment',
      label: 'تسوية المخزون',
      target: '/inventory/adjustment',
    },
    {
      id: '/inventory/movements',
      label: 'حركة الأصناف',
      target: '/inventory/movements',
    },
    {
      id: '/inventory/reorder',
      label: 'أصناف وصلت حد الطلب',
      target: '/inventory/reorder',
    },
    {
      id: '/inventory/stagnant',
      label: 'الأصناف الراكدة',
      target: '/inventory/stagnant',
    },
    {
      id: 'inventory-extra',
      label: 'تقارير وإجراءات إضافية',
      children: [
        {
          id: '/inventory/count',
          label: 'الجرد الفعلي',
          target: '/inventory/count',
        },
        {
          id: '/inventory/adjustments',
          label: 'قائمة تسويات المخزون',
          target: '/inventory/adjustments',
        },
        {
          id: '/inventory/historical-cost',
          label: 'مراجعة تكلفة الصنف التاريخية',
          target: '/inventory/historical-cost',
        },
        {
          id: '/inventory/end-stock',
          label: 'تقرير مخزون آخر المدة',
          target: '/inventory/end-stock',
        },
      ],
    },
  ],
  expenses: [
    {
      id: '/expenses/expense-types',
      label: 'أنواع المصروفات',
      target: '/expenses/expense-types',
    },
    {
      id: '/expenses/add',
      label: 'إضافة مصروف',
      target: '/expenses/add',
    },
    {
      id: '/expenses/expense-list',
      label: 'قائمة المصروفات',
      target: '/expenses/expense-list',
    },
    {
      id: '/expenses/expense-report',
      label: 'تقارير المصروفات',
      target: '/expenses/expense-report',
    },
  ],
  purchases: [
    {
      id: '/purchases/new',
      label: 'فاتورة شراء',
      target: '/purchases/new',
    },
    {
      id: '/purchases',
      label: 'فواتير المرتجعات والمشتريات',
      target: '/purchases',
    },
    {
      id: '/purchases/purchase-returns',
      label: 'فاتورة مرتجع شراء',
      target: '/purchases/purchase-returns',
    },
    {
      id: '/purchases/purchase-report',
      label: 'تقرير المشتريات',
      target: '/purchases/purchase-report',
    },
  ],
  sales: [
    {
      id: '/sales/new',
      label: 'فاتورة مبيعات',
      target: '/sales/new',
    },
    {
      id: '/sales',
      label: 'قائمة فواتير المبيعات',
      target: '/sales',
    },
    {
      id: '/sales/sales-returns',
      label: 'فاتورة مرتجع مبيعات',
      target: '/sales/sales-returns',
    },
    {
      id: '/sales/sales-report',
      label: 'تقرير المبيعات',
      target: '/sales/sales-report',
    },
    {
      id: '/inventory/prices',
      label: 'تسعيرة الأصناف',
      target: '/inventory/prices',
    },
    {
      id: '/sales/sales-chart',
      label: 'الرسم البياني لحركة المبيعات',
      target: '/sales/sales-chart',
    },
    {
      id: '/sales/targets',
      label: 'أهداف المبيعات ومتابعة الإنجاز',
      target: '/sales/targets',
    },
  ],
  accounts: [
    {
      id: '/accounting/action/payment',
      label: 'سند صرف',
      target: '/accounting/action/payment',
    },
    {
      id: '/accounting/action/receipt',
      label: 'سند قبض',
      target: '/accounting/action/receipt',
    },
    {
      id: '/accounting/vouchers',
      label: 'بحث سندات الصرف والقبض',
      target: '/accounting/vouchers',
    },
    {
      id: '/accounting/statement',
      label: 'كشف حساب',
      target: '/accounting/statement',
    },
    {
      id: '/accounting/cash-movement',
      label: 'حركة الصندوق',
      target: '/accounting/cash-movement',
    },
    {
      id: '/customers/customer-balances',
      label: 'تقرير حسابات العملاء',
      target: '/customers/customer-balances',
    },
    {
      id: '/suppliers/supplier-balances',
      label: 'تقرير حسابات الموردين',
      target: '/suppliers/supplier-balances',
    },
    {
      id: '/expenses/expense-report',
      label: 'تقرير المصروفات',
      target: '/expenses/expense-report',
    },
    {
      id: '/employees/withdrawals',
      label: 'تقرير مسحوبات الموظفين',
      target: '/employees/withdrawals',
    },
    {
      id: '/accounting/opening',
      label: 'إضافة الأرصدة الافتتاحية',
      target: '/accounting/opening',
    },
    {
      id: '/accounting/opening-report',
      label: 'تقرير الأرصدة الافتتاحية',
      target: '/accounting/opening-report',
    },
    {
      id: '/accounting/tax-report',
      label: 'تقرير الضرائب',
      target: '/accounting/tax-report',
    },
    {
      id: '/accounting',
      label: 'القيود اليومية',
      target: '/accounting',
    },
    {
      id: 'currency',
      label: 'العملات',
      children: [
        {
          id: '/accounting/currencies-add',
          label: 'إضافة عملة وسعر صرف',
          target: '/accounting/currencies-add',
        },
        {
          id: '/accounting/currencies',
          label: 'قائمة العملات',
          target: '/accounting/currencies',
        },
        {
          id: '/accounting/fx',
          label: 'مراجعة أرصدة العملات',
          target: '/accounting/fx',
        },
      ],
    },
    {
      id: 'cash-bank',
      label: 'الصناديق والبنوك',
      children: [
        {
          id: '/accounting/cash-bank',
          label: 'إضافة الصناديق والبنوك',
          target: '/accounting/cash-bank',
        },
        {
          id: '/accounting/cash-bank-list',
          label: 'قائمة الصناديق والبنوك',
          target: '/accounting/cash-bank-list',
        },
      ],
    },
    {
      id: 'assets',
      label: 'الأصول الثابتة',
      children: [
        {
          id: '/accounting/assets-add',
          label: 'إضافة أصل ثابت',
          target: '/accounting/assets-add',
        },
        {
          id: '/accounting/assets',
          label: 'قائمة الأصول الثابتة',
          target: '/accounting/assets',
        },
        {
          id: '/accounting/asset-purchase',
          label: 'إثبات اقتناء أصل',
          target: '/accounting/asset-purchase',
        },
        {
          id: '/accounting/depreciation',
          label: 'إثبات إهلاك فترة',
          target: '/accounting/depreciation',
        },
        {
          id: '/accounting/asset-report',
          label: 'تقرير الأصول والإهلاك',
          target: '/accounting/asset-report',
        },
      ],
    },
    {
      id: 'contacts',
      label: 'الدائنون والمدينون',
      children: [
        {
          id: '/accounting/contacts',
          label: 'إضافة حساب دائن أو مدين',
          target: '/accounting/contacts',
        },
        {
          id: '/accounting/contacts-ledger',
          label: 'قائمة حسابات الدائنين والمدينين وحركتها',
          target: '/accounting/contacts-ledger',
        },
      ],
    },
    {
      id: 'journals',
      label: 'دليل الحسابات والقيود',
      children: [
        {
          id: '/accounting/accounts',
          label: 'إضافة حساب ودليل الحسابات',
          target: '/accounting/accounts',
        },
        {
          id: '/accounts~journal/new',
          label: 'إضافة قيد يومي يدوي',
          target: '/accounts~journal/new',
        },
      ],
    },
    {
      id: 'periods',
      label: 'السنة والفترات والإقفال',
      children: [
        {
          id: '/accounting/periods',
          label: 'السنة والفترات المالية',
          target: '/accounting/periods',
        },
        {
          id: '/accounting/end-balances',
          label: 'الحسابات في الفترة المنتهية',
          target: '/accounting/end-balances',
        },
        {
          id: '/accounting/close',
          label: 'مراجعة إقفال السنة والفترة',
          target: '/accounting/close',
        },
        {
          id: '/accounting/reopen',
          label: 'طلب إعادة فتح فترة',
          target: '/accounting/reopen',
        },
      ],
    },
  ],
  financial: [
    {
      id: '/financial-statements/profit-items',
      label: 'الأرباح من الأصناف',
      target: '/financial-statements/profit-items',
    },
    {
      id: '/financial-statements/profit-customers',
      label: 'الأرباح من العملاء',
      target: '/financial-statements/profit-customers',
    },
    {
      id: '/financial-statements/income',
      label: 'قائمة الدخل',
      target: '/financial-statements/income',
    },
    {
      id: '/financial-statements/balance-sheet',
      label: 'قائمة المركز المالي',
      target: '/financial-statements/balance-sheet',
    },
    {
      id: '/financial-statements/cash-flow',
      label: 'قائمة التدفقات النقدية',
      target: '/financial-statements/cash-flow',
    },
    {
      id: '/financial-statements/mapping',
      label: 'ربط الحسابات بالقوائم المالية',
      target: '/financial-statements/mapping',
    },
  ],
};
export const menuLeaves = (entries: MenuItem[]): MenuItem[] =>
  entries.flatMap((entry) => (entry.children ? menuLeaves(entry.children) : [entry]));
