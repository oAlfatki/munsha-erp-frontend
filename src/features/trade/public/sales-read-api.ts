import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type { GetSalesInvoicesByIdRequest } from '@/features/trade/public/types/requests/GetSalesInvoicesByIdRequest';
import type { GetSalesInvoicesByIdReturnAvailabilityRequest } from '@/features/trade/public/types/requests/GetSalesInvoicesByIdReturnAvailabilityRequest';
import type { GetSalesReturnsByIdRequest } from '@/features/trade/public/types/requests/GetSalesReturnsByIdRequest';
import type { GetSalesTargetsByIdRequest } from '@/features/trade/public/types/requests/GetSalesTargetsByIdRequest';
import type { SearchSalesInvoicesRequest } from '@/features/trade/public/types/requests/SearchSalesInvoicesRequest';
import type { SearchSalesReturnsRequest } from '@/features/trade/public/types/requests/SearchSalesReturnsRequest';
import type { SearchSalesTargetsRequest } from '@/features/trade/public/types/requests/SearchSalesTargetsRequest';
import type { InvoiceListResponse } from '@/features/trade/public/types/responses/InvoiceListResponse';
import type { InvoiceResponse } from '@/features/trade/public/types/responses/InvoiceResponse';
import type { InvoiceReturnListResponse } from '@/features/trade/public/types/responses/InvoiceReturnListResponse';
import type { InvoiceReturnResponse } from '@/features/trade/public/types/responses/InvoiceReturnResponse';
import type { ReturnAvailabilityResponse } from '@/features/trade/public/types/responses/ReturnAvailabilityResponse';
import type { SalesTargetListResponse } from '@/features/trade/public/types/responses/SalesTargetListResponse';
import type { SalesTargetResponse } from '@/features/trade/public/types/responses/SalesTargetResponse';
/** List monthly sales targets. Existing HTTP contract. */
export async function fetchSalesTargets(
  params: SearchSalesTargetsRequest = {},
  signal?: AbortSignal,
): Promise<SalesTargetListResponse> {
  return await apiClient.get<SalesTargetListResponse>(ENDPOINTS.fetchSalesTargets, {
    signal,
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
  return await apiClient.get<SalesTargetResponse>(ENDPOINTS.fetchSalesTargetsById(params.id), {
    params: { bookId: params.bookId },
  });
}
/** List sales invoices. Existing HTTP contract. */
export async function fetchSalesInvoices(
  params: SearchSalesInvoicesRequest = {},
  signal?: AbortSignal,
): Promise<InvoiceListResponse> {
  return await apiClient.get<InvoiceListResponse>(ENDPOINTS.fetchSalesInvoices, {
    signal,
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
  return await apiClient.get<InvoiceResponse>(ENDPOINTS.fetchSalesInvoicesById(params.id), {
    params: { bookId: params.bookId, branchId: params.branchId },
  });
}
/** List sales returns. Existing HTTP contract. */
export async function fetchSalesReturns(
  params: SearchSalesReturnsRequest = {},
  signal?: AbortSignal,
): Promise<InvoiceReturnListResponse> {
  return await apiClient.get<InvoiceReturnListResponse>(ENDPOINTS.fetchSalesReturns, {
    signal,
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
  return await apiClient.get<InvoiceReturnResponse>(ENDPOINTS.fetchSalesReturnsById(params.id), {
    params: { bookId: params.bookId, branchId: params.branchId },
  });
}
/** Get remaining sales return quantities. Existing HTTP contract. */
export async function fetchSalesInvoicesByIdReturnAvailability(
  params: GetSalesInvoicesByIdReturnAvailabilityRequest,
): Promise<ReturnAvailabilityResponse> {
  return await apiClient.get<ReturnAvailabilityResponse>(
    ENDPOINTS.fetchSalesInvoicesByIdReturnAvailability(params.id),
    { params: { bookId: params.bookId, branchId: params.branchId } },
  );
}
