import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
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
