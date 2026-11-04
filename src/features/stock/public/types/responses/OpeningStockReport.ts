import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { OpeningStockReportRow } from '@/features/stock/types/responses/OpeningStockReportRow';
export type OpeningStockReport = {
  columns: Array<string>;
  rows: Array<OpeningStockReportRow>;
  pagination: ReadPagination;
  scope: ReadScope;
  totals?: {
    baseAmount?: number;
  };
  note: string;
};
