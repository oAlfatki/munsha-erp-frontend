import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { PricesReportRow } from '@/features/stock/types/responses/PricesReportRow';
export type PricesReport = {
  columns: Array<string>;
  rows: Array<PricesReportRow>;
  pagination: ReadPagination;
  scope: ReadScope;
  totals?: {
    baseAmount?: number;
  };
  note: string;
};
