import { useWarehouseValidationData } from '@/features/inventory/warehouses/queries/useWarehouseValidationData';
import { validatePeriod } from '@/features/ledger/public';
import { saveWarehouse, validateInventoryCommand } from '@/features/stock/public';
import { useCommandMutation } from '@/shared/hooks/useCommandMutation';

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
