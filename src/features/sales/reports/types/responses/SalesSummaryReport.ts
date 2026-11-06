import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { SalesSummaryReportRow } from '@/features/sales/reports/types/responses/SalesSummaryReportRow';
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
