import { apiClient } from "@/core/api/apiClient";
import { ENDPOINTS } from "@/core/config/endpoints";
import type { GetAccountingAccountsByCodeRequest } from "@/features/accounting/types/requests/GetAccountingAccountsByCodeRequest";
import type { GetAccountingAssetAcquisitionsByIdRequest } from "@/features/accounting/types/requests/GetAccountingAssetAcquisitionsByIdRequest";
import type { GetAccountingAssetsByIdRequest } from "@/features/accounting/types/requests/GetAccountingAssetsByIdRequest";
import type { GetAccountingCashAccountsByIdRequest } from "@/features/accounting/types/requests/GetAccountingCashAccountsByIdRequest";
import type { GetAccountingContactsByIdRequest } from "@/features/accounting/types/requests/GetAccountingContactsByIdRequest";
import type { GetAccountingCurrenciesByCodeRequest } from "@/features/accounting/types/requests/GetAccountingCurrenciesByCodeRequest";
import type { GetAccountingDepreciationByIdRequest } from "@/features/accounting/types/requests/GetAccountingDepreciationByIdRequest";
import type { GetAccountingFinancialBooksByIdReadinessRequest } from "@/features/accounting/types/requests/GetAccountingFinancialBooksByIdReadinessRequest";
import type { GetAccountingFinancialBooksByIdRequest } from "@/features/accounting/types/requests/GetAccountingFinancialBooksByIdRequest";
import type { GetAccountingJournalsByIdRequest } from "@/features/accounting/types/requests/GetAccountingJournalsByIdRequest";
import type { GetAccountingVouchersByIdRequest } from "@/features/accounting/types/requests/GetAccountingVouchersByIdRequest";
import type { SearchAccountingAccountsRequest } from "@/features/accounting/types/requests/SearchAccountingAccountsRequest";
import type { SearchAccountingAssetAcquisitionsRequest } from "@/features/accounting/types/requests/SearchAccountingAssetAcquisitionsRequest";
import type { SearchAccountingAssetsRequest } from "@/features/accounting/types/requests/SearchAccountingAssetsRequest";
import type { SearchAccountingCashAccountsRequest } from "@/features/accounting/types/requests/SearchAccountingCashAccountsRequest";
import type { SearchAccountingContactsRequest } from "@/features/accounting/types/requests/SearchAccountingContactsRequest";
import type { SearchAccountingCurrenciesRequest } from "@/features/accounting/types/requests/SearchAccountingCurrenciesRequest";
import type { SearchAccountingDepreciationRequest } from "@/features/accounting/types/requests/SearchAccountingDepreciationRequest";
import type { SearchAccountingExchangeRatesRequest } from "@/features/accounting/types/requests/SearchAccountingExchangeRatesRequest";
import type { SearchAccountingFinancialBooksByIdClosingAccountsRequest } from "@/features/accounting/types/requests/SearchAccountingFinancialBooksByIdClosingAccountsRequest";
import type { SearchAccountingFinancialBooksByIdClosingStockRequest } from "@/features/accounting/types/requests/SearchAccountingFinancialBooksByIdClosingStockRequest";
import type { SearchAccountingFinancialBooksRequest } from "@/features/accounting/types/requests/SearchAccountingFinancialBooksRequest";
import type { SearchAccountingJournalsRequest } from "@/features/accounting/types/requests/SearchAccountingJournalsRequest";
import type { SearchAccountingVouchersRequest } from "@/features/accounting/types/requests/SearchAccountingVouchersRequest";
import type { AccountListResponse } from "@/features/accounting/types/responses/AccountListResponse";
import type { AccountResponse } from "@/features/accounting/types/responses/AccountResponse";
import type { AssetListResponse } from "@/features/accounting/types/responses/AssetListResponse";
import type { AssetResponse } from "@/features/accounting/types/responses/AssetResponse";
import type { BookReadinessResponse } from "@/features/accounting/types/responses/BookReadinessResponse";
import type { CashAccountListResponse } from "@/features/accounting/types/responses/CashAccountListResponse";
import type { CashAccountResponse } from "@/features/accounting/types/responses/CashAccountResponse";
import type { ContactListResponse } from "@/features/accounting/types/responses/ContactListResponse";
import type { ContactResponse } from "@/features/accounting/types/responses/ContactResponse";
import type { CurrencyListResponse } from "@/features/accounting/types/responses/CurrencyListResponse";
import type { CurrencyResponse } from "@/features/accounting/types/responses/CurrencyResponse";
import type { FinancialBookListResponse } from "@/features/accounting/types/responses/FinancialBookListResponse";
import type { FinancialBookResponse } from "@/features/accounting/types/responses/FinancialBookResponse";
import type { FxRateListResponse } from "@/features/accounting/types/responses/FxRateListResponse";
import type { JournalEntryListResponse } from "@/features/accounting/types/responses/JournalEntryListResponse";
import type { JournalEntryResponse } from "@/features/accounting/types/responses/JournalEntryResponse";
import type { TrialBalanceReport } from '@/features/accounting/types/responses/TrialBalanceReport';
import type { VoucherListResponse } from "@/features/accounting/types/responses/VoucherListResponse";
import type { VoucherResponse } from "@/features/accounting/types/responses/VoucherResponse";
import type { OperationListResponse } from "@/features/employees/public/types/responses/OperationListResponse";
import type { OperationResponse } from "@/features/employees/public/types/responses/OperationResponse";
import type { InventoryValuationReport } from "@/features/inventory/public/types/responses/InventoryValuationReport";
/** List chart-of-account cards. Existing HTTP contract. */
export async function fetchAccountingAccounts(
  params: SearchAccountingAccountsRequest = {},signal?:AbortSignal
): Promise<AccountListResponse> {
  return await apiClient.get<AccountListResponse>(ENDPOINTS.fetchAccountingAccounts,{signal,params: {
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      active: params.active,
      bookId: params.bookId,
    }});
}
/** Get chart-of-account cards detail. Existing HTTP contract. */
export async function fetchAccountingAccountsByCode(
  params: GetAccountingAccountsByCodeRequest,
): Promise<AccountResponse> {
  return await apiClient.get<AccountResponse>(ENDPOINTS.fetchAccountingAccountsByCode(params.code),{params: { bookId: params.bookId }});
}
/** List cash and bank cards. Existing HTTP contract. */
export async function fetchAccountingCashAccounts(
  params: SearchAccountingCashAccountsRequest = {},signal?:AbortSignal
): Promise<CashAccountListResponse> {
  return await apiClient.get<CashAccountListResponse>(ENDPOINTS.fetchAccountingCashAccounts,{signal,params: {
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      active: params.active,
      bookId: params.bookId,
      branchId: params.branchId,
      currency: params.currency,
    }});
}
/** Get cash and bank cards detail. Existing HTTP contract. */
export async function fetchAccountingCashAccountsById(
  params: GetAccountingCashAccountsByIdRequest,
): Promise<CashAccountResponse> {
  return await apiClient.get<CashAccountResponse>(ENDPOINTS.fetchAccountingCashAccountsById(params.id),{params: { bookId: params.bookId }});
}
/** List fixed-asset cards. Existing HTTP contract. */
export async function fetchAccountingAssets(
  params: SearchAccountingAssetsRequest = {},signal?:AbortSignal
): Promise<AssetListResponse> {
  return await apiClient.get<AssetListResponse>(ENDPOINTS.fetchAccountingAssets,{signal,params: {
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      active: params.active,
      bookId: params.bookId,
      branchId: params.branchId,
    }});
}
/** Get fixed-asset cards detail. Existing HTTP contract. */
export async function fetchAccountingAssetsById(
  params: GetAccountingAssetsByIdRequest,
): Promise<AssetResponse> {
  return await apiClient.get<AssetResponse>(ENDPOINTS.fetchAccountingAssetsById(params.id),{params: { bookId: params.bookId }});
}
/** List miscellaneous debtor and creditor cards. Existing HTTP contract. */
export async function fetchAccountingContacts(
  params: SearchAccountingContactsRequest = {},signal?:AbortSignal
): Promise<ContactListResponse> {
  return await apiClient.get<ContactListResponse>(ENDPOINTS.fetchAccountingContacts,{signal,params: {
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      active: params.active,
      bookId: params.bookId,
    }});
}
/** Get miscellaneous debtor and creditor cards detail. Existing HTTP contract. */
export async function fetchAccountingContactsById(
  params: GetAccountingContactsByIdRequest,
): Promise<ContactResponse> {
  return await apiClient.get<ContactResponse>(ENDPOINTS.fetchAccountingContactsById(params.id),{params: { bookId: params.bookId }});
}
/** List currencies. Existing HTTP contract. */
export async function fetchAccountingCurrencies(
  params: SearchAccountingCurrenciesRequest = {},signal?:AbortSignal
): Promise<CurrencyListResponse> {
  return await apiClient.get<CurrencyListResponse>(ENDPOINTS.fetchAccountingCurrencies,{signal,params: { page: params.page, pageSize: params.pageSize, q: params.q, bookId: params.bookId }});
}
/** Get currencies detail. Existing HTTP contract. */
export async function fetchAccountingCurrenciesByCode(
  params: GetAccountingCurrenciesByCodeRequest,
): Promise<CurrencyResponse> {
  return await apiClient.get<CurrencyResponse>(ENDPOINTS.fetchAccountingCurrenciesByCode(params.code),{params: { bookId: params.bookId }});
}
/** List financial books. Existing HTTP contract. */
export async function fetchAccountingFinancialBooks(
  params: SearchAccountingFinancialBooksRequest = {},signal?:AbortSignal
): Promise<FinancialBookListResponse> {
  return await apiClient.get<FinancialBookListResponse>(ENDPOINTS.fetchAccountingFinancialBooks,{signal,params: { page: params.page, pageSize: params.pageSize, q: params.q }});
}
/** Get financial books detail. Existing HTTP contract. */
export async function fetchAccountingFinancialBooksById(
  params: GetAccountingFinancialBooksByIdRequest,
): Promise<FinancialBookResponse> {
  return await apiClient.get<FinancialBookResponse>(ENDPOINTS.fetchAccountingFinancialBooksById(params.id),{params: {}});
}
/** Get year-end activation readiness. Existing HTTP contract. */
export async function fetchAccountingFinancialBooksByIdReadiness(
  params: GetAccountingFinancialBooksByIdReadinessRequest,
): Promise<BookReadinessResponse> {
  return await apiClient.get<BookReadinessResponse>(ENDPOINTS.fetchAccountingFinancialBooksByIdReadiness(params.id),{params: {}});
}
/** List receipt and payment vouchers. Existing HTTP contract. */
export async function fetchAccountingVouchers(
  params: SearchAccountingVouchersRequest = {},signal?:AbortSignal
): Promise<VoucherListResponse> {
  return await apiClient.get<VoucherListResponse>(ENDPOINTS.fetchAccountingVouchers,{signal,params: {
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      reference: params.reference,
      kind: params.kind,
      partyId: params.partyId,
      cashId: params.cashId,
      currency: params.currency,
    }});
}
/** Get a voucher with currency lines. Existing HTTP contract. */
export async function fetchAccountingVouchersById(
  params: GetAccountingVouchersByIdRequest,
): Promise<VoucherResponse> {
  return await apiClient.get<VoucherResponse>(ENDPOINTS.fetchAccountingVouchersById(params.id),{params: { bookId: params.bookId, branchId: params.branchId }});
}
/** List posted journal entries. Existing HTTP contract. */
export async function fetchAccountingJournals(
  params: SearchAccountingJournalsRequest = {},signal?:AbortSignal
): Promise<JournalEntryListResponse> {
  return await apiClient.get<JournalEntryListResponse>(ENDPOINTS.fetchAccountingJournals,{signal,params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
      accountCode: params.accountCode,
      partyId: params.partyId,
      reference: params.reference,
    }});
}
/** Get a journal entry. Existing HTTP contract. */
export async function fetchAccountingJournalsById(
  params: GetAccountingJournalsByIdRequest,
): Promise<JournalEntryResponse> {
  return await apiClient.get<JournalEntryResponse>(ENDPOINTS.fetchAccountingJournalsById(params.id),{params: { bookId: params.bookId, branchId: params.branchId }});
}
/** List dated currency reference rates. Existing HTTP contract. */
export async function fetchAccountingExchangeRates(
  params: SearchAccountingExchangeRatesRequest = {},
): Promise<FxRateListResponse> {
  return await apiClient.get<FxRateListResponse>(ENDPOINTS.fetchAccountingExchangeRates,{params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      currency: params.currency,
      from: params.from,
      to: params.to,
    }});
}
/** List asset acquisitions. Existing HTTP contract. */
export async function fetchAccountingAssetAcquisitions(
  params: SearchAccountingAssetAcquisitionsRequest = {},signal?:AbortSignal
): Promise<OperationListResponse> {
  return await apiClient.get<OperationListResponse>(ENDPOINTS.fetchAccountingAssetAcquisitions,{signal,params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      period: params.period,
      q: params.q,
      sourceId: params.sourceId,
    }});
}
/** Get asset acquisitions detail. Existing HTTP contract. */
export async function fetchAccountingAssetAcquisitionsById(
  params: GetAccountingAssetAcquisitionsByIdRequest,
): Promise<OperationResponse> {
  return await apiClient.get<OperationResponse>(ENDPOINTS.fetchAccountingAssetAcquisitionsById(params.id),{params: { bookId: params.bookId, branchId: params.branchId }});
}
/** List depreciation. Existing HTTP contract. */
export async function fetchAccountingDepreciation(
  params: SearchAccountingDepreciationRequest = {},signal?:AbortSignal
): Promise<OperationListResponse> {
  return await apiClient.get<OperationListResponse>(ENDPOINTS.fetchAccountingDepreciation,{signal,params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      period: params.period,
      q: params.q,
      sourceId: params.sourceId,
    }});
}
/** Get depreciation detail. Existing HTTP contract. */
export async function fetchAccountingDepreciationById(
  params: GetAccountingDepreciationByIdRequest,
): Promise<OperationResponse> {
  return await apiClient.get<OperationResponse>(ENDPOINTS.fetchAccountingDepreciationById(params.id),{params: { bookId: params.bookId, branchId: params.branchId }});
}
/** Preview closing stock for carry-forward. Existing HTTP contract. */
export async function fetchAccountingFinancialBooksByIdClosingStock(
  params: SearchAccountingFinancialBooksByIdClosingStockRequest,
): Promise<InventoryValuationReport> {
  return await apiClient.get<InventoryValuationReport>(ENDPOINTS.fetchAccountingFinancialBooksByIdClosingStock(params.id),{params: {
      page: params.page,
      pageSize: params.pageSize,
      branchId: params.branchId,
      asOf: params.asOf,
    }});
}
/** Preview closing accounts for carry-forward. Existing HTTP contract. */
export async function fetchAccountingFinancialBooksByIdClosingAccounts(
  params: SearchAccountingFinancialBooksByIdClosingAccountsRequest,
): Promise<TrialBalanceReport> {
  return await apiClient.get<TrialBalanceReport>(ENDPOINTS.fetchAccountingFinancialBooksByIdClosingAccounts(params.id),{params: {
      page: params.page,
      pageSize: params.pageSize,
      branchId: params.branchId,
      asOf: params.asOf,
    }});
}
