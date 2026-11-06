import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
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
