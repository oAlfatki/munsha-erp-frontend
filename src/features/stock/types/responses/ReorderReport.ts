import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
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
