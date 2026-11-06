import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type { OperationListResponse, OperationResponse } from '@/features/ledger/public';
import type { GetEmployeesAdvancesByIdRequest } from '@/features/personnel/types/requests/GetEmployeesAdvancesByIdRequest';
import type { GetEmployeesByIdRequest } from '@/features/personnel/types/requests/GetEmployeesByIdRequest';
import type { GetEmployeesPayrollAccrualsByIdRequest } from '@/features/personnel/types/requests/GetEmployeesPayrollAccrualsByIdRequest';
import type { GetEmployeesSalaryPaymentsByIdRequest } from '@/features/personnel/types/requests/GetEmployeesSalaryPaymentsByIdRequest';
import type { SearchEmployeesAdvancesRequest } from '@/features/personnel/types/requests/SearchEmployeesAdvancesRequest';
import type { SearchEmployeesPayrollAccrualsRequest } from '@/features/personnel/types/requests/SearchEmployeesPayrollAccrualsRequest';
import type { SearchEmployeesRequest } from '@/features/personnel/types/requests/SearchEmployeesRequest';
import type { SearchEmployeesSalaryPaymentsRequest } from '@/features/personnel/types/requests/SearchEmployeesSalaryPaymentsRequest';
import type { EmployeeListResponse } from '@/features/personnel/types/responses/EmployeeListResponse';
import type { EmployeeResponse } from '@/features/personnel/types/responses/EmployeeResponse';
/** List employees. Existing HTTP contract. */
export async function fetchEmployees(
  params: SearchEmployeesRequest = {},
  signal?: AbortSignal,
): Promise<EmployeeListResponse> {
  return await apiClient.get<EmployeeListResponse>(ENDPOINTS.fetchEmployees, {
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
/** Get employees detail. Existing HTTP contract. */
export async function fetchEmployeesById(
  params: GetEmployeesByIdRequest,
): Promise<EmployeeResponse> {
  return await apiClient.get<EmployeeResponse>(ENDPOINTS.fetchEmployeesById(params.id), {
    params: { bookId: params.bookId },
  });
}
/** List payroll accruals. Existing HTTP contract. */
export async function fetchEmployeesPayrollAccruals(
  params: SearchEmployeesPayrollAccrualsRequest = {},
  signal?: AbortSignal,
): Promise<OperationListResponse> {
  return await apiClient.get<OperationListResponse>(ENDPOINTS.fetchEmployeesPayrollAccruals, {
    signal,
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
  return await apiClient.get<OperationResponse>(
    ENDPOINTS.fetchEmployeesPayrollAccrualsById(params.id),
    { params: { bookId: params.bookId, branchId: params.branchId } },
  );
}
/** List salary payments. Existing HTTP contract. */
export async function fetchEmployeesSalaryPayments(
  params: SearchEmployeesSalaryPaymentsRequest = {},
  signal?: AbortSignal,
): Promise<OperationListResponse> {
  return await apiClient.get<OperationListResponse>(ENDPOINTS.fetchEmployeesSalaryPayments, {
    signal,
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
  return await apiClient.get<OperationResponse>(
    ENDPOINTS.fetchEmployeesSalaryPaymentsById(params.id),
    { params: { bookId: params.bookId, branchId: params.branchId } },
  );
}
/** List advances. Existing HTTP contract. */
export async function fetchEmployeesAdvances(
  params: SearchEmployeesAdvancesRequest = {},
  signal?: AbortSignal,
): Promise<OperationListResponse> {
  return await apiClient.get<OperationListResponse>(ENDPOINTS.fetchEmployeesAdvances, {
    signal,
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
  return await apiClient.get<OperationResponse>(ENDPOINTS.fetchEmployeesAdvancesById(params.id), {
    params: { bookId: params.bookId, branchId: params.branchId },
  });
}
