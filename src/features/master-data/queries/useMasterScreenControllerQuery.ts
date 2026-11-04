import { readAllPages } from '@/core/api/readAllPages';
import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import type { QueryScope } from '@/core/types/QueryScope';
import type { ReadPage } from '@/core/types/ReadPage';
import { booksQuery } from '@/features/ledger/public/books-query';
import { fetchExpensesTypes } from '@/features/ledger/public/expense-read-api';
import { mapMasterRecords } from '@/features/ledger/public/master-records';
import {
  fetchAccountingAccounts,
  fetchAccountingAssets,
  fetchAccountingCashAccounts,
  fetchAccountingContacts,
} from '@/features/ledger/public/read-api';
import type { MasterRecord } from '@/features/ledger/public/types/models/MasterRecord';
import { branchesQuery } from '@/features/organization/public/branches-query';
import { fetchPartiesGroups } from '@/features/parties/public/groups-api';
import {
  fetchInventoryItemGroups,
  fetchInventoryUnitCategories,
  fetchInventoryUnits,
} from '@/features/stock/public/read-api';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
export function useMasterScreenControllerQuery(collection: string) {
  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const { data: branches } = useSuspenseQuery(branchesQuery(scope));
  const { data: page } = useSuspenseQuery(masterRecordsQuery(scope, collection));
  return {
    ...app,
    state: {
      branches: branches.items,
      extras: {
        records: { [collection]: page.items },
        operations: [],
        drafts: {},
        preferences: {},
      },
    },
    revision: Math.max(books.scope.revision, page.scope.revision),
  };
}

export function masterRecordsQuery(identity: QueryScope, collection: string) {
  const owner = ['units', 'categories', 'productGroups'].includes(collection)
    ? 'inventory'
    : collection === 'groups'
      ? 'parties'
      : collection === 'expenseTypes'
        ? 'expenses'
        : 'accounting';
  return queryOptions({
    queryKey: [
      'erp',
      owner,
      'master:' + collection,
      identity.userId,
      identity.userKind,
      identity.bookId,
      '',
      identity.locale,
    ],
    queryFn: async ({ signal }): Promise<ReadPage<MasterRecord>> => {
      const params = { bookId: identity.bookId };
      switch (collection) {
        case 'accounts': {
          const page = await readAllPages(
            (p) => fetchAccountingAccounts(p, signal),
            params,
            signal,
          );
          return { ...page, items: mapMasterRecords(page.items) };
        }
        case 'cash': {
          const page = await readAllPages(
            (p) => fetchAccountingCashAccounts(p, signal),
            params,
            signal,
          );
          return { ...page, items: mapMasterRecords(page.items) };
        }
        case 'contacts': {
          const page = await readAllPages(
            (p) => fetchAccountingContacts(p, signal),
            params,
            signal,
          );
          return { ...page, items: mapMasterRecords(page.items) };
        }
        case 'assets': {
          const page = await readAllPages((p) => fetchAccountingAssets(p, signal), params, signal);
          return { ...page, items: mapMasterRecords(page.items) };
        }
        case 'units': {
          const page = await readAllPages((p) => fetchInventoryUnits(p, signal), params, signal);
          return { ...page, items: mapMasterRecords(page.items) };
        }
        case 'categories': {
          const page = await readAllPages(
            (p) => fetchInventoryUnitCategories(p, signal),
            params,
            signal,
          );
          return { ...page, items: mapMasterRecords(page.items) };
        }
        case 'productGroups': {
          const page = await readAllPages(
            (p) => fetchInventoryItemGroups(p, signal),
            params,
            signal,
          );
          return { ...page, items: mapMasterRecords(page.items) };
        }
        case 'groups': {
          const page = await readAllPages((p) => fetchPartiesGroups(p, signal), params, signal);
          return { ...page, items: mapMasterRecords(page.items) };
        }
        case 'expenseTypes': {
          const page = await readAllPages((p) => fetchExpensesTypes(p, signal), params, signal);
          return { ...page, items: mapMasterRecords(page.items) };
        }
        default:
          throw Error('نوع التعريف غير مدعوم: ' + collection);
      }
    },
    staleTime: 30000,
  });
}
