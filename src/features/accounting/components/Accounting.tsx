import { ROUTES } from '@/core/config/navigation-paths';





import { exportPdf } from '@/core/reporting/service';
import { fmt } from '@/core/utils/formatters';
import { AccountStatement } from '@/features/accounting/components/Statement';
import { VoucherEditor } from '@/features/accounting/components/VoucherEditor';
import { useAccountingQuery } from '@/features/accounting/queries/useAccountingQuery';
import { allAccounts } from "@/features/accounting/public/extensions";
import { fiscalRange } from "@/features/accounting/public/fiscal-range";
import { Field } from '@/shared/ui/forms/Field';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { ReportActions } from '@/shared/ui/reports/ReportActions';
import { DataTable } from '@/shared/ui/tables/DataTable';
import { useState } from 'react';
export function Accounting() {
  const { state: s, branchId, view, navigate } = useAccountingQuery();
  const [tab,setTab]=useState('journal'),
    [isVoucher,setVoucher]=useState(false),
    [from, setFrom] = useState(fiscalRange(s!).from),
    [to, setTo] = useState(fiscalRange(s!).to);
  if (!s) return null;
  const entries = s.entries.filter(
    (entry) =>
      entry.branchId === branchId && (!from || entry.date >= from) && (!to || entry.date <= to),
  );
  const chart = allAccounts(s),
    trial = Object.entries(chart).map(([code, a]) => {
      const value = s.entries
        .filter((entry) => entry.branchId === branchId && (!to || entry.date <= to))
        .flatMap((entry) => entry.lines)
        .filter((journalLine) => journalLine.account === code)
        .reduce((n, journalLine) => n + journalLine.debit - journalLine.credit, 0);
      return { code, name: a.name, value };
    });
  const tabs = (
    <div className="module-tabs no-print">
      {[
        ['journal', 'القيود اليومية'],
        ['statement', 'كشف حساب'],
        ['trial', 'ميزان المراجعة'],
        ['chart', 'دليل الحسابات'],
      ].map(([k, l]) => (
        <button key={k} className={tab === k ? 'active' : ''} onClick={() => setTab(k)}>
          {l}
        </button>
      ))}
    </div>
  );
  const headers =
    tab === 'trial'
      ? ['الرمز', 'الحساب', 'رصيد مدين', 'رصيد دائن']
      : tab === 'chart'
        ? ['الرمز', 'الحساب', 'التصنيف']
        : ['التاريخ', 'المستند', 'البيان', 'مدين', 'دائن'];
  const rows: (string | number)[][] =
    tab === 'trial'
      ? trial.map((v) => [v.code, v.name, Math.max(v.value, 0), Math.max(-v.value, 0)])
      : tab === 'chart'
        ? Object.entries(chart).map(([c, a]) => [
            c,
            a.name,
            (
              {
                asset: 'أصول',
                liability: 'التزامات',
                equity: 'حقوق ملكية',
                revenue: 'إيرادات',
                expense: 'مصروفات',
              } as Record<string, string>
            )[a.type],
          ])
        : [...entries]
            .reverse()
            .map((entry) => [
              entry.date,
              entry.reference,
              entry.description,
              entry.lines.reduce((n, journalLine) => n + journalLine.debit, 0),
              entry.lines.reduce((n, journalLine) => n + journalLine.credit, 0),
            ]);
  return (
    <>
      {tabs}
      {tab === 'statement' ? (
        <AccountStatement />
      ) : (
        <>
          <PageHead
            title="الحسابات"
            description="القيود ودليل الحسابات وميزان المراجعة."
            onAction={() => setVoucher(true)}
            label="إضافة سند"
            extra={<ReportActions onExport={() => exportPdf('الحسابات', headers, rows)} />}
          />
          <div className="filter-bar">
            <Field label="من تاريخ — القيود">
              <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
            </Field>
            <Field label="إلى تاريخ / الميزان كما في">
              <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
            </Field>
            <Button variant="outline" onClick={() => navigate(ROUTES.ACCOUNTING_JOURNAL_NEW)}>
              إضافة قيد يدوي
            </Button>
          </div>
          <DataTable
            headers={headers}
            rows={rows.map((r) => r.map((v) => (typeof v === 'number' ? fmt(v) : v)))}
          />
          {tab === 'trial' && (
            <div className="invoice-total">
              <span>فرق الميزان</span>
              <strong>{fmt(trial.reduce((n, v) => n + v.value, 0))} YER</strong>
            </div>
          )}
        </>
      )}
      {isVoucher && (
        <VoucherEditor
          kind="receipt"
          onClose={() => setVoucher(false)}
        />
      )}
    </>
  );
}
