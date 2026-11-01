import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useErpContext } from '@/core/hooks/useErpContext';
import { savePeriodActivate } from '@/features/accounting/services/accounting-service';
import { validatePeriod } from '@/features/accounting/validation/validate-period';
import { validatePolicy } from '@/features/settings/validation/validate-policy';
export function usePeriodActivate() {
  const { state } = useErpContext();
  return useCommandMutation('periodActivate', savePeriodActivate, (input) => {
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'periodActivate', input);
    validatePolicy(state, 'periodActivate', input);
  });
}
