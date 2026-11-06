import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/features/ledger/api/endpoints';
import type { GetAccountingCashAccountsByIdRequest } from '@/features/ledger/types/requests/GetAccountingCashAccountsByIdRequest';
import type { SearchAccountingCashAccountsRequest } from '@/features/ledger/types/requests/SearchAccountingCashAccountsRequest';
import type { CashAccountListResponse } from '@/features/ledger/types/responses/CashAccountListResponse';
import type { CashAccountResponse } from '@/features/ledger/types/responses/CashAccountResponse';

export async function fetchAccountingCashAccounts(
  params: SearchAccountingCashAccountsRequest = {},
  signal?: AbortSignal,
): Promise<CashAccountListResponse> {

  return await apiClient.get<CashAccountListResponse>(ENDPOINTS.fetchAccountingCashAccounts, {
    signal,
    params: {
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      active: params.active,
      bookId: params.bookId,
      branchId: params.branchId,
      currency: params.currency,
    },
  });
}

export async function fetchAccountingCashAccountsById(
  params: GetAccountingCashAccountsByIdRequest,
): Promise<CashAccountResponse> {

  return await apiClient.get<CashAccountResponse>(
    ENDPOINTS.fetchAccountingCashAccountsById(params.id),
    { params: { bookId: params.bookId } },
  );
}
