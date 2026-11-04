import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { usePriceListValidationData } from '@/features/inventory/queries/usePriceListValidationData';
import { validatePeriod } from '@/features/ledger/public/validate-period';
import { savePriceList } from '@/features/stock/public/inventory-service';
import { validateInventoryCommand } from '@/features/stock/public/validate-inventory-command';
export function usePriceList() {
  const loadValidationData = usePriceListValidationData();
  return useCommandMutation('priceList', savePriceList, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'priceList', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
    validateInventoryCommand(state, 'priceList', input);
  });
}
