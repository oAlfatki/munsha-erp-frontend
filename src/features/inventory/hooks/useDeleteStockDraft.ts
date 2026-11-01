import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useErpContext } from '@/core/hooks/useErpContext';
import { validatePeriod } from '@/features/accounting/validation/validate-period';
import { saveDeleteStockDraft } from '@/features/inventory/services/inventory-service';
import { validateInventoryCommand } from '@/features/inventory/validation/validate-inventory-command';
import { validatePolicy } from '@/features/settings/validation/validate-policy';
export function useDeleteStockDraft() {
  const { state } = useErpContext();
  return useCommandMutation('deleteStockDraft', saveDeleteStockDraft, (input) => {
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'deleteStockDraft', input);
    validatePolicy(state, 'deleteStockDraft', input);
    validateInventoryCommand(state, 'deleteStockDraft', input);
  });
}
