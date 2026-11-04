import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { SalesSummaryReportRow } from '@/features/sales/types/responses/SalesSummaryReportRow';
export type SalesSummaryReport = {
  columns: Array<string>;
  rows: Array<SalesSummaryReportRow>;
  pagination: ReadPagination;
  scope: ReadScope;
  totals?: {
    baseAmount?: number;
  };
  note: string;
};
