import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { StatementRow } from '@/features/accounting/types/responses/StatementRow';
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
