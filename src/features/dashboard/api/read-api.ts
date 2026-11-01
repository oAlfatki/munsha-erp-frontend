import { ENDPOINTS } from '@/core/config/endpoints';
import { apiRequest } from '@/core/services/http/api-client';
import type { GetDashboardRequest } from '@/features/dashboard/types/requests/GetDashboardRequest';
import type { DashboardResponse } from '@/features/dashboard/types/responses/DashboardResponse';
/** Get dashboard inventory alerts and recent activity. Existing HTTP contract. */
export async function fetchDashboard(params: GetDashboardRequest): Promise<DashboardResponse> {
  return await apiRequest<DashboardResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchDashboard,
    params: { bookId: params.bookId, branchId: params.branchId },
  });
}
