import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useErpContext } from '@/core/hooks/useErpContext';
import { validatePeriod } from '@/features/accounting/validation/validate-period';
import { validatePolicy } from '@/features/settings/validation/validate-policy';
import { savePartialReturn } from '@/features/trade/services/trade-service';
export function usePartialReturn() {
  const { state } = useErpContext();
  return useCommandMutation('partialReturn', savePartialReturn, (input) => {
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'partialReturn', input);
    validatePolicy(state, 'partialReturn', input);
  });
}
