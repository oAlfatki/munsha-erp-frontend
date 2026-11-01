import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useErpContext } from '@/core/hooks/useErpContext';
import { validatePeriod } from '@/features/accounting/validation/validate-period';
import { validatePolicy } from '@/features/settings/validation/validate-policy';
import { saveReturn } from '@/features/trade/services/trade-service';
export function useReturn() {
  const { state } = useErpContext();
  return useCommandMutation('return', saveReturn, (input) => {
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'return', input);
    validatePolicy(state, 'return', input);
  });
}
