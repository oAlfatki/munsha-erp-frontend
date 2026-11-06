import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { StatementRow } from '@/features/ledger/types/responses/StatementRow';

export type AccountStatementResponse = {
  accountCode: string;
  partyId: string;
  openingBalance: number;
  periodDebit: number;
  periodCredit: number;
  closingBalance: number;
  rows: Array<StatementRow>;
  pagination: ReadPagination;
  scope: ReadScope;
};
