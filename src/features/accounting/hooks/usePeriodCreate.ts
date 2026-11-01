import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useErpContext } from '@/core/hooks/useErpContext';
import { savePeriodCreate } from '@/features/accounting/services/accounting-service';
import { validatePeriod } from '@/features/accounting/validation/validate-period';
import { validatePolicy } from '@/features/settings/validation/validate-policy';
export function usePeriodCreate() {
  const { state } = useErpContext();
  return useCommandMutation('periodCreate', savePeriodCreate, (input) => {
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'periodCreate', input);
    validatePolicy(state, 'periodCreate', input);
  });
}
