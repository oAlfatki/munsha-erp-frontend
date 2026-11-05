import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { SalesTargetResponse } from '@/features/trade/types/responses/SalesTargetResponse';
export type SalesTargetListResponse = {
  items: Array<SalesTargetResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
