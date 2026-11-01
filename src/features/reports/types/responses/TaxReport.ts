import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { TaxReportRow } from '@/features/reports/types/responses/TaxReportRow';
export type TaxReport = {
  columns: Array<string>;
  rows: Array<TaxReportRow>;
  pagination: ReadPagination;
  scope: ReadScope;
  totals?: {
    baseAmount?: number;
  };
  note: string;
};
