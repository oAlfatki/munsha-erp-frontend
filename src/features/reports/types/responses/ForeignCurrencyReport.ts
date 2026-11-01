import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { ForeignCurrencyReportRow } from '@/features/reports/types/responses/ForeignCurrencyReportRow';
export type ForeignCurrencyReport = {
  columns: Array<string>;
  rows: Array<ForeignCurrencyReportRow>;
  pagination: ReadPagination;
  scope: ReadScope;
  totals?: {
    baseAmount?: number;
  };
  note: string;
};
