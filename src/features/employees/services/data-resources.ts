import { collection, operations } from '@/core/query/resources';
import type { ErpReadModel } from '@/core/types/ErpReadModel';
import {
  fetchEmployees,
  fetchEmployeesAdvances,
  fetchEmployeesPayrollAccruals,
  fetchEmployeesSalaryPayments,
} from '@/features/employees/api/read-api';
export const EMPLOYEES_RESOURCE = collection(
  'employees',
  'employees',
  fetchEmployees,
  (items) => ({ employees: items }) as Partial<ErpReadModel>,
);
export const PAYROLL_RESOURCE = collection(
  'employees',
  'payroll',
  fetchEmployeesPayrollAccruals,
  (items) => operations(items) as Partial<ErpReadModel>,
);
export const SALARY_PAYMENTS_RESOURCE = collection(
  'employees',
  'salaryPayments',
  fetchEmployeesSalaryPayments,
  (items) => operations(items) as Partial<ErpReadModel>,
);
export const ADVANCES_RESOURCE = collection(
  'employees',
  'advances',
  fetchEmployeesAdvances,
  (items) => operations(items) as Partial<ErpReadModel>,
);
