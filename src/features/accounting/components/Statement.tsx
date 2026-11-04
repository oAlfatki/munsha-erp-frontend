import { ROUTES } from '@/core/config/navigation-paths';





import { exportPdf,printReport } from '@/core/reporting/service';
import { fmt } from '@/core/utils/formatters';
import { VoucherEditor } from '@/features/accounting/components/VoucherEditor';
import { useAccountStatementQuery } from '@/features/accounting/queries/useAccountStatementQuery';
import { fiscalRange } from "@/features/accounting/public/fiscal-range";
import { statementData } from "@/features/trade/public/presentation";
import { Modal } from '@/shared/ui/dialogs/Modal';
import { Pill } from '@/shared/ui/display/Pill';
import { AmountWords } from '@/shared/ui/documents/AmountWords';
import { DocumentNavigator } from '@/shared/ui/documents/DocumentNavigator';
import { TotalsFooter } from '@/shared/ui/documents/TotalsFooter';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { Form as ValidatedForm } from '@/shared/ui/forms/ValidatedForm';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { DataTable } from '@/shared/ui/tables/DataTable';
import {
ArrowLeft,
Banknote,
ChartNoAxesColumn,
Download,
Eye,
Printer,
ReceiptText,
} from 'lucide-react';
import { useState } from 'react';

