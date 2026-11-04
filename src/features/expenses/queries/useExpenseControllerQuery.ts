import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import type { ExpenseControllerReadModel } from '@/features/expenses/types/read-models/ExpenseControllerReadModel';
import { acquisitionsQuery } from '@/features/ledger/public/acquisitions-query';
import { booksQuery } from '@/features/ledger/public/books-query';
import { cashQuery } from '@/features/ledger/public/cash-query';
import { currenciesQuery } from '@/features/ledger/public/currencies-query';
import { depreciationQuery } from '@/features/ledger/public/depreciation-query';
import { expenseDocumentsQuery } from '@/features/ledger/public/expense-documents-query';
import { mapExpenseReadModel } from '@/features/ledger/public/expense-read-model';
import { expenseTypesQuery } from '@/features/ledger/public/expense-types-query';
import { journalsQuery } from '@/features/ledger/public/journals-query';
import { mapMasterRecords } from '@/features/ledger/public/master-records';
import { branchesQuery } from '@/features/organization/public/branches-query';
import { companyQuery } from '@/features/organization/public/company-query';
import { systemQuery } from '@/features/organization/public/system-query';
import { advancesQuery } from '@/features/personnel/public/advances-query';
import { payrollQuery } from '@/features/personnel/public/payroll-query';
import { salaryPaymentsQuery } from '@/features/personnel/public/salary-payments-query';
import { stockCountsQuery } from '@/features/stock/public/stock-counts-query';
import { warehousesQuery } from '@/features/stock/public/warehouses-query';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
export function useExpenseControllerQuery() {
  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14] = useSuspenseQueries({
    queries: [
      companyQuery(scope),
      currenciesQuery(scope),
      journalsQuery(scope),
      systemQuery(scope),
      warehousesQuery(scope),
      branchesQuery(scope),
      expenseDocumentsQuery(scope),
      expenseTypesQuery(scope),
      cashQuery(scope),
      payrollQuery(scope),
      salaryPaymentsQuery(scope),
      advancesQuery(scope),
      acquisitionsQuery(scope),
      depreciationQuery(scope),
      stockCountsQuery(scope),
    ],
  });
  const expenseProjection = mapExpenseReadModel(q6.data.items, q6.data.scope);
  const state: ExpenseControllerReadModel = {
    organization: q0.data,
    currencies: q1.data.items,
    entries: q2.data.items,
    systemSettings: q3.data,
    extras: {
      records: {
        expenseTypes: mapMasterRecords(q7.data.items),
        cash: mapMasterRecords(q8.data.items),
      },
      operations: [
        ...q9.data.items,
        ...q10.data.items,
        ...q11.data.items,
        ...q12.data.items,
        ...q13.data.items,
        ...q14.data.items,
        ...(expenseProjection.extras?.operations || []),
      ],
      drafts: {},
      preferences: {
        defaultProfit: String(q3.data.inventory.profit),
        defaultDiscount: String(q3.data.inventory.discount),
        defaultPrice: q3.data.sales.defaultPrice,
      },
    },
    warehouses: q4.data.items,
    branches: q5.data.items,
    expenseDocuments: expenseProjection.expenseDocuments,
    expenses: expenseProjection.expenses,
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
      q9.data.scope.revision,
      q10.data.scope.revision,
      q11.data.scope.revision,
      q12.data.scope.revision,
      q13.data.scope.revision,
      q14.data.scope.revision,
    ),
  };
}
