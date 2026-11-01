import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useErpContext } from '@/core/hooks/useErpContext';
import { validatePeriod } from '@/features/accounting/validation/validate-period';
import { saveExpenseSave } from '@/features/expenses/services/expenses-service';
import { validatePolicy } from '@/features/settings/validation/validate-policy';
export function useExpenseSave() {
  const { state } = useErpContext();
  return useCommandMutation('expenseSave', saveExpenseSave, (input) => {
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'expenseSave', input);
    validatePolicy(state, 'expenseSave', input);
  });
}
