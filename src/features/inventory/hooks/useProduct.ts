import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useErpContext } from '@/core/hooks/useErpContext';
import { validatePeriod } from '@/features/accounting/validation/validate-period';
import { saveProduct } from '@/features/inventory/services/inventory-service';
import { validateInventoryCommand } from '@/features/inventory/validation/validate-inventory-command';
import { validatePolicy } from '@/features/settings/validation/validate-policy';
export function useProduct() {
  const { state } = useErpContext();
  return useCommandMutation('product', saveProduct, (input) => {
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'product', input);
    validatePolicy(state, 'product', input);
    validateInventoryCommand(state, 'product', input);
  });
}
