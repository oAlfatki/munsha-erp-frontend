import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type { SearchReportsCustomersBalancesRequest } from '@/features/customers/types/requests/SearchReportsCustomersBalancesRequest';
import type { CustomerBalancesReport } from '@/features/customers/types/responses/CustomerBalancesReport';
export async function fetchReportsCustomersBalances(
  params: SearchReportsCustomersBalancesRequest,
): Promise<CustomerBalancesReport> {
  return await apiClient.get<CustomerBalancesReport>(ENDPOINTS.fetchReportsCustomersBalances,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      q: params.q,
      asOf: params.asOf,
      partyId: params.partyId,
    }});
}