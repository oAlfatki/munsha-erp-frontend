import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { AdjustmentsReportRow } from '@/features/stock/types/responses/AdjustmentsReportRow';
export type AdjustmentsReport = {
  columns: Array<string>;
  rows: Array<AdjustmentsReportRow>;
  pagination: ReadPagination;
  scope: ReadScope;
  totals?: {
    baseAmount?: number;
  };
  note: string;
};
