import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import type { AnnualSettingsReadModel } from '@/features/accounting/fiscal-periods/types/read-models/AnnualSettingsReadModel';
import {
  accountsQuery,
  booksQuery,
  cashQuery,
  contactsQuery,
  journalsQuery,
  mapMasterRecords,
} from '@/features/ledger/public';
import { branchesQuery, companyQuery } from '@/features/organization/public';
import { customersQuery, suppliersQuery } from '@/features/parties/public';
import { employeesQuery } from '@/features/personnel/public';
import {
  itemsQuery,
  movementsQuery,
  stockDocumentsQuery,
  stocksQuery,
  warehousesQuery,
} from '@/features/stock/public';
import { purchaseInvoicesQuery, saleInvoicesQuery } from '@/features/trade/public';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';

export function useAnnualSettingsQuery() {

  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15] = useSuspenseQueries(
    {
      queries: [
        companyQuery(scope),
        stockDocumentsQuery(scope),
        journalsQuery(scope),
        branchesQuery(scope),
        stocksQuery(scope),
        employeesQuery(scope),
        itemsQuery(scope),
        warehousesQuery(scope),
        movementsQuery(scope),
        customersQuery(scope),
        suppliersQuery(scope),
        saleInvoicesQuery(scope),
        purchaseInvoicesQuery(scope),
        accountsQuery(scope),
        contactsQuery(scope),
        cashQuery(scope),
      ],
    },
  );
  const state: AnnualSettingsReadModel = {
    organization: q0.data,
    annualBooks: { activeId: books.scope.bookId, books: books.items },
    invoices: [...q11.data.items, ...q12.data.items],
    stockDocuments: q1.data.items,
    entries: q2.data.items,
    branches: q3.data.items,
    stocks: q4.data.items,
    extras: {
      records: {
        accounts: mapMasterRecords(q13.data.items),
        contacts: mapMasterRecords(q14.data.items),
        cash: mapMasterRecords(q15.data.items),
      },
      operations: [],
      drafts: {},
      preferences: {},
    },
    parties: [...q9.data.items, ...q10.data.items],
    employees: q5.data.items,
    products: q6.data.items,
    warehouses: q7.data.items,
    movements: q8.data.items,
  };
  return {
    ...app,
    state,
    loading: false,
    error: '',
    revision: Math.max(
      books.scope.revision,
      0,
      q1.data.scope.revision,
      q2.data.scope.revision,
      q3.data.scope.revision,
      q4.data.scope.revision,
      q5.data.scope.revision,
      q6.data.scope.revision,
      q7.data.scope.revision,
      q8.data.scope.revision,
      q9.data.scope.revision,
      q10.data.scope.revision,
      q11.data.scope.revision,
      q12.data.scope.revision,
      q13.data.scope.revision,
      q14.data.scope.revision,
      q15.data.scope.revision,
    ),
  };
}
