import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useErpContext } from '@/core/hooks/useErpContext';
import { validatePeriod } from '@/features/accounting/validation/validate-period';
import { savePriceList } from '@/features/inventory/services/inventory-service';
import { validateInventoryCommand } from '@/features/inventory/validation/validate-inventory-command';
import { validatePolicy } from '@/features/settings/validation/validate-policy';
export function usePriceList() {
  const { state } = useErpContext();
  return useCommandMutation('priceList', savePriceList, (input) => {
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'priceList', input);
    validatePolicy(state, 'priceList', input);
    validateInventoryCommand(state, 'priceList', input);
  });
}
