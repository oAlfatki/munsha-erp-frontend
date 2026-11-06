import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { StagnantReportRow } from '@/features/stock/types/responses/StagnantReportRow';

export type StagnantReport = {
  columns: Array<string>;
  rows: Array<StagnantReportRow>;
  pagination: ReadPagination;
  scope: ReadScope;
  totals?: {
    baseAmount?: number;
  };
  note: string;
};
