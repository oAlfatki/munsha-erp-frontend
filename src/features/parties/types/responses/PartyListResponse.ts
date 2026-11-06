import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { PartyResponse } from '@/features/parties/types/responses/PartyResponse';

export type PartyListResponse = {
  items: Array<PartyResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
