import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { OpeningBalancesReportRow } from '@/features/ledger/types/responses/OpeningBalancesReportRow';
export type OpeningBalancesReport = {
  columns: Array<string>;
  rows: Array<OpeningBalancesReportRow>;
  pagination: ReadPagination;
  scope: ReadScope;
  totals?: {
    baseAmount?: number;
  };
  note: string;
};
