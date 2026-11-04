import { validateContactVoucherSettingsPolicy } from "@/features/settings/public/contact-voucher-policy";





import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useContactVoucherValidationData } from '@/features/accounting/queries/useContactVoucherValidationData';
import { saveContactVoucher } from '@/features/accounting/services/accounting-service';
import { validatePeriod } from "@/features/accounting/public/validate-period";
export function useContactVoucher() {
  const loadValidationData=useContactVoucherValidationData();
  return useCommandMutation('contactVoucher', saveContactVoucher, async (input) => {const state=await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'contactVoucher', input);
    validateContactVoucherSettingsPolicy(state,input);
  });
}
