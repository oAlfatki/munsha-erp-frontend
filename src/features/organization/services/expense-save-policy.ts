import { systemSettings } from '@/features/organization/services/system-settings';
import type { ExpenseSaveSettingsPolicyContext } from '@/features/organization/types/read-models/ExpenseSaveSettingsPolicyContext';

/** Exact original policy branches specialized for the fixed command; no policy values or rules changed. */

export function validateExpenseSaveSettingsPolicy(
  workspace: ExpenseSaveSettingsPolicyContext,
  raw: unknown,
) {

  if (!raw || typeof raw !== 'object') throw Error('طلب غير صحيح');
  const p = raw as Record<string, unknown>,
    v = systemSettings(workspace);
  {
    const old = workspace.expenseDocuments?.find((d) => d.id === p.id);
    if (
      !v.accounting.multiCurrency &&
      p.currency &&
      p.currency !== workspace.organization.currency &&
      old?.currency !== p.currency
    )
      throw Error('تعدد العملات غير مفعّل');
    if (
      v.expenses.maxExpense &&
      (!old || old.amount !== Number(p.amount) * Number(p.rate || 1)) &&
      Number(p.amount) * Number(p.rate || 1) > v.expenses.maxExpense
    )
      throw Error('قيمة المصروف تتجاوز الحد المعتمد في الإعدادات');
  }
}
