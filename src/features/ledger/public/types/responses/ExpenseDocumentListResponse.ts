import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { ExpenseDocumentResponse } from '@/features/ledger/public/types/responses/ExpenseDocumentResponse';
export type ExpenseDocumentListResponse = {
  items: Array<ExpenseDocumentResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
