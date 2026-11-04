import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import type { VoucherEditorControllerReadModel } from '@/features/accounting/types/read-models/VoucherEditorControllerReadModel';
import { booksQuery } from '@/features/ledger/public/books-query';
import { cashQuery } from '@/features/ledger/public/cash-query';
import { currenciesQuery } from '@/features/ledger/public/currencies-query';
import { journalsQuery } from '@/features/ledger/public/journals-query';
import { mapMasterRecords } from '@/features/ledger/public/master-records';
import { branchesQuery } from '@/features/organization/public/branches-query';
import { companyQuery } from '@/features/organization/public/company-query';
import { systemQuery } from '@/features/organization/public/system-query';
import { customersQuery } from '@/features/parties/public/customers-query';
import { suppliersQuery } from '@/features/parties/public/suppliers-query';
import { warehousesQuery } from '@/features/stock/public/warehouses-query';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
export function useVoucherEditorControllerQuery() {
  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1, q2, q3, q4, q5, q6, q7, q8] = useSuspenseQueries({
    queries: [
      companyQuery(scope),
      warehousesQuery(scope),
      branchesQuery(scope),
      systemQuery(scope),
      journalsQuery(scope),
      currenciesQuery(scope),
      customersQuery(scope),
      suppliersQuery(scope),
      cashQuery(scope),
    ],
  });
  const state: VoucherEditorControllerReadModel = {
    organization: q0.data,
    warehouses: q1.data.items,
    branches: q2.data.items,
    systemSettings: q3.data,
    extras: {
      records: { cash: mapMasterRecords(q8.data.items) },
      operations: [],
      drafts: {},
      preferences: {
        defaultProfit: String(q3.data.inventory.profit),
        defaultDiscount: String(q3.data.inventory.discount),
        defaultPrice: q3.data.sales.defaultPrice,
      },
    },
    entries: q4.data.items,
    parties: [...q6.data.items, ...q7.data.items],
    currencies: q5.data.items,
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
      0,
      q4.data.scope.revision,
      q5.data.scope.revision,
      q6.data.scope.revision,
      q7.data.scope.revision,
      q8.data.scope.revision,
    ),
  };
}
