import { apiClient } from "@/core/api/apiClient";
import { ENDPOINTS } from "@/core/config/endpoints";
import type { GetPurchasesInvoicesByIdRequest } from "@/features/purchases/types/requests/GetPurchasesInvoicesByIdRequest";
import type { GetPurchasesInvoicesByIdReturnAvailabilityRequest } from "@/features/purchases/types/requests/GetPurchasesInvoicesByIdReturnAvailabilityRequest";
import type { GetPurchasesReturnsByIdRequest } from "@/features/purchases/types/requests/GetPurchasesReturnsByIdRequest";
import type { SearchPurchasesInvoicesRequest } from "@/features/purchases/types/requests/SearchPurchasesInvoicesRequest";
import type { SearchPurchasesReturnsRequest } from "@/features/purchases/types/requests/SearchPurchasesReturnsRequest";
import type { InvoiceListResponse } from "@/features/sales/public/types/responses/InvoiceListResponse";
import type { InvoiceResponse } from "@/features/sales/public/types/responses/InvoiceResponse";
import type { InvoiceReturnListResponse } from "@/features/sales/public/types/responses/InvoiceReturnListResponse";
import type { InvoiceReturnResponse } from "@/features/sales/public/types/responses/InvoiceReturnResponse";
import type { ReturnAvailabilityResponse } from "@/features/sales/public/types/responses/ReturnAvailabilityResponse";
/** List purchases invoices. Existing HTTP contract. */
export async function fetchPurchasesInvoices(
  params: SearchPurchasesInvoicesRequest = {},signal?:AbortSignal
): Promise<InvoiceListResponse> {
  return await apiClient.get<InvoiceListResponse>(ENDPOINTS.fetchPurchasesInvoices,{signal,params: {
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
    }});
}
/** Get purchases invoices detail. Existing HTTP contract. */
export async function fetchPurchasesInvoicesById(
  params: GetPurchasesInvoicesByIdRequest,
): Promise<InvoiceResponse> {
  return await apiClient.get<InvoiceResponse>(ENDPOINTS.fetchPurchasesInvoicesById(params.id),{params: { bookId: params.bookId, branchId: params.branchId }});
}
/** List purchases returns. Existing HTTP contract. */
export async function fetchPurchasesReturns(
  params: SearchPurchasesReturnsRequest = {},signal?:AbortSignal
): Promise<InvoiceReturnListResponse> {
  return await apiClient.get<InvoiceReturnListResponse>(ENDPOINTS.fetchPurchasesReturns,{signal,params: {
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
    }});
}
/** Get purchases returns detail. Existing HTTP contract. */
export async function fetchPurchasesReturnsById(
  params: GetPurchasesReturnsByIdRequest,
): Promise<InvoiceReturnResponse> {
  return await apiClient.get<InvoiceReturnResponse>(ENDPOINTS.fetchPurchasesReturnsById(params.id),{params: { bookId: params.bookId, branchId: params.branchId }});
}
/** Get remaining purchases return quantities. Existing HTTP contract. */
export async function fetchPurchasesInvoicesByIdReturnAvailability(
  params: GetPurchasesInvoicesByIdReturnAvailabilityRequest,
): Promise<ReturnAvailabilityResponse> {
  return await apiClient.get<ReturnAvailabilityResponse>(ENDPOINTS.fetchPurchasesInvoicesByIdReturnAvailability(params.id),{params: { bookId: params.bookId, branchId: params.branchId }});
}
