import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useWarehouseValidationData } from '@/features/inventory/queries/useWarehouseValidationData';
import { validatePeriod } from '@/features/ledger/public/validate-period';
import { saveWarehouse } from '@/features/stock/public/inventory-service';
import { validateInventoryCommand } from '@/features/stock/public/validate-inventory-command';
export function useWarehouse() {
  const loadValidationData = useWarehouseValidationData();
  return useCommandMutation('warehouse', saveWarehouse, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'warehouse', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
    validateInventoryCommand(state, 'warehouse', input);
  });
}
