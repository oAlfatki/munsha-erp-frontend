import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { PurchaseReturnsReportRow } from '@/features/purchases/types/responses/PurchaseReturnsReportRow';
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
