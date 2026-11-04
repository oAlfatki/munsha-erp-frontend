import { ROUTES } from '@/core/config/navigation-paths';
import type { RouteObject } from 'react-router-dom';
export const EXPENSES_ROUTES: RouteObject[] = [
  {
    path: ROUTES.EXPENSES,
    lazy: async () => ({
      Component: (await import('@/features/expenses/pages/ExpenseOverviewPage')).default,
    }),
    handle: { module: 'expenses', title: '' },
  },
  {
    path: ROUTES.EXPENSES_ADD,
    lazy: async () => ({
      Component: (await import('@/features/expenses/pages/CreateExpensePage')).default,
    }),
    handle: {
      module: 'expenses',
      title: 'إضافة مصروف',
      navModule: 'expenses',
    },
  },
  {
    path: ROUTES.EXPENSES_EXPENSE_LIST,
    lazy: async () => ({
      Component: (await import('@/features/expenses/pages/ExpenseListPage')).default,
    }),
    handle: {
      module: 'expenses',
      title: 'قائمة المصروفات',
      navModule: 'expenses',
    },
  },
  {
    path: ROUTES.EXPENSES_EXPENSE_REPORT,
    lazy: async () => ({
      Component: (await import('@/features/expenses/pages/ExpenseReportPage')).default,
    }),
    handle: {
      module: 'expenses',
      title: 'تقارير المصروفات',
      navModule: 'accounts',
    },
  },
  {
    path: ROUTES.EXPENSES_EXPENSE_TYPES,
    lazy: async () => ({
      Component: (await import('@/features/expenses/pages/ExpenseTypeListPage')).default,
    }),
    handle: {
      module: 'expenses',
      title: 'أنواع المصروفات',
      navModule: 'expenses',
    },
  },
];
