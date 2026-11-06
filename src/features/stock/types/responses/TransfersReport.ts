import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { TransfersReportRow } from '@/features/stock/types/responses/TransfersReportRow';

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
