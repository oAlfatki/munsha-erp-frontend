import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useErpContext } from '@/core/hooks/useErpContext';
import { saveVoucher } from '@/features/accounting/services/accounting-service';
import { validatePeriod } from '@/features/accounting/validation/validate-period';
import { validatePolicy } from '@/features/settings/validation/validate-policy';
export function useVoucher() {
  const { state } = useErpContext();
  return useCommandMutation('voucher', saveVoucher, (input) => {
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'voucher', input);
    validatePolicy(state, 'voucher', input);
  });
}
