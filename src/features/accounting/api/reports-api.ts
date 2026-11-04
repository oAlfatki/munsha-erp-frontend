import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type { SearchReportsAccountingAccountStatementRequest } from '@/features/ledger/public/types/requests/SearchReportsAccountingAccountStatementRequest';
import type { SearchReportsAccountingAssetsRequest } from '@/features/ledger/public/types/requests/SearchReportsAccountingAssetsRequest';
import type { SearchReportsAccountingCashMovementsRequest } from '@/features/ledger/public/types/requests/SearchReportsAccountingCashMovementsRequest';
import type { SearchReportsAccountingContactLedgerRequest } from '@/features/ledger/public/types/requests/SearchReportsAccountingContactLedgerRequest';
import type { SearchReportsAccountingForeignCurrencyRequest } from '@/features/ledger/public/types/requests/SearchReportsAccountingForeignCurrencyRequest';
import type { SearchReportsAccountingOpeningBalancesRequest } from '@/features/ledger/public/types/requests/SearchReportsAccountingOpeningBalancesRequest';
import type { SearchReportsAccountingTaxRequest } from '@/features/ledger/public/types/requests/SearchReportsAccountingTaxRequest';
import type { SearchReportsAccountingTrialBalanceRequest } from '@/features/ledger/public/types/requests/SearchReportsAccountingTrialBalanceRequest';
import type { AccountStatementResponse } from '@/features/ledger/public/types/responses/AccountStatementResponse';
import type { AssetsReport } from '@/features/ledger/public/types/responses/AssetsReport';
import type { CashMovementsReport } from '@/features/ledger/public/types/responses/CashMovementsReport';
import type { ForeignCurrencyReport } from '@/features/ledger/public/types/responses/ForeignCurrencyReport';
import type { OpeningBalancesReport } from '@/features/ledger/public/types/responses/OpeningBalancesReport';
import type { TaxReport } from '@/features/ledger/public/types/responses/TaxReport';
import type { TrialBalanceReport } from '@/features/ledger/public/types/responses/TrialBalanceReport';
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
