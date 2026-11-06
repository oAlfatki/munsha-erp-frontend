import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { OperationResponse } from '@/features/ledger/types/responses/OperationResponse';

export type OperationListResponse = {
  items: Array<OperationResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
