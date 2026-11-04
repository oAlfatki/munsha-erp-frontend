




import { allAccounts } from "@/features/accounting/public/extensions";
import { fiscalRange } from "@/features/accounting/public/fiscal-range";
import { useFinancialProjection } from '@/features/financial/hooks/useFinancialProjection';
import { useBalanceSheetControllerQuery } from '@/features/financial/queries/useBalanceSheetControllerQuery';
import { useState } from 'react';
export function useBalanceSheetController() {
  const { data: entries = [] } = useFinancialProjection();
  const { state: s, branchId, refresh } = useBalanceSheetControllerQuery();
  const [from] = useState(fiscalRange(s!).from);
  const [to, setTo] = useState(fiscalRange(s!).to);
  if (!s) return null;
  const chart = allAccounts(s);
  const list = Object.entries(chart);
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
  return { refresh, to, setTo, list, sum, income, bal };
}
