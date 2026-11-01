import { ENDPOINTS } from '@/core/config/endpoints';
import { apiRequest } from '@/core/services/http/api-client';
import type { GetCustomersByIdRequest } from '@/features/customers/types/requests/GetCustomersByIdRequest';
import type { SearchCustomersRequest } from '@/features/customers/types/requests/SearchCustomersRequest';
import type { PartyListResponse } from '@/features/parties/types/responses/PartyListResponse';
import type { PartyResponse } from '@/features/parties/types/responses/PartyResponse';
/** List customers. Existing HTTP contract. */
export async function fetchCustomers(
  params: SearchCustomersRequest = {},
): Promise<PartyListResponse> {
  return await apiRequest<PartyListResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchCustomers,
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
  return await apiRequest<PartyResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchCustomersById(params.id),
    params: { bookId: params.bookId },
  });
}
