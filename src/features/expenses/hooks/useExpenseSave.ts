import { validateExpenseSaveSettingsPolicy } from "@/features/settings/public/expense-save-policy";





import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { validatePeriod } from "@/features/accounting/public/validate-period";
import { useExpenseSaveValidationData } from '@/features/expenses/queries/useExpenseSaveValidationData';
import { saveExpenseSave } from '@/features/expenses/services/expenses-service';
export function useExpenseSave() {
  const loadValidationData=useExpenseSaveValidationData();
  return useCommandMutation('expenseSave', saveExpenseSave, async (input) => {const state=await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'expenseSave', input);
    validateExpenseSaveSettingsPolicy(state,input);
  });
}
