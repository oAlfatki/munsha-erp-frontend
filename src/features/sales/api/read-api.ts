import { ENDPOINTS } from '@/core/config/endpoints';
import { apiRequest } from '@/core/services/http/api-client';
import type { GetSalesInvoicesByIdRequest } from '@/features/sales/types/requests/GetSalesInvoicesByIdRequest';
import type { GetSalesInvoicesByIdReturnAvailabilityRequest } from '@/features/sales/types/requests/GetSalesInvoicesByIdReturnAvailabilityRequest';
import type { GetSalesReturnsByIdRequest } from '@/features/sales/types/requests/GetSalesReturnsByIdRequest';
import type { GetSalesTargetsByIdRequest } from '@/features/sales/types/requests/GetSalesTargetsByIdRequest';
import type { SearchSalesInvoicesRequest } from '@/features/sales/types/requests/SearchSalesInvoicesRequest';
import type { SearchSalesReturnsRequest } from '@/features/sales/types/requests/SearchSalesReturnsRequest';
import type { SearchSalesTargetsRequest } from '@/features/sales/types/requests/SearchSalesTargetsRequest';
import type { InvoiceListResponse } from '@/features/sales/types/responses/InvoiceListResponse';
import type { InvoiceResponse } from '@/features/sales/types/responses/InvoiceResponse';
import type { InvoiceReturnListResponse } from '@/features/sales/types/responses/InvoiceReturnListResponse';
import type { InvoiceReturnResponse } from '@/features/sales/types/responses/InvoiceReturnResponse';
import type { ReturnAvailabilityResponse } from '@/features/sales/types/responses/ReturnAvailabilityResponse';
import type { SalesTargetListResponse } from '@/features/sales/types/responses/SalesTargetListResponse';
import type { SalesTargetResponse } from '@/features/sales/types/responses/SalesTargetResponse';
/** List monthly sales targets. Existing HTTP contract. */
export async function fetchSalesTargets(
  params: SearchSalesTargetsRequest = {},
): Promise<SalesTargetListResponse> {
  return await apiRequest<SalesTargetListResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchSalesTargets,
    params: {
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      active: params.active,
      bookId: params.bookId,
      branchId: params.branchId,
      employeeId: params.employeeId,
      period: params.period,
    },
  });
}
/** Get monthly sales targets detail. Existing HTTP contract. */
export async function fetchSalesTargetsById(
  params: GetSalesTargetsByIdRequest,
): Promise<SalesTargetResponse> {
  return await apiRequest<SalesTargetResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchSalesTargetsById(params.id),
    params: { bookId: params.bookId },
  });
}
/** List sales invoices. Existing HTTP contract. */
export async function fetchSalesInvoices(
  params: SearchSalesInvoicesRequest = {},
): Promise<InvoiceListResponse> {
  return await apiRequest<InvoiceListResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchSalesInvoices,
    params: {
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      status: params.status,
      reference: params.reference,
      partyId: params.partyId,
      currency: params.currency,
      payment: params.payment,
    },
  });
}
/** Get sales invoices detail. Existing HTTP contract. */
export async function fetchSalesInvoicesById(
  params: GetSalesInvoicesByIdRequest,
): Promise<InvoiceResponse> {
  return await apiRequest<InvoiceResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchSalesInvoicesById(params.id),
    params: { bookId: params.bookId, branchId: params.branchId },
  });
}
/** List sales returns. Existing HTTP contract. */
export async function fetchSalesReturns(
  params: SearchSalesReturnsRequest = {},
): Promise<InvoiceReturnListResponse> {
  return await apiRequest<InvoiceReturnListResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchSalesReturns,
    params: {
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      status: params.status,
      reference: params.reference,
      partyId: params.partyId,
      currency: params.currency,
      payment: params.payment,
    },
  });
}
/** Get sales returns detail. Existing HTTP contract. */
export async function fetchSalesReturnsById(
  params: GetSalesReturnsByIdRequest,
): Promise<InvoiceReturnResponse> {
  return await apiRequest<InvoiceReturnResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchSalesReturnsById(params.id),
    params: { bookId: params.bookId, branchId: params.branchId },
  });
}
/** Get remaining sales return quantities. Existing HTTP contract. */
export async function fetchSalesInvoicesByIdReturnAvailability(
  params: GetSalesInvoicesByIdReturnAvailabilityRequest,
): Promise<ReturnAvailabilityResponse> {
  return await apiRequest<ReturnAvailabilityResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchSalesInvoicesByIdReturnAvailability(params.id),
    params: { bookId: params.bookId, branchId: params.branchId },
  });
}
