import { ROUTES } from '@/core/config/navigation-paths';
import type { RouteObject } from 'react-router-dom';

export const FINANCIAL_ROUTES: RouteObject[] = [
  {
    path: ROUTES.FINANCIAL_STATEMENTS,

    lazy: async () => ({
      Component: (await import('@/features/financial/pages/FinancialOverviewPage')).default,
    }),

    handle: { module: 'financial', title: '' },
  },
  {
    path: ROUTES.FINANCIAL_STATEMENTS_BALANCE_SHEET,

    lazy: async () => ({
      Component: (await import('@/features/financial/pages/BalanceSheetPage')).default,
    }),

    handle: {
      module: 'financial',
      title: 'قائمة المركز المالي',
      navModule: 'financial',
    },
  },
  {
    path: ROUTES.FINANCIAL_STATEMENTS_CASH_FLOW,

    lazy: async () => ({
      Component: (await import('@/features/financial/pages/CashFlowPage')).default,
    }),

    handle: {
      module: 'financial',
      title: 'قائمة التدفقات النقدية',
      navModule: 'financial',
    },
  },
  {
    path: ROUTES.FINANCIAL_STATEMENTS_INCOME,

    lazy: async () => ({
      Component: (await import('@/features/financial/pages/IncomeStatementPage')).default,
    }),

    handle: {
      module: 'financial',
      title: 'قائمة الدخل',
      navModule: 'financial',
    },
  },
  {
    path: ROUTES.FINANCIAL_STATEMENTS_MAPPING,

    lazy: async () => ({
      Component: (await import('@/features/financial/pages/FinancialAccountMappingPage')).default,
    }),

    handle: {
      module: 'financial',
      title: 'ربط الحسابات بالقوائم المالية',
      navModule: 'financial',
    },
  },
  {
    path: ROUTES.FINANCIAL_STATEMENTS_PROFIT_CUSTOMERS,

    lazy: async () => ({
      Component: (await import('@/features/financial/pages/CustomerProfitPage')).default,
    }),

    handle: {
      module: 'financial',
      title: 'الأرباح من العملاء',
      navModule: 'financial',
    },
  },
  {
    path: ROUTES.FINANCIAL_STATEMENTS_PROFIT_ITEMS,

    lazy: async () => ({
      Component: (await import('@/features/financial/pages/ProductProfitPage')).default,
    }),

    handle: {
      module: 'financial',
      title: 'الأرباح من الأصناف',
      navModule: 'financial',
    },
  },
];
