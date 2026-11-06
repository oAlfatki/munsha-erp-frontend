import { mapCustomerInput } from '@/features/customers/mappers/customers-mapper';

import { useSaveCustomerValidationData } from '@/features/customers/queries/useSaveCustomerValidationData';
import { saveCustomer } from '@/features/customers/services/customers-service';
import { validatePeriod } from '@/features/ledger/public';
import { validateParty } from '@/features/parties/public';
import { useCommandMutation } from '@/shared/hooks/useCommandMutation';

export function useSaveCustomer() {

  const loadValidationData = useSaveCustomerValidationData();
  return useCommandMutation('party', saveCustomer, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'party', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
    validateParty(state, mapCustomerInput(input));
  });
}
