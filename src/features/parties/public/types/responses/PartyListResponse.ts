import type { ReadPagination } from "@/core/types/ReadPagination";
import type { ReadScope } from "@/core/types/ReadScope";
import type { PartyResponse } from "@/features/parties/public/types/responses/PartyResponse";
export type PartyListResponse = {
  items: Array<PartyResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
