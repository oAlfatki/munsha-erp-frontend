import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useErpContext } from '@/core/hooks/useErpContext';
import { savePeriodReset } from '@/features/accounting/services/accounting-service';
import { validatePeriod } from '@/features/accounting/validation/validate-period';
import { validatePolicy } from '@/features/settings/validation/validate-policy';
export function usePeriodReset() {
  const { state } = useErpContext();
  return useCommandMutation('periodReset', savePeriodReset, (input) => {
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'periodReset', input);
    validatePolicy(state, 'periodReset', input);
  });
}
