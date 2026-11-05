import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { usePeriodCreateValidationData } from '@/features/accounting/fiscal-periods/queries/usePeriodCreateValidationData';
import { savePeriodCreate } from '@/features/accounting/fiscal-periods/services/fiscal-periods-service';
import { validatePeriod } from '@/features/ledger/public';
export function usePeriodCreate() {
  const loadValidationData = usePeriodCreateValidationData();
  return useCommandMutation('periodCreate', savePeriodCreate, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'periodCreate', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
  });
}
