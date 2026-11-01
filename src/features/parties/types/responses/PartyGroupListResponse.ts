import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { PartyGroupResponse } from '@/features/parties/types/responses/PartyGroupResponse';
export type PartyGroupListResponse = {
  items: Array<PartyGroupResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
