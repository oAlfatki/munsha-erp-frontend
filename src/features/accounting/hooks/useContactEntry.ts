import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useErpContext } from '@/core/hooks/useErpContext';
import { saveContactEntry } from '@/features/accounting/services/accounting-service';
import { validatePeriod } from '@/features/accounting/validation/validate-period';
import { validatePolicy } from '@/features/settings/validation/validate-policy';
export function useContactEntry() {
  const { state } = useErpContext();
  return useCommandMutation('contactEntry', saveContactEntry, (input) => {
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'contactEntry', input);
    validatePolicy(state, 'contactEntry', input);
  });
}
