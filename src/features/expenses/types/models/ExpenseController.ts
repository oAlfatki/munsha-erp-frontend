import type { useExpenseController } from '@/features/expenses/hooks/useExpenseController';
export type ExpenseController = NonNullable<ReturnType<typeof useExpenseController>>;
