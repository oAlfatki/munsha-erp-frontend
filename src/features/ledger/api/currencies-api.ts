import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type { GetAccountingCurrenciesByCodeRequest } from '@/features/ledger/types/requests/GetAccountingCurrenciesByCodeRequest';
import type { SearchAccountingCurrenciesRequest } from '@/features/ledger/types/requests/SearchAccountingCurrenciesRequest';
import type { SearchAccountingExchangeRatesRequest } from '@/features/ledger/types/requests/SearchAccountingExchangeRatesRequest';
import type { CurrencyListResponse } from '@/features/ledger/types/responses/CurrencyListResponse';
import type { CurrencyResponse } from '@/features/ledger/types/responses/CurrencyResponse';
import type { FxRateListResponse } from '@/features/ledger/types/responses/FxRateListResponse';
export async function fetchAccountingCurrencies(
  params: SearchAccountingCurrenciesRequest = {},
  signal?: AbortSignal,
): Promise<CurrencyListResponse> {
  return await apiClient.get<CurrencyListResponse>(ENDPOINTS.fetchAccountingCurrencies, {
    signal,
    params: { page: params.page, pageSize: params.pageSize, q: params.q, bookId: params.bookId },
  });
}
export async function fetchAccountingCurrenciesByCode(
  params: GetAccountingCurrenciesByCodeRequest,
): Promise<CurrencyResponse> {
  return await apiClient.get<CurrencyResponse>(
    ENDPOINTS.fetchAccountingCurrenciesByCode(params.code),
    { params: { bookId: params.bookId } },
  );
}
export async function fetchAccountingExchangeRates(
  params: SearchAccountingExchangeRatesRequest = {},
): Promise<FxRateListResponse> {
  return await apiClient.get<FxRateListResponse>(ENDPOINTS.fetchAccountingExchangeRates, {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      currency: params.currency,
      from: params.from,
      to: params.to,
    },
  });
}
