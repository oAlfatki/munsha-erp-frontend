import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useErpContext } from '@/core/hooks/useErpContext';
import { validatePeriod } from '@/features/accounting/validation/validate-period';
import { saveStockDocument } from '@/features/inventory/services/inventory-service';
import { validateInventoryCommand } from '@/features/inventory/validation/validate-inventory-command';
import { validatePolicy } from '@/features/settings/validation/validate-policy';
export function useStockDocument() {
  const { state } = useErpContext();
  return useCommandMutation('stockDocument', saveStockDocument, (input) => {
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'stockDocument', input);
    validatePolicy(state, 'stockDocument', input);
    validateInventoryCommand(state, 'stockDocument', input);
  });
}
