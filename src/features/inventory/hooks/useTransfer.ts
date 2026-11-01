import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useErpContext } from '@/core/hooks/useErpContext';
import { validatePeriod } from '@/features/accounting/validation/validate-period';
import { saveTransfer } from '@/features/inventory/services/inventory-service';
import { validateInventoryCommand } from '@/features/inventory/validation/validate-inventory-command';
import { validatePolicy } from '@/features/settings/validation/validate-policy';
export function useTransfer() {
  const { state } = useErpContext();
  return useCommandMutation('transfer', saveTransfer, (input) => {
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'transfer', input);
    validatePolicy(state, 'transfer', input);
    validateInventoryCommand(state, 'transfer', input);
  });
}
