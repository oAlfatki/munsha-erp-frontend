import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/features/ledger/api/endpoints';
import type { GetAccountingAssetsByIdRequest } from '@/features/ledger/types/requests/GetAccountingAssetsByIdRequest';
import type { SearchAccountingAssetsRequest } from '@/features/ledger/types/requests/SearchAccountingAssetsRequest';
import type { AssetListResponse } from '@/features/ledger/types/responses/AssetListResponse';
import type { AssetResponse } from '@/features/ledger/types/responses/AssetResponse';

export async function fetchAccountingAssets(
  params: SearchAccountingAssetsRequest = {},
  signal?: AbortSignal,
): Promise<AssetListResponse> {

  return await apiClient.get<AssetListResponse>(ENDPOINTS.fetchAccountingAssets, {
    signal,
    params: {
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      active: params.active,
      bookId: params.bookId,
      branchId: params.branchId,
    },
  });
}

export async function fetchAccountingAssetsById(
  params: GetAccountingAssetsByIdRequest,
): Promise<AssetResponse> {

  return await apiClient.get<AssetResponse>(ENDPOINTS.fetchAccountingAssetsById(params.id), {
    params: { bookId: params.bookId },
  });
}
