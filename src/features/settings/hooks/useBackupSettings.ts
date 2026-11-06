import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { validatePeriod } from '@/features/ledger/public';
import { useBackupSettingsValidationData } from '@/features/settings/queries/useBackupSettingsValidationData';
import { saveBackupSettings } from '@/features/settings/services/settings-service';
export function useBackupSettings() {
  const loadValidationData = useBackupSettingsValidationData();
  return useCommandMutation('backupSettings', saveBackupSettings, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'backupSettings', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
  });
}
