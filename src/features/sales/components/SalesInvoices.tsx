import { ViewButton } from '@/shared/ui/actions/ViewButton';
import { Pill } from '@/shared/ui/display/Pill';
import { SearchBox } from '@/shared/ui/filters/SearchBox';
import { Select } from '@/shared/ui/forms/Select';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { ReportActions } from '@/shared/ui/reports/ReportActions';
import { DataTable } from '@/shared/ui/tables/DataTable';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { printReport } from '@/core/reporting/service';
import { fmt } from '@/core/utils/formatters';
import { fiscalRange } from '@/features/accounting/services/models/fiscal-range';
import { invoiceReport } from '@/features/reports/services/models/report-documents';
import { SalesInvoiceEditor } from '@/features/sales/components/invoices/SalesInvoiceEditor';
import { useSalesInvoicesController } from '@/features/sales/hooks/useSalesInvoicesController';
import { InvoiceDetails } from '@/features/trade/components/InvoiceDetails';
import { returnRemaining } from '@/features/trade/services/models/partial-returns';
import { Download, Printer } from 'lucide-react';
export function SalesInvoices() {
  const model = useSalesInvoicesController();
  if (!model) return null;
  const {
    s,
    view,
    refresh,
    searchQuery,
    setQ,
    status,
    setStatus,
    documentType,
    setDocumentType,
    from,
    setFrom,
    to,
    setTo,
    editor,
    setEditor,
    setDetail,
    isConfirm,
    setConfirm,
    current,
    browse,
    list,
    close,
    csv,
  } = model;
  if (editor !== undefined)
    return (
      <SalesInvoiceEditor
        key={editor?.id || 'new-' + 'sale'}
        invoice={editor}
        onClose={close}
        onLoad={(invoice) => setEditor(invoice)}
        onNew={() => setEditor(null)}
      />
    );
  return (
    <>
      <PageHead
        title={'فواتير المبيعات والمرتجعات'}
        description="مسودة للمراجعة، وحفظ نهائي واحد يثبت المستند وآثاره."
        onAction={() => setEditor(null)}
        label={'فاتورة ' + '\u0645\u0628\u064A\u0639\u0627\u062A'}
        extra={<ReportActions onView={refresh} onExport={() => csv(list)} />}
      />
      <div className="document-stats">
        <div>
          <span>صافي الحركات المعروضة · YER</span>
          <strong>
            {fmt(
              list.filter((d) => d.status === 'final').reduce((n, d) => n + d.total * d.rate, 0),
            )}
          </strong>
        </div>
        <div>
          <span>عدد الفواتير</span>
          <strong>{list.length}</strong>
        </div>
        <div>
          <span>مسودات بلا أثر</span>
          <strong>{list.filter((d) => d.status === 'draft').length}</strong>
        </div>
      </div>
      <div className="filter-bar">
        <SearchBox value={searchQuery} onChange={setQ} placeholder="رقم الفاتورة أو اسم الطرف…" />
        <Select
          aria-label="نوع حركة الفاتورة"
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
        >
          <option value="all">الكل</option>
          <option value="originals">{'المبيعات'}</option>
          <option value="returns">{'مرتجعات المبيعات'}</option>
        </Select>
        <Select
          aria-label="حالة الفاتورة"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">جميع الحالات</option>
          <option value="final">محفوظة نهائيًا</option>
          <option value="draft">مسودة</option>
        </Select>
        <Input
          aria-label="من تاريخ"
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <Input
          aria-label="إلى تاريخ"
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <Button
          variant="ghost"
          onClick={() => {
            setQ('');
            setStatus('all');
            setDocumentType('all');
            setFrom(fiscalRange(s).from);
            setTo(fiscalRange(s).to);
          }}
        >
          مسح
        </Button>
      </div>
      <DataTable
        headers={[
          'رقم الفاتورة',
          'التاريخ',
          'العميل',
          'نوع الدفع',
          'الإجمالي',
          'الحالة',
          'عرض',
          'طباعة',
          'تصدير',
        ]}
        rows={list.map((d) => [
          <span className="code strong">{d.number}</span>,
          d.date,
          s.parties.find((party) => party.id === d.partyId)?.name || 'نقدي',
          d.payment === 'cash' ? 'نقدي' : d.payment === 'mixed' ? 'جزء نقدي وجزء آجل' : 'آجل',
          <strong className="numeric">
            {fmt(d.total)} <small>{d.currency}</small>
          </strong>,
          <Pill tone={d.reversedBy ? 'gray' : d.status === 'final' ? 'green' : 'amber'}>
            {d.isReturn
              ? 'مستند مرتجع'
              : d.reversedBy
                ? 'مرتجعة بالكامل'
                : s.invoiceReturns?.some((r) => r.sourceId === d.id)
                  ? d.lines.every((invoiceLine, i) => returnRemaining(s, d, i).qty === 0)
                    ? 'مرتجعة بالكامل'
                    : 'مرتجعة جزئيًا'
                  : d.status === 'final'
                    ? 'محفوظة'
                    : 'مسودة'}
          </Pill>,
          <ViewButton onClick={() => setDetail(d.isReturn ? d.number : d.id)} />,
          <Button
            aria-label={'طباعة ' + d.number}
            variant="ghost"
            size="icon-sm"
            onClick={() => {
              setDetail(d.isReturn ? d.number : d.id);
              setTimeout(() => printReport(invoiceReport(s, d)), 200);
            }}
          >
            <Printer size={15} />
          </Button>,
          <Button
            aria-label={'تصدير ' + d.number}
            variant="ghost"
            size="icon-sm"
            onClick={() => csv([d])}
          >
            <Download size={15} />
          </Button>,
        ])}
      />
      {current && (
        <InvoiceDetails
          current={current}
          browse={browse}
          view={view}
          setDetail={setDetail}
          setEditor={setEditor}
          isConfirm={isConfirm}
          setConfirm={setConfirm}
          csv={csv}
        />
      )}{' '}
    </>
  );
}
