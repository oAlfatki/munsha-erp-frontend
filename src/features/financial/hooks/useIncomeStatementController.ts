import { useFinancialProjection } from '@/features/financial/hooks/useFinancialProjection';
import { useIncomeStatementControllerQuery } from '@/features/financial/queries/useIncomeStatementControllerQuery';
import { allAccounts } from '@/features/ledger/public/extensions';
import { fiscalRange } from '@/features/ledger/public/fiscal-range';
import { useState } from 'react';
export function useIncomeStatementController() {
  const { data: entries = [] } = useFinancialProjection();
  const { state: s, branchId, refresh } = useIncomeStatementControllerQuery();
  const [from, setFrom] = useState(fiscalRange(s!).from),
    [to, setTo] = useState(fiscalRange(s!).to);
  if (!s) return null;
  const chart = allAccounts(s),
    list = Object.entries(chart);
  const sum = (type: string, isPeriod = false) => {
    const selected = entries.filter(
      (entry) =>
        entry.branchId === branchId &&
        (!to || entry.date <= to) &&
        (!isPeriod || !from || entry.date >= from),
    );
    return list
      .filter(([, a]) => a.type === type)
      .reduce(
        (n, [code]) =>
          n +
          selected
            .flatMap((entry) => entry.lines)
            .filter((journalLine) => journalLine.account === code)
            .reduce((n, journalLine) => n + journalLine.debit - journalLine.credit, 0),
        0,
      );
  };
  const income = (isPeriod: boolean) => -sum('revenue', isPeriod) - sum('expense', isPeriod);
  const periodEntries = entries.filter(
    (entry) =>
      entry.branchId === branchId && (!to || entry.date <= to) && (!from || entry.date >= from),
  );
  const bal = (code: string, isPeriod = false) =>
    (isPeriod
      ? periodEntries
      : entries.filter((entry) => entry.branchId === branchId && (!to || entry.date <= to))
    )
      .flatMap((entry) => entry.lines)
      .filter((journalLine) => journalLine.account === code)
      .reduce((n, journalLine) => n + journalLine.debit - journalLine.credit, 0);
  const incomeRows = list
    .filter(([, a]) => ['revenue', 'expense'].includes(a.type))
    .map(([c, a]) => [a.name, -bal(c, true)] as [string, number]);
  return { refresh, from, setFrom, to, setTo, income, incomeRows };
}
