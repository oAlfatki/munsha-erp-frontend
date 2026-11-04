import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { usePeriodCreateValidationData } from '@/features/accounting/queries/usePeriodCreateValidationData';
import { savePeriodCreate } from '@/features/accounting/services/accounting-service';
import { validatePeriod } from '@/features/ledger/public/validate-period';
export function usePeriodCreate() {
  const loadValidationData = usePeriodCreateValidationData();
  return useCommandMutation('periodCreate', savePeriodCreate, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'periodCreate', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
  });
}
