import { fmt } from '@/core/utils/formatters';
import { printReport } from '@/shared/services/report-actions';
import type { ReportViewerProps } from '@/shared/types/reporting/ReportViewerProps';
import { ViewButton } from '@/shared/ui/actions/ViewButton';
import { Modal } from '@/shared/ui/dialogs/Modal';
import { AmountWords } from '@/shared/ui/documents/AmountWords';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { Form as ValidatedForm } from '@/shared/ui/forms/ValidatedForm';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { DataTable } from '@/shared/ui/tables/DataTable';
import { Download, Eye, Printer, Search } from 'lucide-react';

/** Shared report presentation only. Feature modules own calculations, columns and specialized filters/details. */

export function ReportViewer({
  title,
  model,
  shouldShowFrom: isShowFrom = true,
  isAsOf: isAsOf = false,
  shouldShowWarehouse: isShowWarehouse = false,
  extraFilters,
  renderDetails,
  rowDocument,
  renderVisualization,
}: ReportViewerProps) {

  if (!model) return null;
  const {
    context,
    initial,
    draft,
    setDraft,
    filters,
    setFilters,
    selected,
    setSelected,
    isSummary,
    setSummary,
    handleApplyFilters,
    data,
    summaryCols,
    report,
    exportRows,
  } = model;
  return (
    <>
      <PageHead
        title={title}
        description="عرض وطباعة وتصدير ضمن الفرع والمرشحات المختارة — المبالغ بالعملة الأساسية ما لم يذكر غير ذلك."
        extra={
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleApplyFilters}>
              <Eye size={16} />
              عرض
            </Button>
            <Button variant="outline" onClick={() => printReport(report())}>
              <Printer size={16} />
              طباعة
            </Button>
            <Button variant="outline" onClick={() => exportRows(data.rows)}>
              <Download size={16} />
              تصدير
            </Button>
          </div>
        }
      />
      <ValidatedForm
        className="filter-bar report-filters"
        onSubmit={(e) => {
          e.preventDefault();
          handleApplyFilters();
        }}
      >
        {isShowFrom && (
          <Field label="من تاريخ">
            <Input
              type="date"
              value={draft.from}
              onChange={(e) => setDraft({ ...draft, from: e.target.value })}
            />
          </Field>
        )}
        <Field label={isAsOf ? 'كما في تاريخ' : 'إلى تاريخ'}>
          <Input
            type="date"
            value={draft.to}
            onChange={(e) => setDraft({ ...draft, to: e.target.value })}
          />
        </Field>
        {extraFilters?.(draft, setDraft)}
        {isShowWarehouse && (
          <Field label="المخزن">
            <Select
              value={draft.warehouse}
              onChange={(e) => setDraft({ ...draft, warehouse: e.target.value })}
            >
              <option value="">جميع مخازن الفرع</option>
              {context.warehouseOptions.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.name}
                </option>
              ))}
            </Select>
          </Field>
        )}
        <Field label="بحث داخل النتائج">
          <Input
            placeholder="اسم، رمز، مرجع…"
            value={draft.query}
            onChange={(e) => setDraft({ ...draft, query: e.target.value })}
          />
        </Field>
        <Button type="submit">
          <Search size={16} />
          عرض النتائج
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            setDraft(initial);
            setFilters(initial);
          }}
        >
          مسح المرشحات
        </Button>
      </ValidatedForm>
      <div className="report-context">
        <span>
          {context.organizationName} · {context.branchName}
        </span>
        <span>
          {filters.from || 'بداية السجلات'} ← {filters.to || 'آخر حركة'}
        </span>
        {summaryCols.length > 0 && (
          <label className="check-label">
            <input
              type="checkbox"
              checked={isSummary}
              onChange={(e) => setSummary(e.target.checked)}
            />
            عرض إجمالي
          </label>
        )}
      </div>
      {data.note && <div className="info-note">{data.note}</div>}
      <div className="document-stats">
        <div>
          <span>عدد النتائج</span>
          <strong>{data.rows.length}</strong>
        </div>
        <div>
          <span>{data.total !== undefined ? 'إجمالي التقرير · YER' : 'نطاق العرض'}</span>
          <strong>{data.total !== undefined ? fmt(data.total) : 'الفرع الحالي'}</strong>
        </div>
      </div>
      {renderVisualization?.(data)}
      {isSummary && summaryCols.length > 0 && (
        <DataTable
          headers={['عملة التجميع', ...summaryCols.map((i) => data.headers[i])]}
          rows={[
            [
              'YER',
              ...summaryCols.map((i) => fmt(data.rows.reduce((n, r) => n + Number(r[i] || 0), 0))),
            ],
          ]}
        />
      )}
      {(!isSummary || !summaryCols.length) && (
        <DataTable
          headers={[...data.headers, 'عرض', 'طباعة', 'تصدير']}
          rows={data.rows.map((row) => [
            ...row.map((v) => (typeof v === 'number' ? fmt(v) : v)),
            <ViewButton onClick={() => setSelected(row)} />,
            <Button
              size="sm"
              variant="ghost"
              aria-label="طباعة السجل"
              onClick={() => setSelected(row)}
            >
              <Printer size={15} />
            </Button>,
            <Button
              size="sm"
              variant="ghost"
              aria-label="تصدير السجل"
              onClick={() => exportRows([row])}
            >
              <Download size={15} />
            </Button>,
          ])}
        />
      )}
      {data.total !== undefined && <AmountWords amount={data.total} />}
      {selected && (
        <Modal
          isOpen
          title="تفاصيل سجل التقرير"
          description={title}
          onClose={() => setSelected(null)}
          isWide
        >
          {renderDetails?.(selected) ?? (
            <div className="report-detail">
              <h2>{context.organizationName}</h2>
              <p>
                {title} — {context.branchName}
              </p>
              <dl>
                {data.headers.map((h, i) => (
                  <div key={h}>
                    <dt>{h}</dt>
                    <dd>
                      {typeof selected[i] === 'number' ? fmt(Number(selected[i])) : selected[i]}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
          <div className="dialog-actions">
            <Button onClick={() => printReport(rowDocument?.(selected) || report([selected]))}>
              <Printer size={16} />
              طباعة السجل
            </Button>
            <Button variant="outline" onClick={() => exportRows([selected])}>
              <Download size={16} />
              تصدير السجل
            </Button>
            <Button variant="ghost" onClick={() => setSelected(null)}>
              تراجع
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
