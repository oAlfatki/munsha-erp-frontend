import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { accountsQuery } from '@/features/ledger/public/accounts-query';
import { booksQuery } from '@/features/ledger/public/books-query';
import { cashQuery } from '@/features/ledger/public/cash-query';
import { currenciesQuery } from '@/features/ledger/public/currencies-query';
import { journalsQuery } from '@/features/ledger/public/journals-query';
import { mapMasterRecords } from '@/features/ledger/public/master-records';
import { branchesQuery } from '@/features/organization/public/branches-query';
import { brandingQuery } from '@/features/organization/public/branding-query';
import { companyQuery } from '@/features/organization/public/company-query';
import { systemQuery } from '@/features/organization/public/system-query';
import type { SystemSettingsReadModel } from '@/features/settings/types/read-models/SystemSettingsReadModel';
import { stockDocumentsQuery } from '@/features/stock/public/stock-documents-query';
import { warehousesQuery } from '@/features/stock/public/warehouses-query';
import { purchaseInvoicesQuery } from '@/features/trade/public/purchase-invoices-query';
import { saleInvoicesQuery } from '@/features/trade/public/sale-invoices-query';
import { auditQuery } from '@/features/users/public/audit-query';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
export function useSystemSettingsQuery() {
  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12] = useSuspenseQueries({
    queries: [
      companyQuery(scope),
      brandingQuery(scope),
      branchesQuery(scope),
      warehousesQuery(scope),
      currenciesQuery(scope),
      systemQuery(scope),
      journalsQuery(scope),
      stockDocumentsQuery(scope),
      auditQuery(scope),
      saleInvoicesQuery(scope),
      purchaseInvoicesQuery(scope),
      accountsQuery(scope),
      cashQuery(scope),
    ],
  });
  const state: SystemSettingsReadModel = {
    organization: q0.data,
    branding: q1.data,
    branches: q2.data.items,
    warehouses: q3.data.items,
    currencies: q4.data.items,
    systemSettings: q5.data,
    extras: {
      records: {
        accounts: mapMasterRecords(q11.data.items),
        cash: mapMasterRecords(q12.data.items),
      },
      operations: [],
      drafts: {},
      preferences: {
        defaultProfit: String(q5.data.inventory.profit),
        defaultDiscount: String(q5.data.inventory.discount),
        defaultPrice: q5.data.sales.defaultPrice,
      },
    },
    annualBooks: { activeId: books.scope.bookId, books: books.items },
    documentCounters: undefined,
    entries: q6.data.items,
    invoices: [...q9.data.items, ...q10.data.items],
    stockDocuments: q7.data.items,
    audit: q8.data.items,
  };
  return {
    ...app,
    state,
    loading: false,
    error: '',
    revision: Math.max(
      books.scope.revision,
      0,
      0,
      q2.data.scope.revision,
      q3.data.scope.revision,
      q4.data.scope.revision,
      0,
      q6.data.scope.revision,
      q7.data.scope.revision,
      q8.data.scope.revision,
      q9.data.scope.revision,
      q10.data.scope.revision,
      q11.data.scope.revision,
      q12.data.scope.revision,
    ),
  };
}
