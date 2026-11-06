import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { HistoricalCostReportRow } from '@/features/stock/types/responses/HistoricalCostReportRow';

export type HistoricalCostReport = {
  columns: Array<string>;
  rows: Array<HistoricalCostReportRow>;
  pagination: ReadPagination;
  scope: ReadScope;
  totals?: {
    baseAmount?: number;
  };
  note: string;
};
