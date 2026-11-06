import { ROUTES } from '@/core/config/navigation-paths';
import { exportPdf } from '@/core/reporting/service';
import { fmt } from '@/core/utils/formatters';
import { AccountStatement } from '@/features/accounting/accounts/components/Statement';
import { useAccountingView } from '@/features/accounting/accounts/hooks/useAccountingView';
import type { AccountingViewProps } from '@/features/accounting/accounts/types/props/AccountingViewProps';
import { VoucherEditor } from '@/features/accounting/vouchers/components/VoucherEditor';
import { Field } from '@/shared/ui/forms/Field';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { ReportActions } from '@/shared/ui/reports/ReportActions';
import { DataTable } from '@/shared/ui/tables/DataTable';
export function Accounting({ initialTab = 'journal', initialPartyId = '' }: AccountingViewProps) {
  const model = useAccountingView(initialTab);
  if (!model) return null;
  const {
    navigate,
    tab,
    setTab,
    isVoucher,
    setVoucher,
    from,
    setFrom,
    to,
    setTo,
    trial,
    headers,
    rows,
  } = model;
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
  return (
    <>
      {tabs}
      {tab === 'statement' ? (
        <AccountStatement initialPartyId={initialPartyId} />
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
      {isVoucher && <VoucherEditor kind="receipt" onClose={() => setVoucher(false)} />}
    </>
  );
}
