import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type { GetAccountingVouchersByIdRequest } from '@/features/ledger/types/requests/GetAccountingVouchersByIdRequest';
import type { SearchAccountingVouchersRequest } from '@/features/ledger/types/requests/SearchAccountingVouchersRequest';
import type { VoucherListResponse } from '@/features/ledger/types/responses/VoucherListResponse';
import type { VoucherResponse } from '@/features/ledger/types/responses/VoucherResponse';
export async function fetchAccountingVouchers(
  params: SearchAccountingVouchersRequest = {},
  signal?: AbortSignal,
): Promise<VoucherListResponse> {
  return await apiClient.get<VoucherListResponse>(ENDPOINTS.fetchAccountingVouchers, {
    signal,
    params: {
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      reference: params.reference,
      kind: params.kind,
      partyId: params.partyId,
      cashId: params.cashId,
      currency: params.currency,
    },
  });
}
export async function fetchAccountingVouchersById(
  params: GetAccountingVouchersByIdRequest,
): Promise<VoucherResponse> {
  return await apiClient.get<VoucherResponse>(ENDPOINTS.fetchAccountingVouchersById(params.id), {
    params: { bookId: params.bookId, branchId: params.branchId },
  });
}
