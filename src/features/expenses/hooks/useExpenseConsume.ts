import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useExpenseConsumeValidationData } from '@/features/expenses/queries/useExpenseConsumeValidationData';
import { saveExpenseConsume } from '@/features/expenses/services/expenses-service';
import { validatePeriod } from '@/features/ledger/public';
export function useExpenseConsume() {
  const loadValidationData = useExpenseConsumeValidationData();
  return useCommandMutation('expenseConsume', saveExpenseConsume, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'expenseConsume', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
  });
}
