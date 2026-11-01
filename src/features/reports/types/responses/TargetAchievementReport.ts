import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { TargetAchievementReportRow } from '@/features/reports/types/responses/TargetAchievementReportRow';
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
