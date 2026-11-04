import type { StatementDataContext } from '@/features/trade/types/read-models/StatementDataContext';
// Frontend display calculations; backend authority requires independent verification.
import { money } from '@/core/utils/money';
import type { Entry } from '@/features/ledger/public/types/models/Entry';
import { allocateInvoiceDiscount } from '@/features/trade/public/invoice-discounts';
import { lineTotal } from '@/features/trade/public/line-total';
import type { InvoiceLine } from '@/features/trade/public/types/models/InvoiceLine';
export function invoiceSummary(
  lines: InvoiceLine[],
  payment: 'cash' | 'credit' | 'mixed',
  paidAmount = 0,
  taxRate = 0,
  invoiceDiscount?: number,
) {
  const base = money(
    lines.reduce(
      (n, invoiceLine) =>
        n + money(invoiceLine.qty * invoiceLine.price * (1 - invoiceLine.discount / 100)),
      0,
    ),
  );
  if (
    invoiceDiscount !== undefined &&
    base >= 0 &&
    Number.isFinite(base) &&
    lines.every(
      (invoiceLine) =>
        invoiceLine.qty >= 0 &&
        invoiceLine.price >= 0 &&
        invoiceLine.discount >= 0 &&
        invoiceLine.discount <= 100,
    )
  )
    lines = allocateInvoiceDiscount(lines, Math.min(base, Math.max(0, invoiceDiscount)));
  const gross = money(
    lines.reduce((n, invoiceLine) => n + money(invoiceLine.qty * invoiceLine.price), 0),
  );
  const subtotal = money(lines.reduce((n, invoiceLine) => n + lineTotal(invoiceLine), 0)),
    tax = money((subtotal * taxRate) / 100),
    net = money(subtotal + tax);
  return {
    gross,
    lineDiscount: money(gross - base),
    invoiceDiscount: money(
      lines.reduce((n, invoiceLine) => n + (invoiceLine.invoiceDiscount || 0), 0),
    ),
    subtotal,
    tax,
    taxRate,
    discount: money(gross - subtotal),
    net,
    paid: payment === 'cash' ? net : payment === 'mixed' ? money(paidAmount) : 0,
    remaining: payment === 'cash' ? 0 : money(net - (payment === 'mixed' ? paidAmount : 0)),
    items: new Set(lines.map((invoiceLine) => invoiceLine.productId)).size,
    rows: lines.length,
  };
}
export function statementData(
  workspace: StatementDataContext,
  branchId: string,
  partyId: string,
  from: string,
  to: string,
  query = '',
) {
  const p = workspace.parties.find((party) => party.id === partyId),
    control = p?.kind === 'customer' ? '130' : '210';
  const selected = (entry: Entry) =>
    entry.lines.filter(
      (journalLine) => journalLine.partyId === partyId && journalLine.account === control,
    );
  const opening = money(
    workspace.entries
      .filter((entry) => entry.branchId === branchId && from && entry.date < from)
      .flatMap(selected)
      .reduce((n, journalLine) => n + journalLine.debit - journalLine.credit, 0),
  );
  let running = opening;
  const full = workspace.entries
    .filter(
      (entry) =>
        entry.branchId === branchId &&
        (!from || entry.date >= from) &&
        (!to || entry.date <= to) &&
        selected(entry).length,
    )
    .slice()
    .sort((leftEntry, rightEntry) => leftEntry.date.localeCompare(rightEntry.date))
    .map((e) => {
      const ls = selected(e),
        debit = money(ls.reduce((n, journalLine) => n + journalLine.debit, 0)),
        credit = money(ls.reduce((n, journalLine) => n + journalLine.credit, 0));
      running = money(running + debit - credit);
      return { entry: e, debit, credit, running };
    });
  return {
    opening,
    closing: running,
    debit: money(full.reduce((n, r) => n + r.debit, 0)),
    credit: money(full.reduce((n, r) => n + r.credit, 0)),
    rows: full.filter((r) => (r.entry.reference + ' ' + r.entry.description).includes(query)),
    count: full.length,
  };
}
