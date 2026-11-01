import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useErpContext } from '@/core/hooks/useErpContext';
import { validatePeriod } from '@/features/accounting/validation/validate-period';
import { validateParty } from '@/features/parties/validation/validate-party';
import { validatePolicy } from '@/features/settings/validation/validate-policy';
import { saveSupplier } from '@/features/suppliers/services/suppliers-service';
export function useSaveSupplier() {
  const { state } = useErpContext();
  return useCommandMutation('party', saveSupplier, (input) => {
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'party', input);
    validatePolicy(state, 'party', input);
    validateParty(state, input);
  });
}
