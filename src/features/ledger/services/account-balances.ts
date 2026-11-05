import { money } from '@/core/utils/money';
import type { BalanceContext } from '@/features/ledger/types/read-models/BalanceContext';
export const ACCOUNTS: Record<
  string,
  {
    name: string;
    type: string;
  }
> = {
  '101': { name: 'الصناديق', type: 'asset' },
  '120': { name: 'المخزون', type: 'asset' },
  '130': { name: 'ذمم العملاء', type: 'asset' },
  '150': { name: 'جاري الفروع', type: 'asset' },
  '210': { name: 'ذمم الموردين', type: 'liability' },
  '300': { name: 'رأس المال', type: 'equity' },
  '400': { name: 'إيرادات المبيعات', type: 'revenue' },
  '500': { name: 'تكلفة البضاعة المباعة', type: 'expense' },
  '510': { name: 'المصروفات التشغيلية', type: 'expense' },
};
export const balance = (workspace: BalanceContext, account: string, partyId?: string) =>
  money(
    workspace.entries
      .flatMap((entry) => entry.lines)
      .filter(
        (journalLine) =>
          journalLine.account === account && (!partyId || journalLine.partyId === partyId),
      )
      .reduce((n, journalLine) => n + journalLine.debit - journalLine.credit, 0),
  );
