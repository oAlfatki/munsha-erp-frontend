import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { SalesChartReportRow } from '@/features/sales/types/responses/SalesChartReportRow';
export type SalesChartReport = {
  columns: Array<string>;
  rows: Array<SalesChartReportRow>;
  pagination: ReadPagination;
  scope: ReadScope;
  totals?: {
    baseAmount?: number;
  };
  note: string;
};
