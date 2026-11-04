





import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { validatePeriod } from "@/features/accounting/public/validate-period";
import { useProductValidationData } from '@/features/inventory/queries/useProductValidationData';
import { saveProduct } from '@/features/inventory/services/inventory-service';
import { validateInventoryCommand } from '@/features/inventory/validation/validate-inventory-command';
export function useProduct() {
  const loadValidationData=useProductValidationData();
  return useCommandMutation('product', saveProduct, async (input) => {const state=await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'product', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
    validateInventoryCommand(state, 'product', input);
  });
}
