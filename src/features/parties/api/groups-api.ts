import { ENDPOINTS } from '@/core/config/endpoints';
import { apiRequest } from '@/core/services/http/api-client';
import type { GetPartiesGroupsByIdRequest } from '@/features/parties/types/requests/GetPartiesGroupsByIdRequest';
import type { SearchPartiesGroupsRequest } from '@/features/parties/types/requests/SearchPartiesGroupsRequest';
import type { PartyGroupListResponse } from '@/features/parties/types/responses/PartyGroupListResponse';
import type { PartyGroupResponse } from '@/features/parties/types/responses/PartyGroupResponse';
/** List party groups. Existing HTTP contract. */
export async function fetchPartiesGroups(
  params: SearchPartiesGroupsRequest = {},
): Promise<PartyGroupListResponse> {
  return await apiRequest<PartyGroupListResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchPartiesGroups,
    params: {
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      active: params.active,
      bookId: params.bookId,
    },
  });
}
/** Get party groups detail. Existing HTTP contract. */
export async function fetchPartiesGroupsById(
  params: GetPartiesGroupsByIdRequest,
): Promise<PartyGroupResponse> {
  return await apiRequest<PartyGroupResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchPartiesGroupsById(params.id),
    params: { bookId: params.bookId },
  });
}
