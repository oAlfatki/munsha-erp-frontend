import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { ForeignCurrencyReportRow } from '@/features/ledger/types/responses/ForeignCurrencyReportRow';

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
