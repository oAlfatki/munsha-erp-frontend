import { commandPath } from '@/core/api/command-path';

export const ENDPOINTS = {
  command: commandPath,
  fetchReportsEmployeesPayroll: `/reports/employees/payroll`,
  fetchReportsEmployeesAdvances: `/reports/employees/advances`,
} as const;
