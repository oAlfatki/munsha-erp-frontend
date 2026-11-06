import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { SalesReturnsReportRow } from '@/features/sales/reports/types/responses/SalesReturnsReportRow';
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
