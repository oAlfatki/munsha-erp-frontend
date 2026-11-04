import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import type { VouchersReportReadModel } from '@/features/accounting/types/read-models/VouchersReportReadModel';
import { booksQuery } from '@/features/ledger/public/books-query';
import { cashQuery } from '@/features/ledger/public/cash-query';
import { journalsQuery } from '@/features/ledger/public/journals-query';
import { mapMasterRecords } from '@/features/ledger/public/master-records';
import { vouchersQuery } from '@/features/ledger/public/vouchers-query';
import { branchesQuery } from '@/features/organization/public/branches-query';
import { companyQuery } from '@/features/organization/public/company-query';
import { customersQuery } from '@/features/parties/public/customers-query';
import { suppliersQuery } from '@/features/parties/public/suppliers-query';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
export function useVouchersReportQuery() {
  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1, q2, q3, q4, q5, q6] = useSuspenseQueries({
    queries: [
      vouchersQuery(scope),
      companyQuery(scope),
      journalsQuery(scope),
      branchesQuery(scope),
      customersQuery(scope),
      suppliersQuery(scope),
      cashQuery(scope),
    ],
  });
  const state: VouchersReportReadModel = {
    vouchers: q0.data.items,
    parties: [...q4.data.items, ...q5.data.items],
    organization: q1.data,
    extras: {
      records: { cash: mapMasterRecords(q6.data.items) },
      operations: [],
      drafts: {},
      preferences: {},
    },
    entries: q2.data.items,
    branches: q3.data.items,
  };
  return {
    ...app,
    state,
    loading: false,
    error: '',
    revision: Math.max(
      books.scope.revision,
      q0.data.scope.revision,
      0,
      q2.data.scope.revision,
      q3.data.scope.revision,
      q4.data.scope.revision,
      q5.data.scope.revision,
      q6.data.scope.revision,
    ),
  };
}
