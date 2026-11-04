import { ROUTES } from '@/core/config/navigation-paths';
import type { RouteObject } from 'react-router-dom';
export const EMPLOYEES_ROUTES: RouteObject[] = [
  {
    path: ROUTES.EMPLOYEES,
    lazy: async () => ({
      Component: (await import('@/features/employees/pages/EmployeeListPage')).default,
    }),
    handle: { module: 'employees', title: '' },
  },
  {
    path: ROUTES.EMPLOYEES_NEW,
    lazy: async () => ({
      Component: (await import('@/features/employees/pages/CreateEmployeePage')).default,
    }),
    handle: { module: 'employees', title: '' },
  },
  {
    path: ROUTES.EMPLOYEES_ADVANCE,
    lazy: async () => ({
      Component: (await import('@/features/employees/pages/EmployeeAdvancePage')).default,
    }),
    handle: {
      module: 'employees',
      title: 'صرف سلفة موظف',
      navModule: 'employees',
    },
  },
  {
    path: ROUTES.EMPLOYEES_PAYROLL,
    lazy: async () => ({
      Component: (await import('@/features/employees/pages/PayrollAccrualPage')).default,
    }),
    handle: {
      module: 'employees',
      title: 'احتساب وإثبات رواتب فترة',
      navModule: 'employees',
    },
  },
  {
    path: ROUTES.EMPLOYEES_SALARY_PAYMENT,
    lazy: async () => ({
      Component: (await import('@/features/employees/pages/SalaryPaymentPage')).default,
    }),
    handle: {
      module: 'employees',
      title: 'صرف رواتب الموظفين',
      navModule: 'employees',
    },
  },
  {
    path: ROUTES.EMPLOYEES_SALARY_REPORT,
    lazy: async () => ({
      Component: (await import('@/features/employees/pages/SalaryReportPage')).default,
    }),
    handle: {
      module: 'employees',
      title: 'تقرير رواتب الموظفين',
      navModule: 'employees',
    },
  },
  {
    path: ROUTES.EMPLOYEES_WITHDRAWALS,
    lazy: async () => ({
      Component: (await import('@/features/employees/pages/EmployeeWithdrawalsPage')).default,
    }),
    handle: {
      module: 'employees',
      title: 'تقرير مسحوبات الموظفين',
      navModule: 'accounts',
    },
  },
];
