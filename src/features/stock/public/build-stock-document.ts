import type { ReportDocument } from '@/core/types/ReportDocument';
import { amountInWords } from '@/core/utils/amount-in-words';
import { money } from '@/core/utils/money';
import { allAccounts } from '@/features/ledger/public/extensions';
import type { StockDocument } from '@/features/stock/public/types/models/StockDocument';
import type { StockDocumentReportContext } from '@/features/stock/public/types/read-models/StockDocumentReportContext';
export function stockDocumentReport(
  workspace: StockDocumentReportContext,
  d: StockDocument,
): ReportDocument {
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
