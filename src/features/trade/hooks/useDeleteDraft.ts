import { validateDeleteDraftSettingsPolicy } from '@/features/organization/public';

import { validatePeriod } from '@/features/ledger/public';
import { useDeleteDraftValidationData } from '@/features/trade/queries/useDeleteDraftValidationData';
import { saveDeleteDraft } from '@/features/trade/services/trade-service';
import { useCommandMutation } from '@/shared/hooks/useCommandMutation';

export function useDeleteDraft() {

  const loadValidationData = useDeleteDraftValidationData();
  return useCommandMutation('deleteDraft', saveDeleteDraft, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'deleteDraft', input);
    validateDeleteDraftSettingsPolicy(state, input);
  });
}
