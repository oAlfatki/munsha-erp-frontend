import { validateExpensePaymentSettingsPolicy } from "@/features/settings/public/expense-payment-policy";





import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { validatePeriod } from "@/features/accounting/public/validate-period";
import { useExpensePaymentValidationData } from '@/features/expenses/queries/useExpensePaymentValidationData';
import { saveExpensePayment } from '@/features/expenses/services/expenses-service';
export function useExpensePayment() {
  const loadValidationData=useExpensePaymentValidationData();
  return useCommandMutation('expensePayment', saveExpensePayment, async (input) => {const state=await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'expensePayment', input);
    validateExpensePaymentSettingsPolicy(state,input);
  });
}
