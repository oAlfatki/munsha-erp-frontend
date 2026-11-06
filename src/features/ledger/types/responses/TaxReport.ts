import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { TaxReportRow } from '@/features/ledger/types/responses/TaxReportRow';

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
