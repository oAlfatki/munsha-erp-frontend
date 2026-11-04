import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import type { StockAdjustmentsReportReadModel } from '@/features/inventory/types/read-models/StockAdjustmentsReportReadModel';
import { acquisitionsQuery } from '@/features/ledger/public/acquisitions-query';
import { assetsQuery } from '@/features/ledger/public/assets-query';
import { booksQuery } from '@/features/ledger/public/books-query';
import { depreciationQuery } from '@/features/ledger/public/depreciation-query';
import { expenseDocumentsQuery } from '@/features/ledger/public/expense-documents-query';
import { mapExpenseReadModel } from '@/features/ledger/public/expense-read-model';
import { mapMasterRecords } from '@/features/ledger/public/master-records';
import { branchesQuery } from '@/features/organization/public/branches-query';
import { companyQuery } from '@/features/organization/public/company-query';
import { customersQuery } from '@/features/parties/public/customers-query';
import { suppliersQuery } from '@/features/parties/public/suppliers-query';
import { advancesQuery } from '@/features/personnel/public/advances-query';
import { employeesQuery } from '@/features/personnel/public/employees-query';
import { payrollQuery } from '@/features/personnel/public/payroll-query';
import { salaryPaymentsQuery } from '@/features/personnel/public/salary-payments-query';
import { itemsQuery } from '@/features/stock/public/items-query';
import { stockCountsQuery } from '@/features/stock/public/stock-counts-query';
import { stockDocumentsQuery } from '@/features/stock/public/stock-documents-query';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
export function useStockAdjustmentsReportQuery() {
  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14] = useSuspenseQueries({
    queries: [
      employeesQuery(scope),
      itemsQuery(scope),
      stockDocumentsQuery(scope),
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
  const expenseProjection = mapExpenseReadModel(q14.data.items, q14.data.scope);
  const state: StockAdjustmentsReportReadModel = {
    parties: [...q5.data.items, ...q6.data.items],
    employees: q0.data.items,
    products: q1.data.items,
    stockDocuments: q2.data.items,
    extras: {
      records: { assets: mapMasterRecords(q7.data.items) },
      operations: [
        ...q8.data.items,
        ...q9.data.items,
        ...q10.data.items,
        ...q11.data.items,
        ...q12.data.items,
        ...q13.data.items,
        ...(expenseProjection.extras?.operations || []),
      ],
      drafts: {},
      preferences: {},
    },
    organization: q3.data,
    branches: q4.data.items,
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
      q2.data.scope.revision,
      0,
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
    ),
  };
}
