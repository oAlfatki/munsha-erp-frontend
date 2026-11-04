import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useManualJournalValidationData } from '@/features/accounting/queries/useManualJournalValidationData';
import { saveManualJournal } from '@/features/accounting/services/accounting-service';
import { validateJournal } from '@/features/accounting/validation/validate-journal';
import { validatePeriod } from '@/features/ledger/public/validate-period';
export function useManualJournal() {
  const loadValidationData = useManualJournalValidationData();
  return useCommandMutation('manualJournal', saveManualJournal, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'manualJournal', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
    validateJournal(state, input);
  });
}
