





import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useMasterValidationData } from '@/features/accounting/queries/useMasterValidationData';
import { saveMaster } from '@/features/accounting/services/accounting-service';
import { validatePeriod } from "@/features/accounting/public/validate-period";
export function useMaster() {
  const loadValidationData=useMasterValidationData();
  return useCommandMutation('master', saveMaster, async (input) => {const state=await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'master', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
  });
}
