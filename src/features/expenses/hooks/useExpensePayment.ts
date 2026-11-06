import { validateExpensePaymentSettingsPolicy } from '@/features/organization/public';

import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useExpensePaymentValidationData } from '@/features/expenses/queries/useExpensePaymentValidationData';
import { saveExpensePayment } from '@/features/expenses/services/expenses-service';
import { validatePeriod } from '@/features/ledger/public';
export function useExpensePayment() {
  const loadValidationData = useExpensePaymentValidationData();
  return useCommandMutation('expensePayment', saveExpensePayment, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'expensePayment', input);
    validateExpensePaymentSettingsPolicy(state, input);
  });
}
