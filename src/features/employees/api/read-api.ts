import { ENDPOINTS } from '@/core/config/endpoints';
import { apiRequest } from '@/core/services/http/api-client';
import type { GetEmployeesAdvancesByIdRequest } from '@/features/employees/types/requests/GetEmployeesAdvancesByIdRequest';
import type { GetEmployeesByIdRequest } from '@/features/employees/types/requests/GetEmployeesByIdRequest';
import type { GetEmployeesPayrollAccrualsByIdRequest } from '@/features/employees/types/requests/GetEmployeesPayrollAccrualsByIdRequest';
import type { GetEmployeesSalaryPaymentsByIdRequest } from '@/features/employees/types/requests/GetEmployeesSalaryPaymentsByIdRequest';
import type { SearchEmployeesAdvancesRequest } from '@/features/employees/types/requests/SearchEmployeesAdvancesRequest';
import type { SearchEmployeesPayrollAccrualsRequest } from '@/features/employees/types/requests/SearchEmployeesPayrollAccrualsRequest';
import type { SearchEmployeesRequest } from '@/features/employees/types/requests/SearchEmployeesRequest';
import type { SearchEmployeesSalaryPaymentsRequest } from '@/features/employees/types/requests/SearchEmployeesSalaryPaymentsRequest';
import type { EmployeeListResponse } from '@/features/employees/types/responses/EmployeeListResponse';
import type { EmployeeResponse } from '@/features/employees/types/responses/EmployeeResponse';
import type { OperationListResponse } from '@/features/employees/types/responses/OperationListResponse';
import type { OperationResponse } from '@/features/employees/types/responses/OperationResponse';
/** List employees. Existing HTTP contract. */
export async function fetchEmployees(
  params: SearchEmployeesRequest = {},
): Promise<EmployeeListResponse> {
  return await apiRequest<EmployeeListResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchEmployees,
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
/** Get employees detail. Existing HTTP contract. */
export async function fetchEmployeesById(
  params: GetEmployeesByIdRequest,
): Promise<EmployeeResponse> {
  return await apiRequest<EmployeeResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchEmployeesById(params.id),
    params: { bookId: params.bookId },
  });
}
/** List payroll accruals. Existing HTTP contract. */
export async function fetchEmployeesPayrollAccruals(
  params: SearchEmployeesPayrollAccrualsRequest = {},
): Promise<OperationListResponse> {
  return await apiRequest<OperationListResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchEmployeesPayrollAccruals,
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
/** Get payroll accruals detail. Existing HTTP contract. */
export async function fetchEmployeesPayrollAccrualsById(
  params: GetEmployeesPayrollAccrualsByIdRequest,
): Promise<OperationResponse> {
  return await apiRequest<OperationResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchEmployeesPayrollAccrualsById(params.id),
    params: { bookId: params.bookId, branchId: params.branchId },
  });
}
/** List salary payments. Existing HTTP contract. */
export async function fetchEmployeesSalaryPayments(
  params: SearchEmployeesSalaryPaymentsRequest = {},
): Promise<OperationListResponse> {
  return await apiRequest<OperationListResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchEmployeesSalaryPayments,
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
/** Get salary payments detail. Existing HTTP contract. */
export async function fetchEmployeesSalaryPaymentsById(
  params: GetEmployeesSalaryPaymentsByIdRequest,
): Promise<OperationResponse> {
  return await apiRequest<OperationResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchEmployeesSalaryPaymentsById(params.id),
    params: { bookId: params.bookId, branchId: params.branchId },
  });
}
/** List advances. Existing HTTP contract. */
export async function fetchEmployeesAdvances(
  params: SearchEmployeesAdvancesRequest = {},
): Promise<OperationListResponse> {
  return await apiRequest<OperationListResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchEmployeesAdvances,
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
/** Get advances detail. Existing HTTP contract. */
export async function fetchEmployeesAdvancesById(
  params: GetEmployeesAdvancesByIdRequest,
): Promise<OperationResponse> {
  return await apiRequest<OperationResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchEmployeesAdvancesById(params.id),
    params: { bookId: params.bookId, branchId: params.branchId },
  });
}
