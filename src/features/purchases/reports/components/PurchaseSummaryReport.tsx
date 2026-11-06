import { ROUTES } from '@/core/config/navigation-paths';

import { exportDocument, printReport } from '@/core/reporting/service';
import type { ReportDocument } from '@/core/types/reports/ReportDocument';
import { amountInWords } from '@/core/utils/amount-in-words';
import { fmt } from '@/core/utils/formatters';
import { fiscalRange } from '@/features/ledger/public';
import { usePurchaseSummaryReportQuery } from '@/features/purchases/reports/queries/usePurchaseSummaryReportQuery';
import type { TradeFilters } from '@/features/trade/public';
import { tradeSummary } from '@/features/trade/public';
import { AmountWords } from '@/shared/ui/documents/AmountWords';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { Form as ValidatedForm } from '@/shared/ui/forms/ValidatedForm';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { DataTable } from '@/shared/ui/tables/DataTable';
import { Download, Eye, Printer } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
export function PurchaseSummaryReport() {
  const { state: s, branchId, navigate } = usePurchaseSummaryReportQuery();
  const initial: TradeFilters = { ...fiscalRange(s!), warehouse: '', user: '' };
  const [draft, setDraft] = useState(initial);
  const [filters, setFilters] = useState(initial);
  if (!s) return null;
  const report = tradeSummary(s, 'purchase', branchId, filters);
  const handleApply = () => {
    if (draft.from && draft.to && draft.from > draft.to) {
      toast.error('بداية الفترة بعد نهايتها');
      return;
    }
    setFilters({ ...draft });
  };
  const printable = (): ReportDocument => ({
    title: '\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0634\u062A\u0631\u064A\u0627\u062A',
    metadata: [
      ['الفترة', (filters.from || 'بداية السجلات') + ' — ' + filters.to],
      [
        'المخزن',
        filters.warehouse
          ? s.warehouses.find((w) => w.id === filters.warehouse)?.name || ''
          : 'جميع مخازن الفرع',
      ],
      ...[],
    ],
    tables: [{ headers: report.headers, rows: report.rows }],
    totals: [
      ['عدد الفواتير', String(report.count)],
      ['عدد المرتجعات', String(report.returnCount)],
      [
        'صافي ' + '\u0627\u0644\u0645\u0634\u062A\u0631\u064A\u0627\u062A' + ' YER',
        fmt(report.total),
      ],
    ],
    words: [amountInWords(report.total, 'YER')],
    notes: [report.note],
  });
  return (
    <>
      <PageHead
        title={
          '\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0634\u062A\u0631\u064A\u0627\u062A'
        }
        description="ملخص الإجمالي والمرتجعات والخصم والصافي ضمن الفترة والمخزن المختارين."
        extra={
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleApply}>
              <Eye size={16} />
              عرض
            </Button>
            <Button variant="outline" onClick={() => printReport(printable())}>
              <Printer size={16} />
              طباعة
            </Button>
            <Button variant="outline" onClick={() => exportDocument(printable())}>
              <Download size={16} />
              تصدير
            </Button>
          </div>
        }
      />
      <ValidatedForm
        className="filter-bar"
        onSubmit={(e) => {
          e.preventDefault();
          handleApply();
        }}
      >
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
        <Field label="المخزن">
          <Select
            value={draft.warehouse}
            onChange={(e) => setDraft({ ...draft, warehouse: e.target.value })}
          >
            <option value="">جميع مخازن الفرع</option>
            {s.warehouses
              .filter((warehouse) => warehouse.branchId === branchId)
              .map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.name}
                </option>
              ))}
          </Select>
        </Field>
        {false}
        <Button>عرض النتائج</Button>
      </ValidatedForm>
      <div className="report-context">
        <span>
          {s.organization.name} · {s.branches.find((branch) => branch.id === branchId)?.name}
        </span>
        <span>
          {filters.from || 'بداية السجلات'} — {filters.to}
        </span>
        <span>
          {filters.warehouse
            ? s.warehouses.find((w) => w.id === filters.warehouse)?.name
            : 'جميع مخازن الفرع'}
        </span>
        {false}
      </div>
      <section className="panel trade-summary">
        <DataTable
          headers={report.headers}
          rows={report.rows.map((row) => row.map((v) => (typeof v === 'number' ? fmt(v) : v)))}
        />
        <p>{'صافي المشتريات بالحروف'}</p>
        <AmountWords amount={report.total} />
      </section>
      <div className="document-stats">
        <div>
          <span>عدد الفواتير النهائية في الفترة</span>
          <strong>{report.count}</strong>
        </div>
        <div>
          <span>عدد المرتجعات في الفترة</span>
          <strong>{report.returnCount}</strong>
        </div>
        <div>
          <span>صافي {'المشتريات'} · YER</span>
          <strong>{fmt(report.total)}</strong>
        </div>
      </div>
      <p className="info-note">{report.note}</p>
      <Button variant="outline" onClick={() => navigate(ROUTES.PURCHASES)}>
        قائمة الفواتير والمرتجعات بالتفصيل
      </Button>
    </>
  );
}
