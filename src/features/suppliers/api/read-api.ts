import { ENDPOINTS } from '@/core/config/endpoints';
import { apiClient } from '@/core/api/apiClient';
import type { PartyListResponse } from '@/features/parties/types/responses/PartyListResponse';
import type { PartyResponse } from '@/features/parties/types/responses/PartyResponse';
import type { GetSuppliersByIdRequest } from '@/features/suppliers/types/requests/GetSuppliersByIdRequest';
import type { SearchSuppliersRequest } from '@/features/suppliers/types/requests/SearchSuppliersRequest';
/** List suppliers. Existing HTTP contract. */
export async function fetchSuppliers(
  params: SearchSuppliersRequest = {},
): Promise<PartyListResponse> {
  return await apiClient.get<PartyListResponse>(ENDPOINTS.fetchSuppliers,{params: {
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      active: params.active,
      bookId: params.bookId,
      groupId: params.groupId,
    }});
}
/** Get suppliers detail. Existing HTTP contract. */
export async function fetchSuppliersById(params: GetSuppliersByIdRequest): Promise<PartyResponse> {
  return await apiClient.get<PartyResponse>(ENDPOINTS.fetchSuppliersById(params.id),{params: { bookId: params.bookId }});
}
