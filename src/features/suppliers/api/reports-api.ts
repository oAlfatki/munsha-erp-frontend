import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type { SearchReportsSuppliersBalancesRequest } from '@/features/suppliers/types/requests/SearchReportsSuppliersBalancesRequest';
import type { SupplierBalancesReport } from '@/features/suppliers/types/responses/SupplierBalancesReport';
export async function fetchReportsSuppliersBalances(
  params: SearchReportsSuppliersBalancesRequest,
): Promise<SupplierBalancesReport> {
  return await apiClient.get<SupplierBalancesReport>(ENDPOINTS.fetchReportsSuppliersBalances,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      q: params.q,
      asOf: params.asOf,
      partyId: params.partyId,
    }});
}