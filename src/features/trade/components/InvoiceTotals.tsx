import { TotalsFooter } from '@/shared/ui/documents/TotalsFooter';
import { invoiceSummary } from '@/features/trade/services/models/presentation';
import type { InvoiceTotalsProps } from '@/features/trade/types/InvoiceTotalsProps';

export function InvoiceTotals({
  lines,
  payment,
  paid,
  taxRate,
  invoiceDiscount,
  currency,
}: InvoiceTotalsProps) {
  const t = invoiceSummary(lines, payment, paid, taxRate, invoiceDiscount);
  return (
    <TotalsFooter
      rows={[
        ['عدد الأصناف', t.items],
        ['عدد البنود', t.rows],
        ['إجمالي الفاتورة قبل الخصم', t.gross],
        ['خصم الأصناف', t.lineDiscount],
        ['خصم الفاتورة', t.invoiceDiscount],
        ['الإجمالي بعد الخصم', t.subtotal],
        ...(t.taxRate
          ? ([
              ['نسبة الضريبة %', t.taxRate],
              ['مبلغ الضريبة', t.tax],
              ['الإجمالي شامل الضريبة', t.net],
            ] as [string, number][])
          : []),
        ['المبلغ المدفوع', t.paid],
        ['المبلغ المتبقي', t.remaining],
        ['العملة', currency],
      ]}
      amount={t.net}
      currency={currency}
    />
  );
}
