import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/features/parties/api/endpoints';
import type { GetSuppliersByIdRequest } from '@/features/parties/types/requests/GetSuppliersByIdRequest';
import type { SearchSuppliersRequest } from '@/features/parties/types/requests/SearchSuppliersRequest';
import type { PartyListResponse } from '@/features/parties/types/responses/PartyListResponse';
import type { PartyResponse } from '@/features/parties/types/responses/PartyResponse';

/** List suppliers. Existing HTTP contract. */

export async function fetchSuppliers(
  params: SearchSuppliersRequest = {},
  signal?: AbortSignal,
): Promise<PartyListResponse> {

  return await apiClient.get<PartyListResponse>(ENDPOINTS.fetchSuppliers, {
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

/** Get suppliers detail. Existing HTTP contract. */

export async function fetchSuppliersById(params: GetSuppliersByIdRequest): Promise<PartyResponse> {

  return await apiClient.get<PartyResponse>(ENDPOINTS.fetchSuppliersById(params.id), {
    params: { bookId: params.bookId },
  });
}
