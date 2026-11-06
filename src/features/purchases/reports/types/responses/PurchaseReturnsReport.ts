import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { PurchaseReturnsReportRow } from '@/features/purchases/reports/types/responses/PurchaseReturnsReportRow';
export type PurchaseReturnsReport = {
  columns: Array<string>;
  rows: Array<PurchaseReturnsReportRow>;
  pagination: ReadPagination;
  scope: ReadScope;
  totals?: {
    baseAmount?: number;
  };
  note: string;
};
