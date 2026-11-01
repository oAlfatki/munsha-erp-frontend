import type {ExtrasContext} from '@/features/accounting/types/read-models/ExtrasContext';
import type {AllAccountsContext} from '@/features/accounting/types/read-models/AllAccountsContext';
import type { ExtensionData } from '@/features/accounting/types/models/ExtensionData';
import type { MasterRecord } from '@/features/accounting/types/models/MasterRecord';

// Frontend read models and display helpers. Authoritative mutations live in server/core.
import type { ErpReadModel } from '@/core/types/ErpReadModel';
import { ACCOUNTS } from '@/features/accounting/utils/account-balances';
export function extras(workspace: ExtrasContext): ExtensionData {
  const defaults: Record<string, MasterRecord[]> = {
    units: [
      ...new Set(workspace.products.flatMap((product) => product.units.map((u) => u.name))),
    ].map((name, i) => ({ id: 'unit-' + i, name, category: '3', active: true })),
    categories: [1, 2, 3].map((n) => ({
      id: 'category-' + n,
      name: ['', 'أحادية', 'ثنائية', 'ثلاثية'][n],
      count: n,
      active: true,
    })),
    expenseTypes: [
      { id: 'rent', name: 'إيجار', active: true, account: '510' },
      { id: 'general', name: 'مصروفات عامة', active: true, account: '510' },
    ],
  };
  return {
    records: { ...defaults, ...workspace.extras?.records },
    operations: workspace.extras?.operations || [],
    drafts: workspace.extras?.drafts || {},
    preferences: workspace.extras?.preferences || {},
  };
}
export function allAccounts(workspace: AllAccountsContext) {
  const result: Record<
    string,
    {
      name: string;
      type: string;
    }
  > = {
    ...ACCOUNTS,
    '165': { name: 'ضريبة مشتريات قابلة للاسترداد', type: 'asset' },
    '240': { name: 'ضريبة مبيعات مستحقة', type: 'liability' },
    '140': { name: 'سلف الموظفين', type: 'asset' },
    '160': { name: 'مصروفات مقدمة', type: 'asset' },
    '170': { name: 'الأصول الثابتة', type: 'asset' },
    '179': { name: 'مجمع الإهلاك', type: 'asset' },
    '220': { name: 'رواتب مستحقة', type: 'liability' },
    '230': { name: 'مصروفات مستحقة', type: 'liability' },
    '310': { name: 'نتائج متراكمة', type: 'equity' },
    '520': { name: 'مصروف الرواتب', type: 'expense' },
    '530': { name: 'مصروف الإهلاك', type: 'expense' },
    '540': { name: 'فروق الجرد', type: 'expense' },
  };
  for (const a of extras(workspace).records.accounts || [])
    result[String(a.code)] = { name: a.name, type: String(a.type || 'asset') };
  return result;
}
