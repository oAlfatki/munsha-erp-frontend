import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { SalesChartReportRow } from '@/features/sales/reports/types/responses/SalesChartReportRow';
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
