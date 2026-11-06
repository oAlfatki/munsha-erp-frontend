import { commandPath } from '@/core/api/command-path';
import { pathSegment } from '@/core/api/path-segment';

export const ENDPOINTS = {
  command: commandPath,

  fetchAccountingFinancialBooksByIdClosingStock: (id: string) =>
    `/accounting/financial-books/${pathSegment(id)}/closing-stock`,

  fetchReportsAccountingCashMovements: `/reports/accounting/cash-movements`,
  fetchReportsAccountingOpeningBalances: `/reports/accounting/opening-balances`,
  fetchReportsAccountingTrialBalance: `/reports/accounting/trial-balance`,
  fetchReportsAccountingTax: `/reports/accounting/tax`,
  fetchReportsAccountingForeignCurrency: `/reports/accounting/foreign-currency`,
  fetchReportsAccountingAssets: `/reports/accounting/assets`,
  fetchReportsAccountingAccountStatement: `/reports/accounting/account-statement`,
  fetchReportsAccountingContactLedger: `/reports/accounting/contact-ledger`,
} as const;
