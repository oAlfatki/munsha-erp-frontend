import { ExpenseEditor } from '@/features/expenses/components/ExpenseEditor';
import { ExpenseList } from '@/features/expenses/components/ExpenseList';
import { ExpenseReport } from '@/features/expenses/components/ExpenseReport';
import { useExpenseController } from '@/features/expenses/hooks/useExpenseController';
import type { ExpensesProps } from '@/features/expenses/types/props/ExpensesProps';

/** Feature-local composition: add/edit, list and reporting each have a concrete implementation file. */

export function Expenses({ mode = 'list' }: ExpensesProps) {

  const controller = useExpenseController(mode);
  if (!controller) return null;
  if (controller.edit) return <ExpenseEditor controller={controller} />;
  return mode === 'report' ? (
    <ExpenseReport controller={controller} />
  ) : (
    <ExpenseList controller={controller} />
  );
}
