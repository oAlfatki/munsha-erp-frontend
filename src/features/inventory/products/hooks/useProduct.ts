import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useProductValidationData } from '@/features/inventory/products/queries/useProductValidationData';
import { validatePeriod } from '@/features/ledger/public';
import { saveProduct, validateInventoryCommand } from '@/features/stock/public';
export function useProduct() {
  const loadValidationData = useProductValidationData();
  return useCommandMutation('product', saveProduct, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'product', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
    validateInventoryCommand(state, 'product', input);
  });
}
