import { collection, operations, records } from '@/core/query/resources';
import type { ErpReadModel } from '@/core/types/ErpReadModel';
import {
  fetchAccountingAccounts,
  fetchAccountingAssetAcquisitions,
  fetchAccountingAssets,
  fetchAccountingCashAccounts,
  fetchAccountingContacts,
  fetchAccountingCurrencies,
  fetchAccountingDepreciation,
  fetchAccountingFinancialBooks,
  fetchAccountingJournals,
  fetchAccountingVouchers,
} from '@/features/accounting/api/read-api';
export const BOOKS_RESOURCE = collection(
  'accounting',
  'books',
  fetchAccountingFinancialBooks,
  (items, scope) =>
    ({ annualBooks: { activeId: scope.bookId, books: items } }) as Partial<ErpReadModel>,
);
export const CURRENCIES_RESOURCE = collection(
  'accounting',
  'currencies',
  fetchAccountingCurrencies,
  (items) => ({ currencies: items }) as Partial<ErpReadModel>,
);
export const ACCOUNTS_RESOURCE = collection(
  'accounting',
  'accounts',
  fetchAccountingAccounts,
  (items) => records('accounts', items) as Partial<ErpReadModel>,
);
export const CASH_RESOURCE = collection(
  'accounting',
  'cash',
  fetchAccountingCashAccounts,
  (items) => records('cash', items) as Partial<ErpReadModel>,
);
export const ASSETS_RESOURCE = collection(
  'accounting',
  'assets',
  fetchAccountingAssets,
  (items) => records('assets', items) as Partial<ErpReadModel>,
);
export const CONTACTS_RESOURCE = collection(
  'accounting',
  'contacts',
  fetchAccountingContacts,
  (items) => records('contacts', items) as Partial<ErpReadModel>,
);
export const JOURNALS_RESOURCE = collection(
  'accounting',
  'journals',
  fetchAccountingJournals,
  (items) => ({ entries: items }) as Partial<ErpReadModel>,
);
export const VOUCHERS_RESOURCE = collection(
  'accounting',
  'vouchers',
  fetchAccountingVouchers,
  (items) => ({ vouchers: items }) as Partial<ErpReadModel>,
);
export const ACQUISITIONS_RESOURCE = collection(
  'accounting',
  'acquisitions',
  fetchAccountingAssetAcquisitions,
  (items) => operations(items) as Partial<ErpReadModel>,
);
export const DEPRECIATION_RESOURCE = collection(
  'accounting',
  'depreciation',
  fetchAccountingDepreciation,
  (items) => operations(items) as Partial<ErpReadModel>,
);
