import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type { SearchReportsExpensesRecognizedRequest } from '@/features/expenses/types/requests/SearchReportsExpensesRecognizedRequest';
import type { RecognizedExpensesReport } from '@/features/expenses/types/responses/RecognizedExpensesReport';
export async function fetchReportsExpensesRecognized(
  params: SearchReportsExpensesRecognizedRequest,
): Promise<RecognizedExpensesReport> {
  return await apiClient.get<RecognizedExpensesReport>(ENDPOINTS.fetchReportsExpensesRecognized, {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
    },
  });
}
