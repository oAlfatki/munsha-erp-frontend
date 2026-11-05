import type { ReportDocument } from '@/core/types/reports/ReportDocument';
import { amountInWords } from '@/core/utils/amount-in-words';
import { money } from '@/core/utils/money';
import { cashOptions } from '@/features/ledger/public';
import { invoiceSummary } from '@/features/trade/services/presentation';
import type { Invoice } from '@/features/trade/types/models/Invoice';
import type { InvoiceReportContext } from '@/features/trade/types/read-models/InvoiceReportContext';
export function invoiceReport(workspace: InvoiceReportContext, invoice: Invoice): ReportDocument {
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
