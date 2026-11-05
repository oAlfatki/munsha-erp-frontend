import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import type { PayrollReportReadModel } from '@/features/employees/types/read-models/PayrollReportReadModel';
import {
  acquisitionsQuery,
  assetsQuery,
  booksQuery,
  depreciationQuery,
  expenseDocumentsQuery,
  mapExpenseReadModel,
  mapMasterRecords,
} from '@/features/ledger/public';
import { branchesQuery, companyQuery } from '@/features/organization/public';
import { customersQuery, suppliersQuery } from '@/features/parties/public';
import {
  advancesQuery,
  employeesQuery,
  payrollQuery,
  salaryPaymentsQuery,
} from '@/features/personnel/public';
import { itemsQuery, stockCountsQuery } from '@/features/stock/public';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
export function usePayrollReportQuery() {
  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13] = useSuspenseQueries({
    queries: [
      employeesQuery(scope),
      itemsQuery(scope),
      companyQuery(scope),
      branchesQuery(scope),
      customersQuery(scope),
      suppliersQuery(scope),
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
  const expenseProjection = mapExpenseReadModel(q13.data.items, q13.data.scope);
  const state: PayrollReportReadModel = {
    parties: [...q4.data.items, ...q5.data.items],
    employees: q0.data.items,
    products: q1.data.items,
    extras: {
      records: { assets: mapMasterRecords(q6.data.items) },
      operations: [
        ...q7.data.items,
        ...q8.data.items,
        ...q9.data.items,
        ...q10.data.items,
        ...q11.data.items,
        ...q12.data.items,
        ...(expenseProjection.extras?.operations || []),
      ],
      drafts: {},
      preferences: {},
    },
    organization: q2.data,
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
      q1.data.scope.revision,
      0,
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
    ),
  };
}
