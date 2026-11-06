import { commandPath } from '@/core/api/command-path';

export const ENDPOINTS = {
  command: commandPath,
  fetchReportsSalesSummary: `/reports/sales/summary`,
  fetchReportsSalesReturns: `/reports/sales/returns`,
  fetchReportsSalesChart: `/reports/sales/chart`,
  fetchReportsSalesTargetAchievement: `/reports/sales/target-achievement`,
} as const;
