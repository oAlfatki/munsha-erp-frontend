import { commandPath } from '@/core/api/command-path';

export const ENDPOINTS = {
  command: commandPath,
  fetchReportsExpensesRecognized: `/reports/expenses/recognized`,
} as const;
