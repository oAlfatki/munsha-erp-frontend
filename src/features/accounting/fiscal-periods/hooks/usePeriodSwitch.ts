import { usePeriodSwitchValidationData } from '@/features/accounting/fiscal-periods/queries/usePeriodSwitchValidationData';
import { savePeriodSwitch } from '@/features/accounting/fiscal-periods/services/fiscal-periods-service';
import { validatePeriod } from '@/features/ledger/public';
import { useCommandMutation } from '@/shared/hooks/useCommandMutation';

export function usePeriodSwitch() {

  const loadValidationData = usePeriodSwitchValidationData();
  return useCommandMutation('periodSwitch', savePeriodSwitch, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'periodSwitch', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
  });
}
