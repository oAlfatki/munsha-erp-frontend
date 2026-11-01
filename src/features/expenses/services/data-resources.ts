import { collection, records } from '@/core/query/resources';
import type { ErpReadModel } from '@/core/types/ErpReadModel';
import { fetchExpensesDocuments, fetchExpensesTypes } from '@/features/expenses/api/read-api';
import { mapExpenseReadModel } from '@/features/expenses/mapper/expense-read-model';
export const EXPENSE_TYPES_RESOURCE = collection(
  'expenses',
  'expenseTypes',
  fetchExpensesTypes,
  (items) => records('expenseTypes', items) as Partial<ErpReadModel>,
);
export const EXPENSE_DOCUMENTS_RESOURCE = collection(
  'expenses',
  'expenseDocuments',
  fetchExpensesDocuments,
  (items, scope) => mapExpenseReadModel(items, scope),
);
