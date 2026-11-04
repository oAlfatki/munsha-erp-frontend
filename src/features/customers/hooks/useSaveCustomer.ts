
import { mapCustomerInput } from '@/features/customers/mapper/customers-mapper';





import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { validatePeriod } from "@/features/accounting/public/validate-period";
import { useSaveCustomerValidationData } from '@/features/customers/queries/useSaveCustomerValidationData';
import { saveCustomer } from '@/features/customers/services/customers-service';
import { validateParty } from "@/features/parties/public/validate-party";
export function useSaveCustomer() {
  const loadValidationData=useSaveCustomerValidationData();
  return useCommandMutation('party', saveCustomer, async (input) => {const state=await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'party', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
    validateParty(state, mapCustomerInput(input));
  });
}
