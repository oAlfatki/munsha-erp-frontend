import { validateTransferSettingsPolicy } from '@/features/organization/public/transfer-policy';

import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useTransferValidationData } from '@/features/inventory/queries/useTransferValidationData';
import { validatePeriod } from '@/features/ledger/public/validate-period';
import { saveTransfer } from '@/features/stock/public/inventory-service';
import { validateInventoryCommand } from '@/features/stock/public/validate-inventory-command';
export function useTransfer() {
  const loadValidationData = useTransferValidationData();
  return useCommandMutation('transfer', saveTransfer, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'transfer', input);
    validateTransferSettingsPolicy(state, input);
    validateInventoryCommand(state, 'transfer', input);
  });
}
