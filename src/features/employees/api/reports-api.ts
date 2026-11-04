import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type { SearchReportsEmployeesAdvancesRequest } from '@/features/employees/types/requests/SearchReportsEmployeesAdvancesRequest';
import type { SearchReportsEmployeesPayrollRequest } from '@/features/employees/types/requests/SearchReportsEmployeesPayrollRequest';
import type { AdvancesReport } from '@/features/employees/types/responses/AdvancesReport';
import type { PayrollReport } from '@/features/employees/types/responses/PayrollReport';
export async function fetchReportsEmployeesPayroll(
  params: SearchReportsEmployeesPayrollRequest,
): Promise<PayrollReport> {
  return await apiClient.get<PayrollReport>(ENDPOINTS.fetchReportsEmployeesPayroll,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
      employeeId: params.employeeId,
      period: params.period,
    }});
}
export async function fetchReportsEmployeesAdvances(
  params: SearchReportsEmployeesAdvancesRequest,
): Promise<AdvancesReport> {
  return await apiClient.get<AdvancesReport>(ENDPOINTS.fetchReportsEmployeesAdvances,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
      employeeId: params.employeeId,
    }});
}