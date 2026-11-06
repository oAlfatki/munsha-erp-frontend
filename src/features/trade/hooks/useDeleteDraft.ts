import { validateDeleteDraftSettingsPolicy } from '@/features/organization/public';

import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { validatePeriod } from '@/features/ledger/public';
import { useDeleteDraftValidationData } from '@/features/trade/queries/useDeleteDraftValidationData';
import { saveDeleteDraft } from '@/features/trade/services/trade-service';
export function useDeleteDraft() {
  const loadValidationData = useDeleteDraftValidationData();
  return useCommandMutation('deleteDraft', saveDeleteDraft, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'deleteDraft', input);
    validateDeleteDraftSettingsPolicy(state, input);
  });
}
