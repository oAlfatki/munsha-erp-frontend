import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
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
