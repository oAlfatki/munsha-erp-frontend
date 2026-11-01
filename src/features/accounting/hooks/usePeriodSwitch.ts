import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useErpContext } from '@/core/hooks/useErpContext';
import { savePeriodSwitch } from '@/features/accounting/services/accounting-service';
import { validatePeriod } from '@/features/accounting/validation/validate-period';
import { validatePolicy } from '@/features/settings/validation/validate-policy';
export function usePeriodSwitch() {
  const { state } = useErpContext();
  return useCommandMutation('periodSwitch', savePeriodSwitch, (input) => {
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'periodSwitch', input);
    validatePolicy(state, 'periodSwitch', input);
  });
}
