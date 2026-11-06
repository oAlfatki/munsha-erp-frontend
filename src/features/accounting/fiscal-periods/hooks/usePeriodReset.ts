import { usePeriodResetValidationData } from '@/features/accounting/fiscal-periods/queries/usePeriodResetValidationData';
import { savePeriodReset } from '@/features/accounting/fiscal-periods/services/fiscal-periods-service';
import { validatePeriod } from '@/features/ledger/public';
import { useCommandMutation } from '@/shared/hooks/useCommandMutation';

export function usePeriodReset() {

  const loadValidationData = usePeriodResetValidationData();
  return useCommandMutation('periodReset', savePeriodReset, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'periodReset', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
  });
}
