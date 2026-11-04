import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { validatePeriod } from '@/features/ledger/public/validate-period';
import { useOrganizationValidationData } from '@/features/settings/queries/useOrganizationValidationData';
import { saveOrganization } from '@/features/settings/services/settings-service';
export function useOrganization() {
  const loadValidationData = useOrganizationValidationData();
  return useCommandMutation('organization', saveOrganization, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'organization', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
  });
}
