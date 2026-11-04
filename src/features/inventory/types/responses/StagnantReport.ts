import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { StagnantReportRow } from '@/features/inventory/types/responses/StagnantReportRow';
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
