





import { useCommandMutation } from "@/core/hooks/useCommandMutation";
import { validatePeriod } from "@/features/accounting/public/validate-period";
import { useCurrencyValidationData } from "@/features/settings/queries/useCurrencyValidationData";
import { saveCurrency } from "@/features/settings/services/settings-service";
export function useCurrency() {
  const loadValidationData=useCurrencyValidationData();
  return useCommandMutation('currency', saveCurrency, async (input) => {const state=await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'currency', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
  });
}
