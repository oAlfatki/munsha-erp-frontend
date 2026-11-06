import { systemSettings } from '@/features/organization/services/system-settings';
import type { DeleteDraftSettingsPolicyContext } from '@/features/organization/types/read-models/DeleteDraftSettingsPolicyContext';

/** Exact original policy branches specialized for the fixed command; no policy values or rules changed. */

export function validateDeleteDraftSettingsPolicy(
  workspace: DeleteDraftSettingsPolicyContext,
  raw: unknown,
) {

  if (!raw || typeof raw !== 'object') throw Error('طلب غير صحيح');
  const p = raw as Record<string, unknown>,
    v = systemSettings(workspace);
  {
    const d = workspace.invoices.find((invoice) => invoice.id === p.id);
    if (d && !(d.kind === 'sale' ? v.sales.allowDraftDelete : v.purchases.allowDraftDelete))
      throw Error('حذف مسودات هذا النوع غير مسموح وفق الإعدادات');
  }
}
