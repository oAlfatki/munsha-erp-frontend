import { commandPath } from '@/core/api/command-path';
import { pathSegment } from '@/core/api/path-segment';

export const ENDPOINTS = {
  command: commandPath,
  fetchAccountingAccounts: `/accounting/accounts`,

  fetchAccountingAccountsByCode: (code: string) => `/accounting/accounts/${pathSegment(code)}`,

  fetchAccountingCashAccounts: `/accounting/cash-accounts`,

  fetchAccountingCashAccountsById: (id: string) => `/accounting/cash-accounts/${pathSegment(id)}`,

  fetchAccountingAssets: `/accounting/assets`,

  fetchAccountingAssetsById: (id: string) => `/accounting/assets/${pathSegment(id)}`,

  fetchAccountingContacts: `/accounting/contacts`,

  fetchAccountingContactsById: (id: string) => `/accounting/contacts/${pathSegment(id)}`,

  fetchAccountingCurrencies: `/accounting/currencies`,

  fetchAccountingCurrenciesByCode: (code: string) => `/accounting/currencies/${pathSegment(code)}`,

  fetchAccountingFinancialBooks: `/accounting/financial-books`,

  fetchAccountingFinancialBooksById: (id: string) =>
    `/accounting/financial-books/${pathSegment(id)}`,

  fetchAccountingFinancialBooksByIdReadiness: (id: string) =>
    `/accounting/financial-books/${pathSegment(id)}/readiness`,

  fetchAccountingVouchers: `/accounting/vouchers`,

  fetchAccountingVouchersById: (id: string) => `/accounting/vouchers/${pathSegment(id)}`,

  fetchAccountingJournals: `/accounting/journals`,

  fetchAccountingJournalsById: (id: string) => `/accounting/journals/${pathSegment(id)}`,

  fetchAccountingExchangeRates: `/accounting/exchange-rates`,
  fetchAccountingAssetAcquisitions: `/accounting/asset-acquisitions`,

  fetchAccountingAssetAcquisitionsById: (id: string) =>
    `/accounting/asset-acquisitions/${pathSegment(id)}`,

  fetchAccountingDepreciation: `/accounting/depreciation`,

  fetchAccountingDepreciationById: (id: string) => `/accounting/depreciation/${pathSegment(id)}`,

  fetchAccountingFinancialBooksByIdClosingAccounts: (id: string) =>
    `/accounting/financial-books/${pathSegment(id)}/closing-accounts`,

  fetchExpensesTypes: `/expenses/types`,

  fetchExpensesTypesById: (id: string) => `/expenses/types/${pathSegment(id)}`,

  fetchExpensesDocuments: `/expenses/documents`,

  fetchExpensesDocumentsById: (id: string) => `/expenses/documents/${pathSegment(id)}`,

  fetchExpensesDocumentsByIdPayments: (id: string) =>
    `/expenses/documents/${pathSegment(id)}/payments`,

  fetchExpensesDocumentsByIdConsumptions: (id: string) =>
    `/expenses/documents/${pathSegment(id)}/consumptions`,
} as const;
