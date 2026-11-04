





import { useCommandMutation } from "@/core/hooks/useCommandMutation";
import { usePeriodResetValidationData } from "@/features/accounting/queries/usePeriodResetValidationData";
import { savePeriodReset } from "@/features/accounting/services/accounting-service";
import { validatePeriod } from "@/features/accounting/public/validate-period";
export function usePeriodReset() {
  const loadValidationData=usePeriodResetValidationData();
  return useCommandMutation('periodReset', savePeriodReset, async (input) => {const state=await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'periodReset', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
  });
}
