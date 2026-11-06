import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
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
