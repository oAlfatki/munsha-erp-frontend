import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useErpContext } from '@/core/hooks/useErpContext';
import { validatePeriod } from '@/features/accounting/validation/validate-period';
import { saveExpenseConsume } from '@/features/expenses/services/expenses-service';
import { validatePolicy } from '@/features/settings/validation/validate-policy';
export function useExpenseConsume() {
  const { state } = useErpContext();
  return useCommandMutation('expenseConsume', saveExpenseConsume, (input) => {
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'expenseConsume', input);
    validatePolicy(state, 'expenseConsume', input);
  });
}
