import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { TrialBalanceReportRow } from '@/features/ledger/types/responses/TrialBalanceReportRow';
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
