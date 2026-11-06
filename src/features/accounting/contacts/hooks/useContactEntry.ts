import { useContactEntryValidationData } from '@/features/accounting/contacts/queries/useContactEntryValidationData';
import { saveContactEntry } from '@/features/accounting/contacts/services/contacts-service';
import { validatePeriod } from '@/features/ledger/public';
import { useCommandMutation } from '@/shared/hooks/useCommandMutation';

export function useContactEntry() {

  const loadValidationData = useContactEntryValidationData();
  return useCommandMutation('contactEntry', saveContactEntry, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'contactEntry', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
  });
}
