import { ROUTES } from '@/core/config/navigation-paths';
import type { RouteObject } from 'react-router-dom';

export const ACCOUNTING_ROUTES: RouteObject[] = [
  {
    path: ROUTES.ACCOUNTING,

    lazy: async () => ({
      Component: (await import('@/features/accounting/accounts/pages/AccountingOverviewPage'))
        .default,
    }),

    handle: { module: 'accounting', title: '' },
  },
  {
    path: ROUTES.ACCOUNTING_VOUCHERS_PAYMENT_NEW,

    lazy: async () => ({
      Component: (await import('@/features/accounting/vouchers/pages/CreatePaymentVoucherPage'))
        .default,
    }),

    handle: { module: 'accounting', title: '' },
  },
  {
    path: ROUTES.ACCOUNTING_VOUCHERS_RECEIPT_NEW,

    lazy: async () => ({
      Component: (await import('@/features/accounting/vouchers/pages/CreateReceiptVoucherPage'))
        .default,
    }),

    handle: { module: 'accounting', title: '' },
  },
  {
    path: ROUTES.ACCOUNTING_ACCOUNTS,

    lazy: async () => ({
      Component: (await import('@/features/accounting/accounts/pages/ChartOfAccountsPage')).default,
    }),

    handle: {
      module: 'accounting',
      title: 'إضافة حساب ودليل الحسابات',
      navModule: 'accounts',
    },
  },
  {
    path: ROUTES.ACCOUNTING_ASSET_PURCHASE,

    lazy: async () => ({
      Component: (await import('@/features/accounting/assets/pages/AssetAcquisitionPage')).default,
    }),

    handle: {
      module: 'accounting',
      title: 'إثبات اقتناء أصل',
      navModule: 'accounts',
    },
  },
  {
    path: ROUTES.ACCOUNTING_ASSET_REPORT,

    lazy: async () => ({
      Component: (await import('@/features/accounting/reports/pages/AssetDepreciationReportPage'))
        .default,
    }),

    handle: {
      module: 'accounting',
      title: 'تقرير الأصول والإهلاك',
      navModule: 'accounts',
    },
  },
  {
    path: ROUTES.ACCOUNTING_ASSETS,

    lazy: async () => ({
      Component: (await import('@/features/accounting/assets/pages/AssetListPage')).default,
    }),

    handle: {
      module: 'accounting',
      title: 'قائمة الأصول الثابتة',
      navModule: 'accounts',
    },
  },
  {
    path: ROUTES.ACCOUNTING_ASSETS_ADD,

    lazy: async () => ({
      Component: (await import('@/features/accounting/assets/pages/CreateAssetPage')).default,
    }),

    handle: {
      module: 'accounting',
      title: 'إضافة أصل ثابت',
      navModule: 'accounts',
    },
  },
  {
    path: ROUTES.ACCOUNTING_CASH_BANK,

    lazy: async () => ({
      Component: (await import('@/features/accounting/accounts/pages/CreateCashAccountPage'))
        .default,
    }),

    handle: {
      module: 'accounting',
      title: 'إضافة الصناديق والبنوك',
      navModule: 'accounts',
    },
  },
  {
    path: ROUTES.ACCOUNTING_CASH_BANK_LIST,

    lazy: async () => ({
      Component: (await import('@/features/accounting/accounts/pages/CashAccountListPage')).default,
    }),

    handle: {
      module: 'accounting',
      title: 'قائمة الصناديق والبنوك',
      navModule: 'accounts',
    },
  },
  {
    path: ROUTES.ACCOUNTING_CASH_MOVEMENT,

    lazy: async () => ({
      Component: (await import('@/features/accounting/overview/pages/CashMovementPage')).default,
    }),

    handle: {
      module: 'accounting',
      title: 'حركة الصندوق',
      navModule: 'accounts',
    },
  },
  {
    path: ROUTES.ACCOUNTING_CLOSE,

    lazy: async () => ({
      Component: (await import('@/features/accounting/fiscal-periods/pages/FiscalYearClosingPage'))
        .default,
    }),

    handle: {
      module: 'accounting',
      title: 'مراجعة إقفال السنة والفترة',
      navModule: 'accounts',
    },
  },
  {
    path: ROUTES.ACCOUNTING_CONTACTS,

    lazy: async () => ({
      Component: (await import('@/features/accounting/contacts/pages/AccountingContactListPage'))
        .default,
    }),

    handle: {
      module: 'accounting',
      title: 'حسابات الدائنين والمدينين المتنوعين',
      navModule: 'accounts',
    },
  },
  {
    path: ROUTES.ACCOUNTING_CONTACTS_LEDGER,

    lazy: async () => ({
      Component: (await import('@/features/accounting/contacts/pages/AccountingContactLedgerPage'))
        .default,
    }),

    handle: {
      module: 'accounting',
      title: 'حركة الأطراف المتنوعة وكشف الحساب',
      navModule: 'accounts',
    },
  },
  {
    path: ROUTES.ACCOUNTING_CURRENCIES,

    lazy: async () => ({
      Component: (await import('@/features/accounting/currencies/pages/CurrencyListPage')).default,
    }),

    handle: {
      module: 'accounting',
      title: 'قائمة العملات',
      navModule: 'accounts',
    },
  },
  {
    path: ROUTES.ACCOUNTING_CURRENCIES_ADD,

    lazy: async () => ({
      Component: (await import('@/features/accounting/currencies/pages/CreateCurrencyPage'))
        .default,
    }),

    handle: {
      module: 'accounting',
      title: 'إضافة عملة وسعر صرف',
      navModule: 'accounts',
    },
  },
  {
    path: ROUTES.ACCOUNTING_DEPRECIATION,

    lazy: async () => ({
      Component: (await import('@/features/accounting/assets/pages/AssetDepreciationPage')).default,
    }),

    handle: {
      module: 'accounting',
      title: 'إثبات إهلاك فترة',
      navModule: 'accounts',
    },
  },
  {
    path: ROUTES.ACCOUNTING_END_BALANCES,

    lazy: async () => ({
      Component: (
        await import('@/features/accounting/fiscal-periods/pages/ClosingAccountBalancesPage')
      ).default,
    }),

    handle: {
      module: 'accounting',
      title: 'الحسابات في الفترة المنتهية',
      navModule: 'accounts',
    },
  },
  {
    path: ROUTES.ACCOUNTING_FX,

    lazy: async () => ({
      Component: (await import('@/features/accounting/currencies/pages/CurrencyDocumentsPage'))
        .default,
    }),

    handle: {
      module: 'accounting',
      title: 'مراجعة أرصدة العملات',
      navModule: 'accounts',
    },
  },
  {
    path: ROUTES.ACCOUNTING_JOURNAL_NEW,

    lazy: async () => ({
      Component: (await import('@/features/accounting/journals/pages/CreateJournalEntryPage'))
        .default,
    }),

    handle: {
      module: 'accounting',
      title: 'إضافة قيد يومي يدوي',
      navModule: 'accounts',
    },
  },
  {
    path: ROUTES.ACCOUNTING_OPENING,

    lazy: async () => ({
      Component: (await import('@/features/accounting/accounts/pages/OpeningAccountBalancesPage'))
        .default,
    }),

    handle: {
      module: 'accounting',
      title: 'إضافة الأرصدة الافتتاحية',
      navModule: 'accounts',
    },
  },
  {
    path: ROUTES.ACCOUNTING_OPENING_REPORT,

    lazy: async () => ({
      Component: (
        await import('@/features/accounting/reports/pages/OpeningAccountBalancesReportPage')
      ).default,
    }),

    handle: {
      module: 'accounting',
      title: 'تقرير الأرصدة الافتتاحية',
      navModule: 'accounts',
    },
  },
  {
    path: ROUTES.ACCOUNTING_PERIODS,

    lazy: async () => ({
      Component: (await import('@/features/accounting/fiscal-periods/pages/FiscalPeriodReviewPage'))
        .default,
    }),

    handle: {
      module: 'accounting',
      title: 'السنة والفترات المالية',
      navModule: 'accounts',
    },
  },
  {
    path: ROUTES.ACCOUNTING_REOPEN,

    lazy: async () => ({
      Component: (
        await import('@/features/accounting/fiscal-periods/pages/FiscalYearReopeningPage')
      ).default,
    }),

    handle: {
      module: 'accounting',
      title: 'طلب إعادة فتح فترة',
      navModule: 'accounts',
    },
  },
  {
    path: ROUTES.ACCOUNTING_STATEMENT,

    lazy: async () => ({
      Component: (await import('@/features/accounting/accounts/pages/AccountStatementPage'))
        .default,
    }),

    handle: {
      module: 'accounting',
      title: 'كشف حساب',
      navModule: 'accounts',
    },
  },
  {
    path: ROUTES.ACCOUNTING_TAX_REPORT,

    lazy: async () => ({
      Component: (await import('@/features/accounting/reports/pages/TaxReportPage')).default,
    }),

    handle: {
      module: 'accounting',
      title: 'تقرير الضرائب',
      navModule: 'accounts',
    },
  },
  {
    path: ROUTES.ACCOUNTING_VOUCHERS,

    lazy: async () => ({
      Component: (await import('@/features/accounting/vouchers/pages/VoucherListPage')).default,
    }),

    handle: {
      module: 'accounting',
      title: 'بحث سندات الصرف والقبض',
      navModule: 'accounts',
    },
  },
  {
    path: ROUTES.ACCOUNTING_STATEMENT_PARTYID,

    lazy: async () => ({
      Component: (await import('@/features/accounting/accounts/pages/PartyAccountStatementPage'))
        .default,
    }),

    handle: { module: 'accounting', title: '' },
  },
];
