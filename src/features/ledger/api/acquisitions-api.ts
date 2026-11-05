import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type { GetAccountingAssetAcquisitionsByIdRequest } from '@/features/ledger/types/requests/GetAccountingAssetAcquisitionsByIdRequest';
import type { SearchAccountingAssetAcquisitionsRequest } from '@/features/ledger/types/requests/SearchAccountingAssetAcquisitionsRequest';
import type { OperationListResponse } from '@/features/ledger/types/responses/OperationListResponse';
import type { OperationResponse } from '@/features/ledger/types/responses/OperationResponse';
export async function fetchAccountingAssetAcquisitions(
  params: SearchAccountingAssetAcquisitionsRequest = {},
  signal?: AbortSignal,
): Promise<OperationListResponse> {
  return await apiClient.get<OperationListResponse>(ENDPOINTS.fetchAccountingAssetAcquisitions, {
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
export async function fetchAccountingAssetAcquisitionsById(
  params: GetAccountingAssetAcquisitionsByIdRequest,
): Promise<OperationResponse> {
  return await apiClient.get<OperationResponse>(
    ENDPOINTS.fetchAccountingAssetAcquisitionsById(params.id),
    { params: { bookId: params.bookId, branchId: params.branchId } },
  );
}
