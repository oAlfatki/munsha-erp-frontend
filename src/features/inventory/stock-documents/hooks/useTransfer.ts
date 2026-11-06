import { validateTransferSettingsPolicy } from '@/features/organization/public';

import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useTransferValidationData } from '@/features/inventory/stock-documents/queries/useTransferValidationData';
import { validatePeriod } from '@/features/ledger/public';
import { saveTransfer, validateInventoryCommand } from '@/features/stock/public';
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
