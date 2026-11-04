import { systemSettings } from "@/features/settings/public/system-settings";
import type { ExpensePaymentSettingsPolicyContext } from "@/features/settings/types/read-models/ExpensePaymentSettingsPolicyContext";
/** Exact original policy branches specialized for the fixed command; no policy values or rules changed. */
export function validateExpensePaymentSettingsPolicy(workspace:ExpensePaymentSettingsPolicyContext,raw:unknown){
    if (!raw || typeof raw !== 'object')
        throw Error('طلب غير صحيح');
    const p = raw as Record<string, unknown>, v = systemSettings(workspace);
    if (v.expenses.requireVoucherNote &&
        !String(p.note || '').trim())
        throw Error('بيان سند القبض أو الصرف مطلوب');
}
