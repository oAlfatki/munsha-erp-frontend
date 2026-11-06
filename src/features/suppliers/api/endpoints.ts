import { commandPath } from '@/core/api/command-path';

export const ENDPOINTS = {
  command: commandPath,
  fetchReportsSuppliersBalances: `/reports/suppliers/balances`,
} as const;
