import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useErpContext } from '@/core/hooks/useErpContext';
import { validatePeriod } from '@/features/accounting/validation/validate-period';
import { saveSystemSettings } from '@/features/settings/services/settings-service';
import { validatePolicy } from '@/features/settings/validation/validate-policy';
export function useSystemSettings() {
  const { state } = useErpContext();
  return useCommandMutation('systemSettings', saveSystemSettings, (input) => {
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'systemSettings', input);
    validatePolicy(state, 'systemSettings', input);
  });
}
