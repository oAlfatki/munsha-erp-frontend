import { validateVoucherSettingsPolicy } from '@/features/organization/public';

import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useVoucherValidationData } from '@/features/accounting/vouchers/queries/useVoucherValidationData';
import { saveVoucher } from '@/features/accounting/vouchers/services/vouchers-service';
import { validatePeriod } from '@/features/ledger/public';
export function useVoucher() {
  const loadValidationData = useVoucherValidationData();
  return useCommandMutation('voucher', saveVoucher, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'voucher', input);
    validateVoucherSettingsPolicy(state, input);
  });
}
