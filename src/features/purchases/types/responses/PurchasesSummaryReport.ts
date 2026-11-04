import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { PurchasesSummaryReportRow } from '@/features/purchases/types/responses/PurchasesSummaryReportRow';
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
