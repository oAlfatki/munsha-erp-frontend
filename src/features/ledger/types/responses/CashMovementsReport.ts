import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
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
