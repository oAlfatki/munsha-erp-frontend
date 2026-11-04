import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { InventoryValuationReportRow } from '@/features/stock/types/responses/InventoryValuationReportRow';
export type InventoryValuationReport = {
  columns: Array<string>;
  rows: Array<InventoryValuationReportRow>;
  pagination: ReadPagination;
  scope: ReadScope;
  totals?: {
    baseAmount?: number;
  };
  note: string;
};
