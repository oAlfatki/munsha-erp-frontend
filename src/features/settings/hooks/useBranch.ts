import { validatePeriod } from '@/features/ledger/public';
import { useBranchValidationData } from '@/features/settings/queries/useBranchValidationData';
import { saveBranch } from '@/features/settings/services/settings-service';
import { useCommandMutation } from '@/shared/hooks/useCommandMutation';

export function useBranch() {

  const loadValidationData = useBranchValidationData();
  return useCommandMutation('branch', saveBranch, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'branch', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
  });
}
