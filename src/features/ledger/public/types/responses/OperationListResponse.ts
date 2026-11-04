import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { OperationResponse } from '@/features/ledger/public/types/responses/OperationResponse';
export type OperationListResponse = {
  items: Array<OperationResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
