import { validateExpenseSaveSettingsPolicy } from '@/features/organization/public';

import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useExpenseSaveValidationData } from '@/features/expenses/queries/useExpenseSaveValidationData';
import { saveExpenseSave } from '@/features/expenses/services/expenses-service';
import { validatePeriod } from '@/features/ledger/public';
export function useExpenseSave() {
  const loadValidationData = useExpenseSaveValidationData();
  return useCommandMutation('expenseSave', saveExpenseSave, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'expenseSave', input);
    validateExpenseSaveSettingsPolicy(state, input);
  });
}
