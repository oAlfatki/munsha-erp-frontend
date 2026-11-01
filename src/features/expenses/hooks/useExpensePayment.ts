import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useErpContext } from '@/core/hooks/useErpContext';
import { validatePeriod } from '@/features/accounting/validation/validate-period';
import { saveExpensePayment } from '@/features/expenses/services/expenses-service';
import { validatePolicy } from '@/features/settings/validation/validate-policy';
export function useExpensePayment() {
  const { state } = useErpContext();
  return useCommandMutation('expensePayment', saveExpensePayment, (input) => {
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'expensePayment', input);
    validatePolicy(state, 'expensePayment', input);
  });
}
