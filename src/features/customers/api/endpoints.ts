import { commandPath } from '@/core/api/command-path';

export const ENDPOINTS = {
  command: commandPath,
  fetchReportsCustomersBalances: `/reports/customers/balances`,
} as const;
