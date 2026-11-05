import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { TargetAchievementReportRow } from '@/features/sales/reports/types/responses/TargetAchievementReportRow';
export type TargetAchievementReport = {
  columns: Array<string>;
  rows: Array<TargetAchievementReportRow>;
  pagination: ReadPagination;
  scope: ReadScope;
  totals?: {
    baseAmount?: number;
  };
  note: string;
};
