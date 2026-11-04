import type { ReportDocument } from '@/core/types/ReportDocument';
import { amountInWords } from '@/core/utils/amount-in-words';
import { money } from '@/core/utils/money';
import { cashOptions } from "@/features/accounting/public/cash";
import type { VoucherDocument } from '@/features/accounting/types/models/VoucherDocument';
import type { VoucherReportContext } from '@/features/accounting/types/read-models/VoucherReportContext';
export function voucherReport(workspace: VoucherReportContext, d: VoucherDocument): ReportDocument {
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
