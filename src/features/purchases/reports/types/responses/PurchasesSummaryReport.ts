import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { PurchasesSummaryReportRow } from '@/features/purchases/reports/types/responses/PurchasesSummaryReportRow';
export type PurchasesSummaryReport = {
  columns: Array<string>;
  rows: Array<PurchasesSummaryReportRow>;
  pagination: ReadPagination;
  scope: ReadScope;
  totals?: {
    baseAmount?: number;
  };
  note: string;
};
