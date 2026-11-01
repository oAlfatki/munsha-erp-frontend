import type { VoucherDocument } from '@/features/accounting/types/models/VoucherDocument';
import type { StockDocument } from '@/features/inventory/types/models/StockDocument';
// Frontend read models and display helpers. Authoritative mutations live in server/core.
import type { ErpReadModel } from '@/core/types/ErpReadModel';
import type { ReportDocument } from '@/core/types/ReportDocument';
import { amountInWords } from '@/core/utils/amount-in-words';
import { money } from '@/core/utils/money';
import { cashOptions } from '@/features/accounting/services/models/cash';
import { allAccounts } from '@/features/accounting/services/models/extensions';
import { invoiceSummary } from '@/features/trade/services/models/presentation';
import type { Invoice } from '@/features/trade/types/models/Invoice';
export function invoiceReport(workspace: ErpReadModel, invoice: Invoice): ReportDocument {
  const isReturning = invoice.number.startsWith('RET-'),
    savedReturn = workspace.invoiceReturns?.find((r) => r.number === invoice.number),
    source =
      workspace.invoices.find(
        (invoice) =>
          invoice.id === invoice.id ||
          invoice.id === savedReturn?.sourceId ||
          invoice.reversedBy === invoice.number,
      ) || invoice,
    party = workspace.parties.find((party) => party.id === invoice.partyId),
    summary = invoiceSummary(invoice.lines, invoice.payment, invoice.paid, invoice.taxRate),
    isFree =
      invoice.kind === 'purchase' && invoice.lines.some((invoiceLine) => invoiceLine.free > 0),
    title =
      (isReturning ? 'فاتورة مرتجع ' : 'فاتورة ') +
      (invoice.kind === 'sale' ? 'مبيعات' : 'شراء') +
      ' — ' +
      invoice.number;
  if (isReturning && !savedReturn && invoice.subtotal !== undefined) {
    summary.subtotal = invoice.subtotal;
    summary.tax = invoice.taxAmount || 0;
    summary.net = invoice.total;
    summary.paid = invoice.paid || 0;
    summary.remaining = money(invoice.total - (invoice.paid || 0));
  }
  if (savedReturn) {
    summary.subtotal = savedReturn.subtotal ?? summary.subtotal;
    summary.tax = savedReturn.taxAmount ?? summary.tax;
    summary.net = savedReturn.total;
    summary.paid = savedReturn.paid || 0;
    summary.remaining = money(summary.net - summary.paid);
  }
  return {
    title,
    metadata: [
      ['رقم المستند', invoice.number],
      ['التاريخ', invoice.date],
      [
        'طريقة الدفع',
        invoice.payment === 'cash'
          ? 'نقدي'
          : invoice.payment === 'mixed'
            ? 'جزء نقدي وجزء آجل'
            : 'آجل',
      ],
      [
        'المستخدم',
        isReturning ? invoice.returnedByName || 'غير مسجل' : invoice.savedByName || 'غير مسجل',
      ],
      [
        'الصندوق',
        cashOptions(workspace, invoice.branchId).find((c) => c.id === invoice.cashId)?.name ||
          (invoice.payment === 'credit' ? 'آجل — لا حركة صندوق' : 'غير مسجل'),
      ],
      [invoice.kind === 'sale' ? 'العميل' : 'المورد', party?.name || 'نقدي'],
      ['الهاتف', party?.phone || '—'],
      ['العملة', invoice.currency],
      ['سعر الصرف التاريخي', String(invoice.rate)],
      ...(invoice.warehouseId
        ? [
            [
              'المخزن',
              workspace.warehouses.find((warehouse) => warehouse.id === invoice.warehouseId)
                ?.name || '—',
            ] as [string, string],
          ]
        : []),
      ['الحالة', invoice.status === 'draft' ? 'مسودة بلا أثر محاسبي' : 'نهائي'],
      ...(isReturning ? [['الفاتورة الأصلية', source.number] as [string, string]] : []),
    ],
    tables: [
      {
        headers: [
          'م',
          'اسم الصنف',
          'الوحدة',
          'الكمية',
          ...(isFree ? ['مجاني'] : []),
          invoice.kind === 'purchase' ? 'سعر الشراء' : 'سعر البيع',
          'الإجمالي قبل الخصم',
          'الخصم',
        ],
        rows: invoice.lines.map((invoiceLine, index) => {
          const p = workspace.products.find((product) => product.id === invoiceLine.productId);
          return [
            index + 1,
            p?.name || invoiceLine.productId,
            p?.units[invoiceLine.unit]?.name || '—',
            invoiceLine.qty,
            ...(isFree ? [invoiceLine.free] : []),
            invoiceLine.price,
            money(invoiceLine.qty * invoiceLine.price),
            money(
              (invoiceLine.qty * invoiceLine.price * invoiceLine.discount) / 100 +
                (invoiceLine.invoiceDiscount || 0),
            ),
          ];
        }),
      },
    ],
    totals: [
      ['عدد أصناف الفاتورة', String(summary.items)],
      ['إجمالي الفاتورة قبل الخصم', String(summary.gross)],
      ['خصم الأصناف', String(summary.lineDiscount)],
      [invoice.kind === 'sale' ? 'خصم مسموح به' : 'خصم مكتسب', String(summary.invoiceDiscount)],
      ['الإجمالي بعد الخصم', String(summary.subtotal)],
      ...(summary.taxRate
        ? ([
            ['الضريبة %', String(summary.taxRate)],
            ['مبلغ الضريبة', String(summary.tax)],
            ['الإجمالي شامل الضريبة', String(summary.net)],
          ] as [string, string][])
        : []),
      [isReturning ? 'المبلغ المعاد نقدًا' : 'المبلغ المدفوع', String(summary.paid)],
      [isReturning ? 'المبلغ المعكوس من الذمة' : 'المبلغ المتبقي', String(summary.remaining)],
    ],
    words: [amountInWords(summary.net, invoice.currency)],
    signatures: invoice.kind === 'sale' && !isReturning ? ['المستلم', 'المبيعات'] : undefined,
    notes: [
      ...(invoice.note ? ['ملاحظات: ' + invoice.note] : []),
      ...(invoice.kind === 'sale' && !isReturning
        ? ['إقرار المستلم عند التوقيع: استلمت البضاعة كاملة وسليمة.']
        : []),
      ...(isReturning
        ? ['مرتجع مرتبط بالفاتورة الأصلية؛ يعكس أثر الكميات المرتجعة بسعرها وتكلفتها التاريخية.']
        : []),
    ],
  };
}
export function stockDocumentReport(workspace: ErpReadModel, d: StockDocument): ReportDocument {
  const chart = allAccounts(workspace),
    stock = d.lines.map((l, index) => {
      const p = workspace.products.find((product) => product.id === l.productId);
      return [
        index + 1,
        p?.name || l.productId,
        p?.units[l.unit]?.name || '—',
        l.qty,
        l.price,
        l.value ?? money(l.qty * l.price * d.rate),
      ];
    });
  const totalDr = money(
      d.accounts.reduce((n, l) => n + l.debit * d.rate, 0) +
        (d.kind === 'opening'
          ? d.total - money(d.accounts.reduce((n, l) => n + l.debit * d.rate, 0))
          : 0),
    ),
    totalCr = money(d.accounts.reduce((n, l) => n + l.credit * d.rate, 0));
  return {
    title:
      (d.kind === 'transfer'
        ? 'فاتورة تحويل مخزني'
        : d.kind === 'adjustment'
          ? 'فاتورة تسوية المخزون'
          : d.openingScope === 'stock'
            ? 'أصناف بداية المدة'
            : 'الأرصدة الافتتاحية للحسابات') +
      ' — ' +
      d.reference,
    metadata: [
      ['رقم المستند', d.reference],
      ['التاريخ', d.date],
      ['الحالة', d.status === 'final' ? 'نهائي' : 'مسودة بلا أثر'],
      ...(d.warehouseId
        ? [
            [
              'المخزن',
              workspace.warehouses.find((warehouse) => warehouse.id === d.warehouseId)?.name || '—',
            ] as [string, string],
          ]
        : []),
      ...(d.toWarehouseId
        ? [
            [
              'المخزن الوجهة',
              workspace.warehouses.find((warehouse) => warehouse.id === d.toWarehouseId)?.name ||
                '—',
            ] as [string, string],
          ]
        : []),
      ['العملة', d.currency],
      ['سعر الصرف التاريخي', String(d.rate)],
    ],
    tables: [
      ...(stock.length
        ? [
            {
              title: 'بنود المخزون',
              headers: ['م', 'الصنف', 'الوحدة', 'الكمية', 'السعر', 'القيمة YER'],
              rows: stock,
            },
          ]
        : []),
      ...(d.accounts.length
        ? [
            {
              title: 'أرصدة الحسابات',
              headers: ['الحساب', 'الطرف', 'مدين', 'دائن', 'البيان'],
              rows: d.accounts.map((l) => [
                chart[l.account]?.name || l.account,
                workspace.parties.find((party) => party.id === l.partyId)?.name || '—',
                l.debit,
                l.credit,
                l.description,
              ]),
            },
          ]
        : []),
    ],
    totals: [
      [
        d.openingScope === 'accounts' ? 'عدد الحسابات' : 'عدد الأصناف',
        String(
          d.openingScope === 'accounts'
            ? d.accounts.length
            : new Set(d.lines.map((l) => l.productId)).size,
        ),
      ],
      ['قيمة المستند YER', String(d.total)],
      ...(d.kind === 'opening' && d.openingScope !== 'stock'
        ? ([
            ['إجمالي مدين YER', String(totalDr)],
            ['إجمالي دائن YER', String(totalCr)],
            ['الفرق', String(money(totalDr - totalCr))],
          ] as [string, string][])
        : []),
    ],
    words: [amountInWords(d.total, 'YER')],
    notes: d.note ? [d.note] : [],
  };
}
export function voucherReport(workspace: ErpReadModel, d: VoucherDocument): ReportDocument {
  const totals = new Map<string, number>();
  for (const l of d.lines) totals.set(l.currency, money((totals.get(l.currency) || 0) + l.amount));
  return {
    title: (d.kind === 'receipt' ? 'سند قبض' : 'سند صرف') + ' — ' + d.reference,
    metadata: [
      ['رقم السند', d.reference],
      ['التاريخ', d.date],
      ['الطرف', workspace.parties.find((party) => party.id === d.partyId)?.name || '—'],
      ['الهاتف', workspace.parties.find((party) => party.id === d.partyId)?.phone || '—'],
      ['المستخدم', d.savedByName || 'غير مسجل'],
      ['الحالة', 'نهائي'],
    ],
    tables: [
      {
        headers: [
          'م',
          'الصندوق / البنك',
          'العملة',
          'المبلغ',
          'سعر الصرف',
          'المقابل ' + workspace.organization.currency,
        ],
        rows: d.lines.map((l, i) => [
          i + 1,
          cashOptions(workspace, d.branchId).find((c) => c.id === l.cashId)?.name || l.cashId,
          l.currency,
          l.amount,
          String(l.rate),
          l.baseAmount,
        ]),
      },
    ],
    totals: [
      ...[...totals].map(([c, a]) => ['إجمالي ' + c, String(a)] as [string, string]),
      ['الإجمالي بالعملة الأساسية ' + workspace.organization.currency, String(d.total)],
    ],
    words: [amountInWords(d.total, workspace.organization.currency)],
    notes: [
      ...(d.note ? [d.note] : []),
      'أسعار الصرف محفوظة مع بنود السند، والذمة تسوى بالعملة الأساسية.',
    ],
  };
}
