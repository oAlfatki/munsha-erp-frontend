import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/features/ledger/api/endpoints';
import type { GetAccountingContactsByIdRequest } from '@/features/ledger/types/requests/GetAccountingContactsByIdRequest';
import type { SearchAccountingContactsRequest } from '@/features/ledger/types/requests/SearchAccountingContactsRequest';
import type { ContactListResponse } from '@/features/ledger/types/responses/ContactListResponse';
import type { ContactResponse } from '@/features/ledger/types/responses/ContactResponse';

export async function fetchAccountingContacts(
  params: SearchAccountingContactsRequest = {},
  signal?: AbortSignal,
): Promise<ContactListResponse> {

  return await apiClient.get<ContactListResponse>(ENDPOINTS.fetchAccountingContacts, {
    signal,
    params: {
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      active: params.active,
      bookId: params.bookId,
    },
  });
}

export async function fetchAccountingContactsById(
  params: GetAccountingContactsByIdRequest,
): Promise<ContactResponse> {

  return await apiClient.get<ContactResponse>(ENDPOINTS.fetchAccountingContactsById(params.id), {
    params: { bookId: params.bookId },
  });
}
