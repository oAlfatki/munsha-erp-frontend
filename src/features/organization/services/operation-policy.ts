import { systemSettings } from '@/features/organization/services/system-settings';
import type { OperationSettingsPolicyContext } from '@/features/organization/types/read-models/OperationSettingsPolicyContext';

/** Exact original policy branches specialized for the fixed command; no policy values or rules changed. */

export function validateOperationSettingsPolicy(
  workspace: OperationSettingsPolicyContext,
  raw: unknown,
) {

  if (!raw || typeof raw !== 'object') throw Error('طلب غير صحيح');
  const p = raw as Record<string, unknown>,
    v = systemSettings(workspace);
  if (p.kind === 'adjustment') {
    if (!v.inventory.allowAdjustment) throw Error('تسويات المخزون غير مسموحة');
    if (v.inventory.requireAdjustmentReason && !String(p.note || '').trim())
      throw Error('سبب تسوية المخزون مطلوب');
  }
}
