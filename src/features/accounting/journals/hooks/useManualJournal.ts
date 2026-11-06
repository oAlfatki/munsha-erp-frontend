import { useManualJournalValidationData } from '@/features/accounting/journals/queries/useManualJournalValidationData';
import { saveManualJournal } from '@/features/accounting/journals/services/journals-service';
import { validateJournal } from '@/features/accounting/overview/validations/validate-journal';
import { validatePeriod } from '@/features/ledger/public';
import { useCommandMutation } from '@/shared/hooks/useCommandMutation';

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
