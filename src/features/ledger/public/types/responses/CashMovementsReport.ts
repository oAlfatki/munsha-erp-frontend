import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { CashMovementsReportRow } from '@/features/ledger/types/responses/CashMovementsReportRow';
export type CashMovementsReport = {
  columns: Array<string>;
  rows: Array<CashMovementsReportRow>;
  pagination: ReadPagination;
  scope: ReadScope;
  totals?: {
    baseAmount?: number;
  };
  note: string;
};
