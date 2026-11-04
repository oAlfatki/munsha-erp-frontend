import { systemSettings } from "@/features/settings/public/system-settings";
import type { InvoiceSettingsPolicyContext } from "@/features/settings/types/read-models/InvoiceSettingsPolicyContext";
/** Exact original policy branches specialized for the fixed command; no policy values or rules changed. */
export function validateInvoiceSettingsPolicy(workspace:InvoiceSettingsPolicyContext,raw:unknown){
    if (!raw || typeof raw !== 'object')
        throw Error('طلب غير صحيح');
    const p = raw as Record<string, unknown>, v = systemSettings(workspace);
    if (p.status === 'final') {
        if (p.payment !== 'cash' &&
            !(p.kind === 'sale' ? v.sales.allowCredit : v.purchases.allowCredit))
            throw Error('العمليات الآجلة غير مسموحة وفق الإعدادات');
        if (!v.accounting.multiCurrency && p.currency !== workspace.organization.currency)
            throw Error('تعدد العملات غير مفعّل');
    }
}
