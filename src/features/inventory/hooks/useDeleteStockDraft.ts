





import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { validatePeriod } from "@/features/accounting/public/validate-period";
import { useDeleteStockDraftValidationData } from '@/features/inventory/queries/useDeleteStockDraftValidationData';
import { saveDeleteStockDraft } from '@/features/inventory/services/inventory-service';
import { validateInventoryCommand } from '@/features/inventory/validation/validate-inventory-command';
export function useDeleteStockDraft() {
  const loadValidationData=useDeleteStockDraftValidationData();
  return useCommandMutation('deleteStockDraft', saveDeleteStockDraft, async (input) => {const state=await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'deleteStockDraft', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
    validateInventoryCommand(state, 'deleteStockDraft', input);
  });
}
