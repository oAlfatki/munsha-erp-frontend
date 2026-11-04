





import { useCommandMutation } from "@/core/hooks/useCommandMutation";
import { usePeriodSwitchValidationData } from "@/features/accounting/queries/usePeriodSwitchValidationData";
import { savePeriodSwitch } from "@/features/accounting/services/accounting-service";
import { validatePeriod } from "@/features/accounting/public/validate-period";
export function usePeriodSwitch() {
  const loadValidationData=usePeriodSwitchValidationData();
  return useCommandMutation('periodSwitch', savePeriodSwitch, async (input) => {const state=await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'periodSwitch', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
  });
}
