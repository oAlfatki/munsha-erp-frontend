import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useDeleteStockDraftValidationData } from '@/features/inventory/queries/useDeleteStockDraftValidationData';
import { validatePeriod } from '@/features/ledger/public/validate-period';
import { saveDeleteStockDraft } from '@/features/stock/public/inventory-service';
import { validateInventoryCommand } from '@/features/stock/public/validate-inventory-command';
export function useDeleteStockDraft() {
  const loadValidationData = useDeleteStockDraftValidationData();
  return useCommandMutation('deleteStockDraft', saveDeleteStockDraft, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'deleteStockDraft', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
    validateInventoryCommand(state, 'deleteStockDraft', input);
  });
}
