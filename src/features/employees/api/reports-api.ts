import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type {
  AdvancesReport,
  PayrollReport,
  SearchReportsEmployeesAdvancesRequest,
  SearchReportsEmployeesPayrollRequest,
} from '@/features/personnel/public';
export async function fetchReportsEmployeesPayroll(
  params: SearchReportsEmployeesPayrollRequest,
): Promise<PayrollReport> {
  return await apiClient.get<PayrollReport>(ENDPOINTS.fetchReportsEmployeesPayroll, {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
      employeeId: params.employeeId,
      period: params.period,
    },
  });
}
export async function fetchReportsEmployeesAdvances(
  params: SearchReportsEmployeesAdvancesRequest,
): Promise<AdvancesReport> {
  return await apiClient.get<AdvancesReport>(ENDPOINTS.fetchReportsEmployeesAdvances, {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
      employeeId: params.employeeId,
    },
  });
}
