





import { useCommandMutation } from "@/core/hooks/useCommandMutation";
import { usePeriodActivateValidationData } from "@/features/accounting/queries/usePeriodActivateValidationData";
import { savePeriodActivate } from "@/features/accounting/services/accounting-service";
import { validatePeriod } from "@/features/accounting/public/validate-period";
export function usePeriodActivate() {
  const loadValidationData=usePeriodActivateValidationData();
  return useCommandMutation('periodActivate', savePeriodActivate, async (input) => {const state=await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'periodActivate', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
  });
}
