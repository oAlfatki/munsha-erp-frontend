import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useErpContext } from '@/core/hooks/useErpContext';
import { validatePeriod } from '@/features/accounting/validation/validate-period';
import { saveCurrency } from '@/features/settings/services/settings-service';
import { validatePolicy } from '@/features/settings/validation/validate-policy';
export function useCurrency() {
  const { state } = useErpContext();
  return useCommandMutation('currency', saveCurrency, (input) => {
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'currency', input);
    validatePolicy(state, 'currency', input);
  });
}
