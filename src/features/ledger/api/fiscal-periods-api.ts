import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type { GetAccountingFinancialBooksByIdReadinessRequest } from '@/features/ledger/types/requests/GetAccountingFinancialBooksByIdReadinessRequest';
import type { GetAccountingFinancialBooksByIdRequest } from '@/features/ledger/types/requests/GetAccountingFinancialBooksByIdRequest';
import type { SearchAccountingFinancialBooksByIdClosingAccountsRequest } from '@/features/ledger/types/requests/SearchAccountingFinancialBooksByIdClosingAccountsRequest';
import type { SearchAccountingFinancialBooksRequest } from '@/features/ledger/types/requests/SearchAccountingFinancialBooksRequest';
import type { BookReadinessResponse } from '@/features/ledger/types/responses/BookReadinessResponse';
import type { FinancialBookListResponse } from '@/features/ledger/types/responses/FinancialBookListResponse';
import type { FinancialBookResponse } from '@/features/ledger/types/responses/FinancialBookResponse';
import type { TrialBalanceReport } from '@/features/ledger/types/responses/TrialBalanceReport';
export async function fetchAccountingFinancialBooks(
  params: SearchAccountingFinancialBooksRequest = {},
  signal?: AbortSignal,
): Promise<FinancialBookListResponse> {
  return await apiClient.get<FinancialBookListResponse>(ENDPOINTS.fetchAccountingFinancialBooks, {
    signal,
    params: { page: params.page, pageSize: params.pageSize, q: params.q },
  });
}
export async function fetchAccountingFinancialBooksById(
  params: GetAccountingFinancialBooksByIdRequest,
): Promise<FinancialBookResponse> {
  return await apiClient.get<FinancialBookResponse>(
    ENDPOINTS.fetchAccountingFinancialBooksById(params.id),
    { params: {} },
  );
}
export async function fetchAccountingFinancialBooksByIdReadiness(
  params: GetAccountingFinancialBooksByIdReadinessRequest,
): Promise<BookReadinessResponse> {
  return await apiClient.get<BookReadinessResponse>(
    ENDPOINTS.fetchAccountingFinancialBooksByIdReadiness(params.id),
    { params: {} },
  );
}
export async function fetchAccountingFinancialBooksByIdClosingAccounts(
  params: SearchAccountingFinancialBooksByIdClosingAccountsRequest,
): Promise<TrialBalanceReport> {
  return await apiClient.get<TrialBalanceReport>(
    ENDPOINTS.fetchAccountingFinancialBooksByIdClosingAccounts(params.id),
    {
      params: {
        page: params.page,
        pageSize: params.pageSize,
        branchId: params.branchId,
        asOf: params.asOf,
      },
    },
  );
}
