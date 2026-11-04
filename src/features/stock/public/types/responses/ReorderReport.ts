import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { ReorderReportRow } from '@/features/stock/types/responses/ReorderReportRow';
export type ReorderReport = {
  columns: Array<string>;
  rows: Array<ReorderReportRow>;
  pagination: ReadPagination;
  scope: ReadScope;
  totals?: {
    baseAmount?: number;
  };
  note: string;
};
