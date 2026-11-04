import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { TrialBalanceReportRow } from '@/features/accounting/types/responses/TrialBalanceReportRow';
export type TrialBalanceReport = {
  columns: Array<string>;
  rows: Array<TrialBalanceReportRow>;
  pagination: ReadPagination;
  scope: ReadScope;
  totals?: {
    baseAmount?: number;
  };
  note: string;
};
