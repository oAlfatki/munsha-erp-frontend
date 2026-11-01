import { ENDPOINTS } from '@/core/config/endpoints';
import { apiClient } from '@/core/api/apiClient';
import type { GetExpensesDocumentsByIdRequest } from '@/features/expenses/types/requests/GetExpensesDocumentsByIdRequest';
import type { GetExpensesTypesByIdRequest } from '@/features/expenses/types/requests/GetExpensesTypesByIdRequest';
import type { SearchExpensesDocumentsByIdConsumptionsRequest } from '@/features/expenses/types/requests/SearchExpensesDocumentsByIdConsumptionsRequest';
import type { SearchExpensesDocumentsByIdPaymentsRequest } from '@/features/expenses/types/requests/SearchExpensesDocumentsByIdPaymentsRequest';
import type { SearchExpensesDocumentsRequest } from '@/features/expenses/types/requests/SearchExpensesDocumentsRequest';
import type { SearchExpensesTypesRequest } from '@/features/expenses/types/requests/SearchExpensesTypesRequest';
import type { ExpenseConsumptionsListResponse } from '@/features/expenses/types/responses/ExpenseConsumptionsListResponse';
import type { ExpenseDocumentListResponse } from '@/features/expenses/types/responses/ExpenseDocumentListResponse';
import type { ExpenseDocumentResponse } from '@/features/expenses/types/responses/ExpenseDocumentResponse';
import type { ExpensePaymentsListResponse } from '@/features/expenses/types/responses/ExpensePaymentsListResponse';
import type { ExpenseTypeListResponse } from '@/features/expenses/types/responses/ExpenseTypeListResponse';
import type { ExpenseTypeResponse } from '@/features/expenses/types/responses/ExpenseTypeResponse';
/** List expense types. Existing HTTP contract. */
export async function fetchExpensesTypes(
  params: SearchExpensesTypesRequest = {},
): Promise<ExpenseTypeListResponse> {
  return await apiClient.get<ExpenseTypeListResponse>(ENDPOINTS.fetchExpensesTypes,{params: {
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      active: params.active,
      bookId: params.bookId,
    }});
}
/** Get expense types detail. Existing HTTP contract. */
export async function fetchExpensesTypesById(
  params: GetExpensesTypesByIdRequest,
): Promise<ExpenseTypeResponse> {
  return await apiClient.get<ExpenseTypeResponse>(ENDPOINTS.fetchExpensesTypesById(params.id),{params: { bookId: params.bookId }});
}
/** List expense documents. Existing HTTP contract. */
export async function fetchExpensesDocuments(
  params: SearchExpensesDocumentsRequest = {},
): Promise<ExpenseDocumentListResponse> {
  return await apiClient.get<ExpenseDocumentListResponse>(ENDPOINTS.fetchExpensesDocuments,{params: {
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      reference: params.reference,
    }});
}
/** Get expense documents detail. Existing HTTP contract. */
export async function fetchExpensesDocumentsById(
  params: GetExpensesDocumentsByIdRequest,
): Promise<ExpenseDocumentResponse> {
  return await apiClient.get<ExpenseDocumentResponse>(ENDPOINTS.fetchExpensesDocumentsById(params.id),{params: { bookId: params.bookId }});
}
/** List expense payments. Existing HTTP contract. */
export async function fetchExpensesDocumentsByIdPayments(
  params: SearchExpensesDocumentsByIdPaymentsRequest,
): Promise<ExpensePaymentsListResponse> {
  return await apiClient.get<ExpensePaymentsListResponse>(ENDPOINTS.fetchExpensesDocumentsByIdPayments(params.id),{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
    }});
}
/** List expense consumptions. Existing HTTP contract. */
export async function fetchExpensesDocumentsByIdConsumptions(
  params: SearchExpensesDocumentsByIdConsumptionsRequest,
): Promise<ExpenseConsumptionsListResponse> {
  return await apiClient.get<ExpenseConsumptionsListResponse>(ENDPOINTS.fetchExpensesDocumentsByIdConsumptions(params.id),{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
    }});
}
