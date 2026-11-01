import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { SalesReturnsReportRow } from '@/features/reports/types/responses/SalesReturnsReportRow';
export type SalesReturnsReport = {
  columns: Array<string>;
  rows: Array<SalesReturnsReportRow>;
  pagination: ReadPagination;
  scope: ReadScope;
  totals?: {
    baseAmount?: number;
  };
  note: string;
};
