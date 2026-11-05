import { validateContactVoucherSettingsPolicy } from '@/features/organization/public';

import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useContactVoucherValidationData } from '@/features/accounting/contacts/queries/useContactVoucherValidationData';
import { saveContactVoucher } from '@/features/accounting/contacts/services/contacts-service';
import { validatePeriod } from '@/features/ledger/public';
export function useContactVoucher() {
  const loadValidationData = useContactVoucherValidationData();
  return useCommandMutation('contactVoucher', saveContactVoucher, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'contactVoucher', input);
    validateContactVoucherSettingsPolicy(state, input);
  });
}
