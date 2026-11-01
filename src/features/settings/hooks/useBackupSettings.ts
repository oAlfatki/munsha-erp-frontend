import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useErpContext } from '@/core/hooks/useErpContext';
import { validatePeriod } from '@/features/accounting/validation/validate-period';
import { saveBackupSettings } from '@/features/settings/services/settings-service';
import { validatePolicy } from '@/features/settings/validation/validate-policy';
export function useBackupSettings() {
  const { state } = useErpContext();
  return useCommandMutation('backupSettings', saveBackupSettings, (input) => {
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'backupSettings', input);
    validatePolicy(state, 'backupSettings', input);
  });
}
