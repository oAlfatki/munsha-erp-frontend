import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import type { AssetDepreciationReportReadModel } from '@/features/accounting/types/read-models/AssetDepreciationReportReadModel';
import { acquisitionsQuery } from '@/features/ledger/public/acquisitions-query';
import { assetsQuery } from '@/features/ledger/public/assets-query';
import { booksQuery } from '@/features/ledger/public/books-query';
import { depreciationQuery } from '@/features/ledger/public/depreciation-query';
import { expenseDocumentsQuery } from '@/features/ledger/public/expense-documents-query';
import { mapExpenseReadModel } from '@/features/ledger/public/expense-read-model';
import { mapMasterRecords } from '@/features/ledger/public/master-records';
import { branchesQuery } from '@/features/organization/public/branches-query';
import { companyQuery } from '@/features/organization/public/company-query';
import { advancesQuery } from '@/features/personnel/public/advances-query';
import { payrollQuery } from '@/features/personnel/public/payroll-query';
import { salaryPaymentsQuery } from '@/features/personnel/public/salary-payments-query';
import { stockCountsQuery } from '@/features/stock/public/stock-counts-query';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
export function useAssetDepreciationReportQuery() {
  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1, q2, q3, q4, q5, q6, q7, q8, q9] = useSuspenseQueries({
    queries: [
      companyQuery(scope),
      branchesQuery(scope),
      assetsQuery(scope),
      payrollQuery(scope),
      salaryPaymentsQuery(scope),
      advancesQuery(scope),
      acquisitionsQuery(scope),
      depreciationQuery(scope),
      stockCountsQuery(scope),
      expenseDocumentsQuery(scope),
    ],
  });
  const expenseProjection = mapExpenseReadModel(q9.data.items, q9.data.scope);
  const state: AssetDepreciationReportReadModel = {
    extras: {
      records: { assets: mapMasterRecords(q2.data.items) },
      operations: [
        ...q3.data.items,
        ...q4.data.items,
        ...q5.data.items,
        ...q6.data.items,
        ...q7.data.items,
        ...q8.data.items,
        ...(expenseProjection.extras?.operations || []),
      ],
      drafts: {},
      preferences: {},
    },
    organization: q0.data,
    branches: q1.data.items,
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
    ),
  };
}
