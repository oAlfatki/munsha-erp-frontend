import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { TransfersReportRow } from '@/features/inventory/types/responses/TransfersReportRow';
export type TransfersReport = {
  columns: Array<string>;
  rows: Array<TransfersReportRow>;
  pagination: ReadPagination;
  scope: ReadScope;
  totals?: {
    baseAmount?: number;
  };
  note: string;
};
