import type { AnnualBooks } from '@/features/ledger/types/models/AnnualBooks';
import type { AccountClosingContext } from '@/features/ledger/types/read-models/AccountClosingContext';
import type { BookCatalogContext } from '@/features/ledger/types/read-models/BookCatalogContext';
import type { ClosingChecksContext } from '@/features/ledger/types/read-models/ClosingChecksContext';
import type { IsArchivedContext } from '@/features/ledger/types/read-models/IsArchivedContext';
import type { StockClosingContext } from '@/features/ledger/types/read-models/StockClosingContext';

// Frontend display calculations; backend authority requires independent verification.
import { money } from '@/core/utils/money';
import { cashOptions, defaultCashId } from '@/features/ledger/services/cash';
import { allAccounts, extras } from '@/features/ledger/services/extensions';

export function bookCatalog(workspace: BookCatalogContext): AnnualBooks {

  return (
    workspace.annualBooks || {
      activeId: 'main',
      books: [
        {
          id: 'main',
          name: 'السنة المالية ' + workspace.organization.year,
          year: workspace.organization.year,
          status: 'current',
        },
      ],
    }
  );
}

export const isArchived = (workspace: IsArchivedContext) =>
  bookCatalog(workspace).books.find((b) => b.id === bookCatalog(workspace).activeId)?.status ===
  'closed';

export function stockClosing(
  workspace: StockClosingContext,
  date: string,
  branchId = '',
  warehouseId = '',
) {

  return workspace.products.flatMap((product) =>
    workspace.warehouses
      .filter(
        (warehouse) =>
          (!branchId || warehouse.branchId === branchId) &&
          (!warehouseId || warehouse.id === warehouseId),
      )
      .flatMap((w) => {
        const ms = workspace.movements.filter(
          (m) => m.productId === product.id && m.warehouseId === w.id && m.date <= date,
        );
        const qty = +ms.reduce((n, m) => n + m.qty, 0).toFixed(6),
          value = +ms.reduce((n, m) => n + m.value, 0).toFixed(6);
        return qty || value
          ? [
              {
                productId: product.id,
                warehouseId: w.id,
                branchId: w.branchId,
                code: product.code,
                name: product.name,
                qty,
                unit: product.units.at(-1)!.name,
                warehouse: w.name,
                average: qty ? value / qty : 0,
                value,
              },
            ]
          : [];
      }),
  );
}

export function accountClosing(workspace: AccountClosingContext, date: string, branchId = '') {

  const chart = allAccounts(workspace),
    groups = new Map<
      string,
      {
        branchId: string;
        account: string;
        partyId?: string;
        cashId?: string;
        amount: number;
      }
    >();
  for (const entry of workspace.entries.filter(
    (entry) => entry.date <= date && (!branchId || entry.branchId === branchId),
  ))
    for (const journalLine of entry.lines) {
      const partyId =
        ['130', '140', '210', '220'].includes(journalLine.account) ||
        (journalLine.partyId &&
          extras(workspace).records.contacts?.some((c) => c.id === journalLine.partyId))
          ? journalLine.partyId
          : undefined;
      const cashId =
        journalLine.cashId ||
        (journalLine.account === '101' ? defaultCashId(entry.branchId) : undefined);
      const key = JSON.stringify([
        entry.branchId,
        journalLine.account,
        partyId || '',
        cashId || '',
      ]);
      const v = groups.get(key) || {
        branchId: entry.branchId,
        account: journalLine.account,
        partyId,
        cashId,
        amount: 0,
      };
      v.amount += journalLine.debit - journalLine.credit;
      groups.set(key, v);
    }
  return [...groups.values()]
    .map((v) => ({
      ...v,
      amount: money(v.amount),
      name:
        (v.partyId
          ? workspace.parties.find((party) => party.id === v.partyId)?.name ||
            workspace.employees.find((employee) => employee.id === v.partyId)?.name ||
            extras(workspace).records.contacts?.find((p) => p.id === v.partyId)?.name
          : undefined) ||
        (v.cashId
          ? cashOptions(workspace, v.branchId).find((c) => c.id === v.cashId)?.name
          : undefined) ||
        chart[v.account]?.name ||
        v.account,
      type: chart[v.account]?.type || '',
    }))
    .filter((v) => v.amount !== 0);
}

export function closingChecks(workspace: ClosingChecksContext): string[] {

  const errors: string[] = [],
    end = workspace.organization.year + '-12-31',
    chart = allAccounts(workspace);
  if (
    workspace.invoices.some((invoice) => invoice.status === 'draft') ||
    workspace.stockDocuments?.some((d) => d.status === 'draft')
  )
    errors.push('توجد مسودات فواتير أو مستندات مخزون؛ أكملها أو احذفها قبل الترحيل.');
  if (
    workspace.entries.some(
      (entry) =>
        money(
          entry.lines.reduce((n, journalLine) => n + journalLine.debit - journalLine.credit, 0),
        ) !== 0,
    )
  )
    errors.push('يوجد قيد غير متزن.');
  if (
    workspace.entries.some(
      (entry) =>
        !workspace.branches.some((branch) => branch.id === entry.branchId) ||
        entry.lines.some((journalLine) => !chart[journalLine.account]),
    )
  )
    errors.push('يوجد قيد بفرع أو حساب غير معرف.');
  if (workspace.entries.some((entry) => entry.date > end))
    errors.push('توجد قيود بعد تاريخ نهاية السنة.');
  for (const branch of workspace.branches) {
    const gl = money(
      accountClosing(workspace, end, branch.id)
        .filter((l) => l.account === '120')
        .reduce((n, l) => n + l.amount, 0),
    );
    const stock = money(stockClosing(workspace, end, branch.id).reduce((n, l) => n + l.value, 0));
    if (Math.abs(gl - stock) > 0.02)
      errors.push('قيمة مخزون ' + branch.name + ' لا تطابق الحساب الرقابي.');
  }
  for (const st of workspace.stocks) {
    const row = stockClosing(workspace, end).find(
      (r) => r.productId === st.productId && r.warehouseId === st.warehouseId,
    );
    if (
      Math.abs((row?.qty || 0) - st.qty) > 0.00001 ||
      Math.abs((row?.value || 0) - st.value) > 0.02
    )
      errors.push('سجل المخزون لا يطابق حركاته؛ راجع الأرصدة.');
  }
  if (stockClosing(workspace, end).some((r) => r.qty < 0 || r.value < 0))
    errors.push('توجد أرصدة مخزون سالبة.');
  return [...new Set(errors)];
}
