import { systemSettings } from "@/features/settings/public/system-settings";
import type { StockDocumentSettingsPolicyContext } from "@/features/settings/types/read-models/StockDocumentSettingsPolicyContext";
/** Exact original policy branches specialized for the fixed command; no policy values or rules changed. */
export function validateStockDocumentSettingsPolicy(workspace:StockDocumentSettingsPolicyContext,raw:unknown){
    if (!raw || typeof raw !== 'object')
        throw Error('طلب غير صحيح');
    const p = raw as Record<string, unknown>, v = systemSettings(workspace);
    const isTransfer = (p.kind === 'transfer' && p.status === 'final');
    if (isTransfer) {
        if (!v.inventory.allowTransfer)
            throw Error('التحويل المخزني غير مفعّل');
        const a = workspace.warehouses.find((warehouse) => warehouse.id === (p.from || p.warehouseId)), b = workspace.warehouses.find((warehouse) => warehouse.id === (p.to || p.toWarehouseId));
        if (a && b && a.branchId !== b.branchId && !v.inventory.allowCrossBranchTransfer)
            throw Error('التحويل بين الفروع غير مسموح');
    }
    if ((p.kind === 'adjustment' && p.status === 'final') ||
        (false)) {
        if (!v.inventory.allowAdjustment)
            throw Error('تسويات المخزون غير مسموحة');
        if (v.inventory.requireAdjustmentReason && !String(p.note || '').trim())
            throw Error('سبب تسوية المخزون مطلوب');
    }
}
