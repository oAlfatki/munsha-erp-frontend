import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useErpContext } from '@/core/hooks/useErpContext';
import { saveOperation } from '@/features/accounting/services/accounting-service';
import { validatePeriod } from '@/features/accounting/validation/validate-period';
import { validatePolicy } from '@/features/settings/validation/validate-policy';
export function useOperation() {
  const { state } = useErpContext();
  return useCommandMutation('operation', saveOperation, (input) => {
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'operation', input);
    validatePolicy(state, 'operation', input);
  });
}
