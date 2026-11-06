import { systemSettings } from '@/features/organization/services/system-settings';
import type { TransferSettingsPolicyContext } from '@/features/organization/types/read-models/TransferSettingsPolicyContext';
/** Exact original policy branches specialized for the fixed command; no policy values or rules changed. */
export function validateTransferSettingsPolicy(
  workspace: TransferSettingsPolicyContext,
  raw: unknown,
) {
  if (!raw || typeof raw !== 'object') throw Error('طلب غير صحيح');
  const p = raw as Record<string, unknown>,
    v = systemSettings(workspace);
  {
    if (!v.inventory.allowTransfer) throw Error('التحويل المخزني غير مفعّل');
    const a = workspace.warehouses.find((warehouse) => warehouse.id === (p.from || p.warehouseId)),
      b = workspace.warehouses.find((warehouse) => warehouse.id === (p.to || p.toWarehouseId));
    if (a && b && a.branchId !== b.branchId && !v.inventory.allowCrossBranchTransfer)
      throw Error('التحويل بين الفروع غير مسموح');
  }
}
