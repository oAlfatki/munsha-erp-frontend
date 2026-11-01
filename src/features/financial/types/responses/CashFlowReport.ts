import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { CashFlowReportRow } from '@/features/financial/types/responses/CashFlowReportRow';
export type CashFlowReport = {
  columns: Array<string>;
  rows: Array<CashFlowReportRow>;
  pagination: ReadPagination;
  scope: ReadScope;
  totals?: {
    baseAmount?: number;
  };
  note: string;
};
