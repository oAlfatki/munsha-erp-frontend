import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useErpContext } from '@/core/hooks/useErpContext';
import { saveMaster } from '@/features/accounting/services/accounting-service';
import { validatePeriod } from '@/features/accounting/validation/validate-period';
import { validatePolicy } from '@/features/settings/validation/validate-policy';
export function useMaster() {
  const { state } = useErpContext();
  return useCommandMutation('master', saveMaster, (input) => {
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'master', input);
    validatePolicy(state, 'master', input);
  });
}
