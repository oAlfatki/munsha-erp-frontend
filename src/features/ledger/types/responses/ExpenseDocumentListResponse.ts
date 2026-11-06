import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { ExpenseDocumentResponse } from '@/features/ledger/types/responses/ExpenseDocumentResponse';

export type ExpenseDocumentListResponse = {
  items: Array<ExpenseDocumentResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
