import { validateExpensePaymentSettingsPolicy } from '@/features/organization/public/expense-payment-policy';

import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useExpensePaymentValidationData } from '@/features/expenses/queries/useExpensePaymentValidationData';
import { saveExpensePayment } from '@/features/expenses/services/expenses-service';
import { validatePeriod } from '@/features/ledger/public/validate-period';
export function useExpensePayment() {
  const loadValidationData = useExpensePaymentValidationData();
  return useCommandMutation('expensePayment', saveExpensePayment, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'expensePayment', input);
    validateExpensePaymentSettingsPolicy(state, input);
  });
}
