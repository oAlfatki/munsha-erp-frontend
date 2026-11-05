import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type {
  AccountStatementResponse,
  AssetsReport,
  CashMovementsReport,
  ForeignCurrencyReport,
  OpeningBalancesReport,
  SearchReportsAccountingAccountStatementRequest,
  SearchReportsAccountingAssetsRequest,
  SearchReportsAccountingCashMovementsRequest,
  SearchReportsAccountingContactLedgerRequest,
  SearchReportsAccountingForeignCurrencyRequest,
  SearchReportsAccountingOpeningBalancesRequest,
  SearchReportsAccountingTaxRequest,
  SearchReportsAccountingTrialBalanceRequest,
  TaxReport,
  TrialBalanceReport,
} from '@/features/ledger/public';
export async function fetchReportsAccountingCashMovements(
  params: SearchReportsAccountingCashMovementsRequest,
): Promise<CashMovementsReport> {
  return await apiClient.get<CashMovementsReport>(ENDPOINTS.fetchReportsAccountingCashMovements, {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
      cashId: params.cashId,
      currency: params.currency,
    },
  });
}
export async function fetchReportsAccountingOpeningBalances(
  params: SearchReportsAccountingOpeningBalancesRequest,
): Promise<OpeningBalancesReport> {
  return await apiClient.get<OpeningBalancesReport>(
    ENDPOINTS.fetchReportsAccountingOpeningBalances,
    {
      params: {
        page: params.page,
        pageSize: params.pageSize,
        bookId: params.bookId,
        branchId: params.branchId,
        q: params.q,
        asOf: params.asOf,
        accountCode: params.accountCode,
        partyId: params.partyId,
      },
    },
  );
}
export async function fetchReportsAccountingTrialBalance(
  params: SearchReportsAccountingTrialBalanceRequest,
): Promise<TrialBalanceReport> {
  return await apiClient.get<TrialBalanceReport>(ENDPOINTS.fetchReportsAccountingTrialBalance, {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      q: params.q,
      asOf: params.asOf,
      accountCode: params.accountCode,
    },
  });
}
export async function fetchReportsAccountingTax(
  params: SearchReportsAccountingTaxRequest,
): Promise<TaxReport> {
  return await apiClient.get<TaxReport>(ENDPOINTS.fetchReportsAccountingTax, {
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
export async function fetchReportsAccountingForeignCurrency(
  params: SearchReportsAccountingForeignCurrencyRequest,
): Promise<ForeignCurrencyReport> {
  return await apiClient.get<ForeignCurrencyReport>(
    ENDPOINTS.fetchReportsAccountingForeignCurrency,
    {
      params: {
        page: params.page,
        pageSize: params.pageSize,
        bookId: params.bookId,
        branchId: params.branchId,
        from: params.from,
        to: params.to,
        q: params.q,
        currency: params.currency,
      },
    },
  );
}
export async function fetchReportsAccountingAssets(
  params: SearchReportsAccountingAssetsRequest,
): Promise<AssetsReport> {
  return await apiClient.get<AssetsReport>(ENDPOINTS.fetchReportsAccountingAssets, {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      q: params.q,
      asOf: params.asOf,
    },
  });
}
export async function fetchReportsAccountingAccountStatement(
  params: SearchReportsAccountingAccountStatementRequest,
): Promise<AccountStatementResponse> {
  return await apiClient.get<AccountStatementResponse>(
    ENDPOINTS.fetchReportsAccountingAccountStatement,
    {
      params: {
        page: params.page,
        pageSize: params.pageSize,
        bookId: params.bookId,
        branchId: params.branchId,
        from: params.from,
        to: params.to,
        q: params.q,
        accountCode: params.accountCode,
        partyId: params.partyId,
      },
    },
  );
}
export async function fetchReportsAccountingContactLedger(
  params: SearchReportsAccountingContactLedgerRequest,
): Promise<AccountStatementResponse> {
  return await apiClient.get<AccountStatementResponse>(
    ENDPOINTS.fetchReportsAccountingContactLedger,
    {
      params: {
        page: params.page,
        pageSize: params.pageSize,
        bookId: params.bookId,
        branchId: params.branchId,
        from: params.from,
        to: params.to,
        q: params.q,
        accountCode: params.accountCode,
        contactId: params.contactId,
      },
    },
  );
}
