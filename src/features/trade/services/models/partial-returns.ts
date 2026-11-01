import type { ReturnPick } from '@/features/trade/types/models/ReturnPick';

// Frontend read models and display helpers. Authoritative mutations live in server/core.
import type { ErpReadModel } from '@/core/types/ErpReadModel';
import { money } from '@/core/utils/money';
import { allocateInvoiceDiscount } from '@/features/trade/services/models/invoice-discounts';
import type { Invoice } from '@/features/trade/types/models/Invoice';
import type { InvoiceLine } from '@/features/trade/types/models/InvoiceLine';
import { lineTotal } from '@/features/trade/utils/line-total';
const check = (ok: unknown, message: string) => {
  if (!ok) throw Error(message);
};
export function returnRemaining(workspace: ErpReadModel, invoice: Invoice, index: number) {
  const old = (workspace.invoiceReturns || [])
    .flatMap((r) =>
      r.sourceId === invoice.id
        ? r.lines.map((invoiceLine, i) => ({ l: invoiceLine, index: r.sourceLines[i] }))
        : [],
    )
    .filter((v) => v.index === index);
  return {
    qty: invoice.reversedBy
      ? 0
      : +(invoice.lines[index].qty - old.reduce((n, v) => n + v.l.qty, 0)).toFixed(6),
    free: invoice.reversedBy
      ? 0
      : +(invoice.lines[index].free - old.reduce((n, v) => n + v.l.free, 0)).toFixed(6),
    cost: money(invoice.lines[index].cost - old.reduce((n, v) => n + v.l.cost, 0)),
    invoiceDiscount: money(
      (invoice.lines[index].invoiceDiscount || 0) -
        old.reduce((n, v) => n + (v.l.sourceInvoiceDiscount ?? v.l.invoiceDiscount ?? 0), 0),
    ),
  };
}
export function quoteReturn(
  workspace: ErpReadModel,
  source: Invoice,
  picks: ReturnPick[],
  discountInput?: number,
  paidInput?: number,
) {
  check(picks.length > 0, 'حدد كمية واحدة على الأقل');
  check(new Set(picks.map((v) => v.index)).size === picks.length, 'بند المرتجع مكرر');
  let isChanged = false;
  let lines: InvoiceLine[] = picks.map((v) => {
    const original = source.lines[v.index];
    check(original, 'بند غير موجود في الفاتورة الأصلية');
    const remaining = returnRemaining(workspace, source, v.index);
    check(
      Number.isFinite(v.qty) && v.qty > 0 && v.qty <= remaining.qty + 0.0000001,
      'الكمية تتجاوز المتبقي القابل للإرجاع',
    );
    const isLast = Math.abs(v.qty - remaining.qty) < 0.0000001,
      discount = v.discount ?? original.discount;
    check(
      Number.isFinite(discount) &&
        discount >= original.discount &&
        discount <=
          (source.kind === 'purchase'
            ? 100
            : Math.max(
                original.discount,
                workspace.products.find((product) => product.id === original.productId)
                  ?.maxDiscount ?? 100,
              )),
      'خصم المرتجع لا يقل عن الخصم الأصلي ولا يتجاوز حد الصنف',
    );
    if (discount !== original.discount) isChanged = true;
    const share = isLast
      ? remaining.invoiceDiscount
      : Math.min(
          remaining.invoiceDiscount,
          money(((original.invoiceDiscount || 0) * v.qty) / original.qty),
        );
    return {
      ...original,
      sourceInvoiceDiscount: share,
      discount,
      qty: v.qty,
      free:
        source.kind === 'purchase'
          ? isLast
            ? remaining.free
            : +((original.free * v.qty) / original.qty).toFixed(6)
          : 0,
      cost: isLast ? remaining.cost : money((original.cost * v.qty) / original.qty),
      invoiceDiscount: share,
    };
  });
  const baselineDiscount = money(
      lines.reduce((n, invoiceLine) => n + (invoiceLine.invoiceDiscount || 0), 0),
    ),
    headerDiscount = discountInput ?? baselineDiscount;
  check(
    Number.isFinite(headerDiscount) && headerDiscount >= baselineDiscount,
    'خصم الفاتورة في المرتجع لا يقل عن نصيب الخصم الأصلي',
  );
  if (headerDiscount !== baselineDiscount) {
    isChanged = true;
    lines = allocateInvoiceDiscount(lines, headerDiscount);
  } else if (isChanged) {
    const base = money(
      lines.reduce(
        (n, invoiceLine) =>
          n + money(invoiceLine.qty * invoiceLine.price * (1 - invoiceLine.discount / 100)),
        0,
      ),
    );
    check(base >= headerDiscount, 'خصم المرتجع يتجاوز قيمته');
  }
  if (source.kind === 'sale')
    lines.forEach((invoiceLine, i) => {
      const original = source.lines[picks[i].index],
        gross = original.qty * original.price,
        cap = Math.max(
          workspace.products.find((product) => product.id === invoiceLine.productId)?.maxDiscount ??
            100,
          gross ? 100 * (1 - lineTotal(original) / gross) : 0,
        );
      check(
        lineTotal(invoiceLine) + 0.010001 >= invoiceLine.qty * invoiceLine.price * (1 - cap / 100),
        'خصومات المرتجع تتجاوز الحد المسموح للصنف',
      );
    });
  check(
    lines.every((invoiceLine) => lineTotal(invoiceLine) >= 0),
    'خصم أحد البنود يتجاوز قيمته؛ راجع الخصومات',
  );
  const past = (workspace.invoiceReturns || []).filter((r) => r.sourceId === source.id),
    isComplete = source.lines.every(
      (invoiceLine, index) =>
        Math.abs(
          returnRemaining(workspace, source, index).qty -
            (picks.find((l) => l.index === index)?.qty || 0),
        ) < 0.0000001,
    ),
    isAbsorb = isComplete && !isChanged && !past.some((r) => r.adjusted);
  const originalSubtotal =
    source.subtotal ??
    money(source.lines.reduce((n, invoiceLine) => n + lineTotal(invoiceLine), 0));
  const subtotal = isAbsorb
    ? money(originalSubtotal - past.reduce((n, r) => n + (r.subtotal || 0), 0))
    : money(lines.reduce((n, invoiceLine) => n + lineTotal(invoiceLine), 0));
  const remainingTax = money(
      (source.taxAmount || 0) - past.reduce((n, r) => n + (r.taxAmount || 0), 0),
    ),
    tax = isAbsorb
      ? remainingTax
      : Math.min(remainingTax, money((subtotal * (source.taxRate || 0)) / 100)),
    total = money(subtotal + tax);
  check(
    total > 0 && total <= money(source.total - past.reduce((n, r) => n + r.total, 0)),
    'قيمة المرتجع تتجاوز المتبقي أو تساوي صفرًا',
  );
  const originalPaid = source.paid ?? (source.payment === 'cash' ? source.total : 0),
    remainingPaid = money(originalPaid - past.reduce((n, r) => n + (r.paid || 0), 0)),
    remainingDue = money(
      source.total - originalPaid - past.reduce((n, r) => n + r.total - (r.paid || 0), 0),
    );
  const minPaid = Math.max(0, money(total - remainingDue)),
    maxPaid = Math.min(total, remainingPaid),
    defaultPaid = isAbsorb
      ? remainingPaid
      : Math.max(minPaid, Math.min(maxPaid, money((total * originalPaid) / source.total))),
    paid = paidInput ?? defaultPaid;
  check(
    Number.isFinite(paid) && paid >= minPaid - 0.000001 && paid <= maxPaid + 0.000001,
    'المعاد نقدًا يجب أن يكون بين ' +
      minPaid +
      ' و ' +
      maxPaid +
      '؛ لا يتجاوز النقد الأصلي أو الذمة المتبقية',
  );
  check(
    source.partyId || money(total - paid) === 0,
    'لا توجد ذمة للطرف في الفاتورة النقدية؛ أعد صافي المرتجع نقدًا',
  );
  const remainingSubtotalBase = money(
      money(originalSubtotal * source.rate) -
        past.reduce((n, r) => n + (r.baseSubtotal ?? money((r.subtotal || 0) * r.rate)), 0),
    ),
    remainingTaxBase = money(
      money(source.total * source.rate) -
        money(originalSubtotal * source.rate) -
        past.reduce(
          (n, r) => n + (r.baseTax ?? money(r.total * r.rate) - money((r.subtotal || 0) * r.rate)),
          0,
        ),
    ),
    remainingPaidBase = money(
      money(originalPaid * source.rate) -
        past.reduce((n, r) => n + (r.basePaid ?? money((r.paid || 0) * r.rate)), 0),
    );
  const subtotalBase = isAbsorb
      ? remainingSubtotalBase
      : Math.min(remainingSubtotalBase, money(subtotal * source.rate)),
    taxBase = isAbsorb ? remainingTaxBase : Math.min(remainingTaxBase, money(tax * source.rate)),
    totalBase = money(subtotalBase + taxBase);
  const paidBase =
      isAbsorb && paid === remainingPaid
        ? remainingPaidBase
        : Math.max(
            money(remainingPaidBase - (remainingSubtotalBase + remainingTaxBase - totalBase)),
            Math.min(remainingPaidBase, totalBase, money(paid * source.rate)),
          ),
    dueBase = money(totalBase - paidBase),
    cost = money(lines.reduce((n, invoiceLine) => n + invoiceLine.cost, 0));
  check(
    subtotalBase >= 0 && taxBase >= 0 && paidBase >= 0 && dueBase >= 0,
    'تعذر توزيع فروق التقريب؛ راجع الكميات المتبقية',
  );
  return {
    lines,
    subtotal,
    tax,
    total,
    paid,
    subtotalBase,
    taxBase,
    totalBase,
    paidBase,
    dueBase,
    cost,
    past,
    complete: isComplete,
    changed: isChanged,
    headerDiscount,
    minPaid,
    maxPaid,
  };
}
