import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useErpContext } from '@/core/hooks/useErpContext';
import { validatePeriod } from '@/features/accounting/validation/validate-period';
import { validatePolicy } from '@/features/settings/validation/validate-policy';
import { saveDeleteDraft } from '@/features/trade/services/trade-service';
export function useDeleteDraft() {
  const { state } = useErpContext();
  return useCommandMutation('deleteDraft', saveDeleteDraft, (input) => {
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'deleteDraft', input);
    validatePolicy(state, 'deleteDraft', input);
  });
}
