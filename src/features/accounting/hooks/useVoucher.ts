import { validateVoucherSettingsPolicy } from "@/features/settings/public/voucher-policy";





import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useVoucherValidationData } from '@/features/accounting/queries/useVoucherValidationData';
import { saveVoucher } from '@/features/accounting/services/accounting-service';
import { validatePeriod } from "@/features/accounting/public/validate-period";
export function useVoucher() {
  const loadValidationData=useVoucherValidationData();
  return useCommandMutation('voucher', saveVoucher, async (input) => {const state=await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'voucher', input);
    validateVoucherSettingsPolicy(state,input);
  });
}