export function AccountStatement({initialPartyId=''}:{initialPartyId?:string}) {
  const { state: s, branchId, view, navigate } = useAccountStatementQuery();
  const [draft, setDraft] = useState({
      party:initialPartyId,
      ...fiscalRange(s!),
      query: '',
    }),
    [filters, setFilters] = useState(draft),
    [isSummary, setSummary] = useState(false),
    [voucher, setVoucher] = useState<'receipt' | 'payment' | null>(null),
    [detail, setDetail] = useState<string | null>(null),
    [rangeError, setRangeError] = useState('');
  if (!s) return null;
  const data = statementData(s, branchId, filters.party, filters.from, filters.to, filters.query),
    party = s.parties.find((p) => p.id === filters.party);
  const headers = [
    'التاريخ',
    'اليوم',
    'المستند',
    'نوع الحركة',
    'البيان',
    'العملة',
    'مدين',
    'دائن',
    'الرصيد الجاري',
    'الحالة',
  ];
  const rows = data.rows.map((r) => [
    r.entry.date,
    new Intl.DateTimeFormat('ar-YE', { weekday: 'long', timeZone: 'Asia/Aden' }).format(
      new Date(r.entry.date + 'T12:00:00Z'),
    ),
    r.entry.reference,
    r.entry.reference.startsWith('SAL')
      ? 'فاتورة مبيعات'
      : r.entry.reference.startsWith('PUR')
        ? 'فاتورة مشتريات'
        : r.entry.reference.startsWith('RET')
          ? 'مرتجع'
          : r.entry.reference.startsWith('RCV')
            ? 'سند قبض'
            : r.entry.reference.startsWith('PAY')
              ? 'سند صرف'
              : r.entry.reference.startsWith('OPEN')
                ? 'افتتاح'
                : 'قيد',
    r.entry.description,
    'YER',
    r.debit,
    r.credit,
    Math.abs(r.running),
    r.running > 0 ? 'مدين' : r.running < 0 ? 'دائن' : 'متزن',
  ]);
  const handleApply = () => {
    if (draft.from && draft.to && draft.from > draft.to) {
      setRangeError('تاريخ البداية بعد النهاية');
      return;
    }
    setRangeError('');
    setFilters({ ...draft });
    setDetail(null);
  };
  const summaryHeaders = [
    'الحساب',
    'العملة',
    'رصيد سابق',
    'إجمالي مدين',
    'إجمالي دائن',
    'الرصيد الختامي',
    'الحالة',
  ];
  const summaryRows = [
    [
      party?.name || '—',
      'YER',
      data.opening,
      data.debit,
      data.credit,
      Math.abs(data.closing),
      data.closing > 0 ? 'مدين' : data.closing < 0 ? 'دائن' : 'متزن',
    ],
  ];
  const reportOptions = {
    metadata: [
      ['اسم الحساب', party?.name || '—'],
      ['الهاتف', party?.phone || '—'],
      ['الفترة', (filters.from || 'بداية السجلات') + ' — ' + filters.to],
      ['العملة', 'YER'],
      ['رصيد سابق', String(data.opening)],
      ...(filters.query ? [['بحث', filters.query]] : []),
    ] as [string, string][],
    notes: ['البحث يخفي صفوفًا فقط؛ المجاميع والرصيد الجاري للفترة كاملة.'],
  };
  const current = data.rows.find((r) => r.entry.id === detail);
  const handleExportCurrent = () =>
    exportPdf(
      'كشف حساب ' + (party?.name || ''),
      isSummary ? summaryHeaders : headers,
      isSummary ? summaryRows : rows,
      reportOptions,
    );
  return (
    <>
      <PageHead
        title="كشف حساب"
        description="الحركة التفصيلية ورصيد سابق وإجماليات ورصيد ختامي للفرع الحالي."
        extra={
          <div className="report-toolbar">
            <Button onClick={handleApply}>
              <Eye size={16} />
              عرض
            </Button>
            <Button variant="outline" disabled={!party} onClick={() => printReport()}>
              <Printer size={16} />
              طباعة
            </Button>
            <Button variant="outline" disabled={!party} onClick={handleExportCurrent}>
              <Download size={16} />
              تصدير
            </Button>
            <Button
              variant={isSummary ? 'default' : 'outline'}
              aria-pressed={isSummary}
              onClick={() => setSummary(!isSummary)}
            >
              <ChartNoAxesColumn size={16} />
              {isSummary ? 'تفصيلي' : 'إجمالي'}
            </Button>
          </div>
        }
      />
      <div className="statement-top">
        <ValidatedForm
          className="panel form-panel"
          onSubmit={(e) => {
            e.preventDefault();
            handleApply();
          }}
        >
          <div className="form-grid">
            <Field label="اسم الحساب / الطرف *">
              <Select
                value={draft.party}
                required
                onChange={(e) => setDraft({ ...draft, party: e.target.value })}
              >
                <option value="">اختر اسم العميل أو المورد</option>
                {s.parties.map((party) => (
                  <option key={party.id} value={party.id}>
                    {party.name}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="رقم الهاتف">
              <div className="input-readonly">
                {s.parties.find((p) => p.id === draft.party)?.phone || '—'}
              </div>
            </Field>
            <Field label="من تاريخ">
              <Input
                type="date"
                value={draft.from}
                onChange={(e) => setDraft({ ...draft, from: e.target.value })}
              />
            </Field>
            <Field label="إلى تاريخ">
              <Input
                type="date"
                value={draft.to}
                onChange={(e) => setDraft({ ...draft, to: e.target.value })}
              />
            </Field>
          </div>
          <div className="statement-search">
            <Input
              aria-label="بحث في كشف الحساب"
              placeholder="ابحث بالبيان أو رقم المستند…"
              value={draft.query}
              onChange={(e) => setDraft({ ...draft, query: e.target.value })}
            />
            <Button type="submit" variant="outline">
              عرض النتائج
            </Button>
          </div>
          {rangeError && (
            <p role="alert" className="negative">
              {rangeError}
            </p>
          )}
        </ValidatedForm>
        <section className="panel statement-summary">
          <h2>ملخص الحساب</h2>
          <DataTable
            headers={['العملة', 'مدين', 'دائن', 'الرصيد']}
            rows={[['YER', fmt(data.debit), fmt(data.credit), fmt(Math.abs(data.closing))]]}
          />
          <Pill tone={data.closing === 0 ? 'gray' : 'green'}>
            {data.closing > 0 ? 'مدين' : data.closing < 0 ? 'دائن' : 'متزن'}
          </Pill>
          <p>السابق + المدين − الدائن = الختامي</p>
        </section>
      </div>
      <div className="statement-actions no-print">
        <Button variant="outline" onClick={() => setVoucher('receipt')}>
          <ReceiptText size={16} />
          سند قبض
        </Button>
        <Button variant="outline" onClick={() => setVoucher('payment')}>
          <Banknote size={16} />
          سند صرف
        </Button>
        <span>
          {party?.name || 'اختر حسابًا ثم اضغط عرض'} ·{' '}
          {s.branches.find((branch) => branch.id === branchId)?.name}
        </span>
      </div>
      {party && (
        <>
          <div className="print-report-heading">
            <p data-report-meta="اسم الحساب">{party.name}</p>
            <p data-report-meta="الفترة">
              {filters.from || 'بداية السجلات'} — {filters.to}
            </p>
            <h2>{s.organization.name}</h2>
            <h3>كشف حساب {party.name}</h3>
            <p>
              {filters.from || 'بداية السجلات'} — {filters.to || 'آخر حركة'} · YER ·{' '}
              {isSummary ? 'إجمالي' : 'تفصيلي'}
            </p>
          </div>
          {!isSummary && (
            <div className="info-note">
              رصيد قبل الفترة: {fmt(Math.abs(data.opening))} YER{' '}
              {data.opening < 0 ? 'دائن' : 'مدين'} — البحث يخفي صفوفًا فقط ولا يعيد احتساب الرصيد
              الجاري أو المجاميع الكاملة للفترة.
            </div>
          )}
          <DataTable
            headers={isSummary ? summaryHeaders : [...headers, 'عرض']}
            rows={
              isSummary
                ? summaryRows.map((r) => r.map((v) => (typeof v === 'number' ? fmt(v) : v)))
                : rows.map((r, i) => [
                    ...r.map((v) => (typeof v === 'number' ? fmt(v) : v)),
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setDetail(data.rows[i].entry.id)}
                    >
                      عرض
                    </Button>,
                  ])
            }
          />
          <TotalsFooter
            rows={[
              ['الرصيد السابق YER', data.opening],
              ['إجمالي مدين', data.debit],
              ['إجمالي دائن', data.credit],
              ['الرصيد الختامي', Math.abs(data.closing)],
              ['عدد حركات الفترة', data.count],
            ]}
            amount={Math.abs(data.closing)}
          />
        </>
      )}
      {voucher && (
        <VoucherEditor
          key={voucher}
          kind={voucher}
          partyId={
            party?.kind === (voucher === 'receipt' ? 'customer' : 'supplier') ? party.id : ''
          }
          onClose={() => setVoucher(null)}
        />
      )}
      {current && (
        <Modal
          isOpen
          title={'المستند ' + current.entry.reference}
          description={current.entry.description}
          onClose={() => setDetail(null)}
          isWide
        >
          <DocumentNavigator
            index={data.rows.findIndex((r) => r.entry.id === detail)}
            count={data.rows.length}
            onChange={(i) => setDetail(data.rows[i].entry.id)}
          />
          <DataTable
            headers={['الحساب', 'مدين', 'دائن']}
            rows={current.entry.lines.map((journalLine) => [
              journalLine.account,
              fmt(journalLine.debit),
              fmt(journalLine.credit),
            ])}
          />
          <AmountWords amount={current.debit || current.credit} />
          <div className="dialog-actions">
            <Button onClick={() => printReport()}>
              <Printer size={16} />
              طباعة
            </Button>
            {s.invoices.some((invoice) => invoice.number === current.entry.reference) && (
              <Button
                variant="outline"
                onClick={() =>
                  navigate(
                    ROUTES.DOCUMENT_PREFIX +
                      encodeURIComponent(
                        s.invoices.find((invoice) => invoice.number === current.entry.reference)!
                          .id,
                      ),
                  )
                }
              >
                فتح الفاتورة
                <ArrowLeft size={16} />
              </Button>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}
