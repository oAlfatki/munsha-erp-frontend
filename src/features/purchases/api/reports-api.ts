import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type { SearchReportsPurchasesReturnsRequest } from '@/features/purchases/types/requests/SearchReportsPurchasesReturnsRequest';
import type { SearchReportsPurchasesSummaryRequest } from '@/features/purchases/types/requests/SearchReportsPurchasesSummaryRequest';
import type { PurchaseReturnsReport } from '@/features/purchases/types/responses/PurchaseReturnsReport';
import type { PurchasesSummaryReport } from '@/features/purchases/types/responses/PurchasesSummaryReport';
export async function fetchReportsPurchasesSummary(
  params: SearchReportsPurchasesSummaryRequest,
): Promise<PurchasesSummaryReport> {
  return await apiClient.get<PurchasesSummaryReport>(ENDPOINTS.fetchReportsPurchasesSummary, {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
      partyId: params.partyId,
      currency: params.currency,
      productId: params.productId,
    },
  });
}
export async function fetchReportsPurchasesReturns(
  params: SearchReportsPurchasesReturnsRequest,
): Promise<PurchaseReturnsReport> {
  return await apiClient.get<PurchaseReturnsReport>(ENDPOINTS.fetchReportsPurchasesReturns, {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
      partyId: params.partyId,
      currency: params.currency,
    },
  });
}
