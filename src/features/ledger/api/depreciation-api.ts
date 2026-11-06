import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type { GetAccountingDepreciationByIdRequest } from '@/features/ledger/types/requests/GetAccountingDepreciationByIdRequest';
import type { SearchAccountingDepreciationRequest } from '@/features/ledger/types/requests/SearchAccountingDepreciationRequest';
import type { OperationListResponse } from '@/features/ledger/types/responses/OperationListResponse';
import type { OperationResponse } from '@/features/ledger/types/responses/OperationResponse';
export async function fetchAccountingDepreciation(
  params: SearchAccountingDepreciationRequest = {},
  signal?: AbortSignal,
): Promise<OperationListResponse> {
  return await apiClient.get<OperationListResponse>(ENDPOINTS.fetchAccountingDepreciation, {
    signal,
    params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      period: params.period,
      q: params.q,
      sourceId: params.sourceId,
    },
  });
}
export async function fetchAccountingDepreciationById(
  params: GetAccountingDepreciationByIdRequest,
): Promise<OperationResponse> {
  return await apiClient.get<OperationResponse>(
    ENDPOINTS.fetchAccountingDepreciationById(params.id),
    { params: { bookId: params.bookId, branchId: params.branchId } },
  );
}
