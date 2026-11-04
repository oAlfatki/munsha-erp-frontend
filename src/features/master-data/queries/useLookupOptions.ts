import { readAllPages } from '@/core/api/readAllPages';
import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import type { FieldDef } from '@/core/types/FieldDef';
import type { QueryScope } from '@/core/types/QueryScope';
import { booksQuery } from '@/features/ledger/public/books-query';
import { allAccounts } from '@/features/ledger/public/extensions';
import { mapMasterRecords } from '@/features/ledger/public/master-records';
import {
  fetchAccountingAccounts,
  fetchAccountingCurrencies,
} from '@/features/ledger/public/read-api';
import { fetchBranches } from '@/features/organization/public/read-api';
import { fetchEmployees } from '@/features/personnel/public/read-api';
import { fetchInventoryItems, fetchInventoryWarehouses } from '@/features/stock/public/read-api';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
export function lookupQuery(identity: QueryScope, field: FieldDef) {
  const kind = field.key === 'currency' ? 'currency' : field.type || 'local';
  const owner =
    kind === 'product' || kind === 'warehouse'
      ? 'inventory'
      : kind === 'employee'
        ? 'employees'
        : kind === 'account' || kind === 'currency'
          ? 'accounting'
          : 'settings';
  return queryOptions({
    queryKey: [
      'erp',
      owner,
      'lookup:' + kind,
      identity.userId,
      identity.userKind,
      identity.bookId,
      '',
      identity.locale,
      field.options,
    ],
    queryFn: async ({ signal }): Promise<[string, string][] | undefined> => {
      const params = { bookId: identity.bookId };
      switch (kind) {
        case 'currency': {
          const page = await readAllPages(
            (p) => fetchAccountingCurrencies(p, signal),
            params,
            signal,
          );
          return page.items.map((item) => [item.code, item.name]);
        }
        case 'branch': {
          const page = await readAllPages((p) => fetchBranches(p, signal), params, signal);
          return page.items.map((item) => [item.id, item.name]);
        }
        case 'warehouse': {
          const page = await readAllPages(
            (p) => fetchInventoryWarehouses(p, signal),
            params,
            signal,
          );
          return page.items.map((item) => [item.id, item.name]);
        }
        case 'product': {
          const page = await readAllPages((p) => fetchInventoryItems(p, signal), params, signal);
          return page.items.map((item) => [item.id, item.name]);
        }
        case 'employee': {
          const page = await readAllPages((p) => fetchEmployees(p, signal), params, signal);
          return page.items.map((item) => [item.id, item.name]);
        }
        case 'account': {
          const page = await readAllPages(
            (p) => fetchAccountingAccounts(p, signal),
            params,
            signal,
          );
          const chart = allAccounts({
            extras: {
              records: { accounts: mapMasterRecords(page.items) },
              operations: [],
              drafts: {},
              preferences: {},
            },
          });
          return Object.entries(chart).map(([id, account]) => [id, account.name + ' · ' + id]);
        }
        default:
          return field.options || [];
      }
    },
    staleTime: 30000,
  });
}

export function useLookupOptions(field: FieldDef) {
  const identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  return useSuspenseQuery(lookupQuery({ ...identity, bookId: books.scope.bookId }, field)).data;
}
