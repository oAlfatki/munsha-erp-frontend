import { pathSegment } from '@/core/api/path-segment';

export const ENDPOINTS = {
  fetchEmployees: `/employees`,

  fetchEmployeesById: (id: string) => `/employees/${pathSegment(id)}`,

  fetchEmployeesPayrollAccruals: `/employees/payroll-accruals`,

  fetchEmployeesPayrollAccrualsById: (id: string) =>
    `/employees/payroll-accruals/${pathSegment(id)}`,

  fetchEmployeesSalaryPayments: `/employees/salary-payments`,

  fetchEmployeesSalaryPaymentsById: (id: string) => `/employees/salary-payments/${pathSegment(id)}`,

  fetchEmployeesAdvances: `/employees/advances`,

  fetchEmployeesAdvancesById: (id: string) => `/employees/advances/${pathSegment(id)}`,
} as const;
