import type { TradeFilters } from '@/features/trade/types/models/TradeFilters';
import type { TradeSummaryContext } from '@/features/trade/types/read-models/TradeSummaryContext';

// Frontend display calculations; backend authority requires independent verification.
import { money } from '@/core/utils/money';
import { lineTotal } from '@/features/trade/services/line-total';

export function tradeSummary(
  workspace: TradeSummaryContext,
  kind: 'sale' | 'purchase',
  branchId: string,
  f: TradeFilters,
) {

  const matchesUser = (id?: string) => !f.user || (f.user === 'unrecorded' ? !id : id === f.user);

  const within = (date: string) => (!f.from || date >= f.from) && (!f.to || date <= f.to);

  let gross = 0,
    returned = 0,
    discount = 0,
    cost = 0,
    returnedCost = 0,
    count = 0,
    returnCount = 0;
  for (const invoice of workspace.invoices.filter(
    (invoice) =>
      invoice.kind === kind &&
      invoice.branchId === branchId &&
      invoice.status === 'final' &&
      (!f.warehouse || invoice.warehouseId === f.warehouse),
  )) {
    const amount = money(
        invoice.lines.reduce((n, invoiceLine) => n + invoiceLine.qty * invoiceLine.price, 0) *
          invoice.rate,
      ),
      net = money(
        (invoice.subtotal ??
          money(invoice.lines.reduce((n, invoiceLine) => n + lineTotal(invoiceLine), 0))) *
          invoice.rate,
      ),
      off = money(amount - net),
      bookCost = money(invoice.lines.reduce((n, invoiceLine) => n + invoiceLine.cost, 0));
    if (within(invoice.date) && matchesUser(invoice.savedById)) {
      gross += amount;
      discount += off;
      cost += bookCost;
      count++;
    }
    const reversal = invoice.reversedBy
      ? workspace.entries.find(
          (entry) => entry.reference === invoice.reversedBy && entry.branchId === branchId,
        )
      : undefined;
    if (reversal && within(reversal.date) && matchesUser(invoice.returnedById)) {
      returned += amount;
      discount -= off;
      returnedCost += bookCost;
      returnCount++;
    }
  }
  for (const r of workspace.invoiceReturns || []) {
    if (
      r.kind !== kind ||
      r.branchId !== branchId ||
      (f.warehouse && r.warehouseId !== f.warehouse) ||
      !within(r.date) ||
      !matchesUser(r.returnedById)
    )
      continue;
    const amount = money(
      r.lines.reduce((n, invoiceLine) => n + invoiceLine.qty * invoiceLine.price, 0) * r.rate,
    );
    returned += amount;
    discount -= money(amount - (r.baseSubtotal ?? money((r.subtotal ?? r.total) * r.rate)));
    returnedCost += money(r.lines.reduce((n, invoiceLine) => n + invoiceLine.cost, 0));
    returnCount++;
  }
  const net = money(gross - returned - discount),
    profit = money(net - cost + returnedCost);
  const label = kind === 'sale' ? 'المبيعات' : 'المشتريات';
  const rows: (string | number)[][] = [
    [label, money(gross)],
    ['مرتجع ' + label, money(returned)],
    [kind === 'sale' ? 'خصم مسموح به' : 'خصم مكتسب', money(discount)],
    ['صافي ' + label, net],
  ];
  if (kind === 'sale') {
    [money(gross - cost), money(returned - returnedCost), money(discount), profit].forEach((p, i) =>
      rows[i].push(p),
    );
  }
  return {
    headers: [
      'اسم الحساب',
      'إجمالي المبلغ · YER',
      ...(kind === 'sale' ? ['إجمالي الربح · YER'] : []),
    ],
    rows,
    total: net,
    profit,
    count,
    returnCount,
    note: 'الإجمالي والمرتجع قبل الخصم، والخصم صافي خصومات الفواتير ناقص خصومات المرتجعات. المرتجع بتاريخ مستند الرد، والأسعار والتكلفة تاريخية. الربح مجمل ربح البضاعة قبل مصروفات التشغيل. فلتر المستخدم يطبق على منفذ حفظ الفاتورة أو المرتجع كلًا على حدة؛ المستندات القديمة دون هوية تبقى ضمن غير مسجل.',
  };
}
