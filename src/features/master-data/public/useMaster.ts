import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { validatePeriod } from '@/features/ledger/public/validate-period';
import { useMasterValidationData } from '@/features/master-data/queries/useMasterValidationData';
import { saveMaster } from '@/features/master-data/services/master-service';
export function useMaster() {
  const loadValidationData = useMasterValidationData();
  return useCommandMutation('master', saveMaster, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'master', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
  });
}
