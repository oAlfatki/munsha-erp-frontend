import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
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
