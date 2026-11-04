import { systemSettings } from '@/features/organization/public/system-settings';
import type { VoucherSettingsPolicyContext } from '@/features/organization/public/types/read-models/VoucherSettingsPolicyContext';
/** Exact original policy branches specialized for the fixed command; no policy values or rules changed. */
export function validateVoucherSettingsPolicy(
  workspace: VoucherSettingsPolicyContext,
  raw: unknown,
) {
  if (!raw || typeof raw !== 'object') throw Error('طلب غير صحيح');
  const p = raw as Record<string, unknown>,
    v = systemSettings(workspace);
  if (v.expenses.requireVoucherNote && !String(p.note || '').trim())
    throw Error('بيان سند القبض أو الصرف مطلوب');
}
