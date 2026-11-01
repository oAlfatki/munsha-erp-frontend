import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useErpContext } from '@/core/hooks/useErpContext';
import { saveManualJournal } from '@/features/accounting/services/accounting-service';
import { validateJournal } from '@/features/accounting/validation/validate-journal';
import { validatePeriod } from '@/features/accounting/validation/validate-period';
import { validatePolicy } from '@/features/settings/validation/validate-policy';
export function useManualJournal() {
  const { state } = useErpContext();
  return useCommandMutation('manualJournal', saveManualJournal, (input) => {
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'manualJournal', input);
    validatePolicy(state, 'manualJournal', input);
    validateJournal(state, input);
  });
}
