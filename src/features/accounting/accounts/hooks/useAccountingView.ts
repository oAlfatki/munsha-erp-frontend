import { useAccountingQuery } from '@/features/accounting/accounts/queries/useAccountingQuery';
import { allAccounts, fiscalRange } from '@/features/ledger/public';
import { useState } from 'react';

export function useAccountingView(initialTab: string) {

  const { state, branchId, navigate } = useAccountingQuery();
  const [tab, setTab] = useState<string>(initialTab),
    [isVoucher, setVoucher] = useState(false),
    [from, setFrom] = useState(fiscalRange(state!).from),
    [to, setTo] = useState(fiscalRange(state!).to);
  if (!state) return null;
  const entries = state.entries.filter(
    (entry) =>
      entry.branchId === branchId && (!from || entry.date >= from) && (!to || entry.date <= to),
  );
  const chart = allAccounts(state),
    trial = Object.entries(chart).map(([code, a]) => {
      const value = state.entries
        .filter((entry) => entry.branchId === branchId && (!to || entry.date <= to))
        .flatMap((entry) => entry.lines)
        .filter((journalLine) => journalLine.account === code)
        .reduce((n, journalLine) => n + journalLine.debit - journalLine.credit, 0);
      return { code, name: a.name, value };
    });

  const headers =
    tab === 'trial'
      ? ['الرمز', 'الحساب', 'رصيد مدين', 'رصيد دائن']
      : tab === 'chart'
        ? ['الرمز', 'الحساب', 'التصنيف']
        : ['التاريخ', 'المستند', 'البيان', 'مدين', 'دائن'];
  const rows: (string | number)[][] =
    tab === 'trial'
      ? trial.map((v) => [v.code, v.name, Math.max(v.value, 0), Math.max(-v.value, 0)])
      : tab === 'chart'
        ? Object.entries(chart).map(([c, a]) => [
            c,
            a.name,
            (
              {
                asset: 'أصول',
                liability: 'التزامات',
                equity: 'حقوق ملكية',
                revenue: 'إيرادات',
                expense: 'مصروفات',
              } as Record<string, string>
            )[a.type],
          ])
        : [...entries]
            .reverse()
            .map((entry) => [
              entry.date,
              entry.reference,
              entry.description,
              entry.lines.reduce((n, journalLine) => n + journalLine.debit, 0),
              entry.lines.reduce((n, journalLine) => n + journalLine.credit, 0),
            ]);

  return {
    s: state,
    navigate,
    tab,
    setTab,
    isVoucher,
    setVoucher,
    from,
    setFrom,
    to,
    setTo,
    trial,
    headers,
    rows,
  };
}
