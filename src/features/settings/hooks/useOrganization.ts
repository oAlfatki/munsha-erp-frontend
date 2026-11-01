import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useErpContext } from '@/core/hooks/useErpContext';
import { validatePeriod } from '@/features/accounting/validation/validate-period';
import { saveOrganization } from '@/features/settings/services/settings-service';
import { validatePolicy } from '@/features/settings/validation/validate-policy';
export function useOrganization() {
  const { state } = useErpContext();
  return useCommandMutation('organization', saveOrganization, (input) => {
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'organization', input);
    validatePolicy(state, 'organization', input);
  });
}
