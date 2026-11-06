import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { validatePeriod } from '@/features/ledger/public';
import { useImportMastersValidationData } from '@/features/settings/queries/useImportMastersValidationData';
import { saveImportMasters } from '@/features/settings/services/settings-service';
export function useImportMasters() {
  const loadValidationData = useImportMastersValidationData();
  return useCommandMutation('importMasters', saveImportMasters, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'importMasters', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
  });
}
