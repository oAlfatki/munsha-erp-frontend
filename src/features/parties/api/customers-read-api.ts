import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type { GetCustomersByIdRequest } from '@/features/parties/public/types/requests/GetCustomersByIdRequest';
import type { SearchCustomersRequest } from '@/features/parties/public/types/requests/SearchCustomersRequest';
import type { PartyListResponse } from '@/features/parties/public/types/responses/PartyListResponse';
import type { PartyResponse } from '@/features/parties/public/types/responses/PartyResponse';
/** List customers. Existing HTTP contract. */
export async function fetchCustomers(
  params: SearchCustomersRequest = {},
  signal?: AbortSignal,
): Promise<PartyListResponse> {
  return await apiClient.get<PartyListResponse>(ENDPOINTS.fetchCustomers, {
    signal,
    params: {
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      active: params.active,
      bookId: params.bookId,
      groupId: params.groupId,
    },
  });
}
/** Get customers detail. Existing HTTP contract. */
export async function fetchCustomersById(params: GetCustomersByIdRequest): Promise<PartyResponse> {
  return await apiClient.get<PartyResponse>(ENDPOINTS.fetchCustomersById(params.id), {
    params: { bookId: params.bookId },
  });
}
