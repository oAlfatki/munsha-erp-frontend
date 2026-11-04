import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { SalesTargetResponse } from '@/features/trade/public/types/responses/SalesTargetResponse';
export type SalesTargetListResponse = {
  items: Array<SalesTargetResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
