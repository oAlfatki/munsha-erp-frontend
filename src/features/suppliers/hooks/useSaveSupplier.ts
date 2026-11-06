import { mapSupplierInput } from '@/features/suppliers/mappers/suppliers-mapper';

import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { validatePeriod } from '@/features/ledger/public';
import { validateParty } from '@/features/parties/public';
import { useSaveSupplierValidationData } from '@/features/suppliers/queries/useSaveSupplierValidationData';
import { saveSupplier } from '@/features/suppliers/services/suppliers-service';
export function useSaveSupplier() {
  const loadValidationData = useSaveSupplierValidationData();
  return useCommandMutation('party', saveSupplier, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'party', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
    validateParty(state, mapSupplierInput(input));
  });
}
