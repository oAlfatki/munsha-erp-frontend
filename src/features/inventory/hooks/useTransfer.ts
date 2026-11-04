import { validateTransferSettingsPolicy } from "@/features/settings/public/transfer-policy";





import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { validatePeriod } from "@/features/accounting/public/validate-period";
import { useTransferValidationData } from '@/features/inventory/queries/useTransferValidationData';
import { saveTransfer } from '@/features/inventory/services/inventory-service';
import { validateInventoryCommand } from '@/features/inventory/validation/validate-inventory-command';
export function useTransfer() {
  const loadValidationData=useTransferValidationData();
  return useCommandMutation('transfer', saveTransfer, async (input) => {const state=await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'transfer', input);
    validateTransferSettingsPolicy(state,input);
    validateInventoryCommand(state, 'transfer', input);
  });
}
