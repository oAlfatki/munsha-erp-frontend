import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useErpContext } from '@/core/hooks/useErpContext';
import { validatePeriod } from '@/features/accounting/validation/validate-period';
import { saveBranch } from '@/features/settings/services/settings-service';
import { validatePolicy } from '@/features/settings/validation/validate-policy';
export function useBranch() {
  const { state } = useErpContext();
  return useCommandMutation('branch', saveBranch, (input) => {
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'branch', input);
    validatePolicy(state, 'branch', input);
  });
}
