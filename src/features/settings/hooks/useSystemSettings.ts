import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { validatePeriod } from '@/features/ledger/public';
import { useSystemSettingsValidationData } from '@/features/settings/queries/useSystemSettingsValidationData';
import { saveSystemSettings } from '@/features/settings/services/settings-service';
export function useSystemSettings() {
  const loadValidationData = useSystemSettingsValidationData();
  return useCommandMutation('systemSettings', saveSystemSettings, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'systemSettings', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
  });
}
