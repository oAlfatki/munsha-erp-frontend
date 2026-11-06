import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/features/ledger/api/endpoints';
import type { GetAccountingAccountsByCodeRequest } from '@/features/ledger/types/requests/GetAccountingAccountsByCodeRequest';
import type { SearchAccountingAccountsRequest } from '@/features/ledger/types/requests/SearchAccountingAccountsRequest';
import type { AccountListResponse } from '@/features/ledger/types/responses/AccountListResponse';
import type { AccountResponse } from '@/features/ledger/types/responses/AccountResponse';

export async function fetchAccountingAccounts(
  params: SearchAccountingAccountsRequest = {},
  signal?: AbortSignal,
): Promise<AccountListResponse> {

  return await apiClient.get<AccountListResponse>(ENDPOINTS.fetchAccountingAccounts, {
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

export async function fetchAccountingAccountsByCode(
  params: GetAccountingAccountsByCodeRequest,
): Promise<AccountResponse> {

  return await apiClient.get<AccountResponse>(
    ENDPOINTS.fetchAccountingAccountsByCode(params.code),
    { params: { bookId: params.bookId } },
  );
}
