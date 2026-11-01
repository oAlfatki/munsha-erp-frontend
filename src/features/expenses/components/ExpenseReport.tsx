import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { ReportActions } from '@/shared/ui/reports/ReportActions';
import { DataTable } from '@/shared/ui/tables/DataTable';
import { Input } from '@/shared/ui/primitives/input';
import { exportPdf } from '@/core/reporting/service';
import type { ExpenseReportProps } from '@/features/expenses/types/ExpenseReportProps';
export function ExpenseReport({ controller }: ExpenseReportProps) {
  const {
    s: workspace,
    navigate,
    from,
    setFrom,
    to,
    setTo,
    typeId,
    setTypeId,
    reportBranch,
    setReportBranch,
    types,
    all,
    typeName,
    reportRows,
  } = controller;
  return (
    <>
      <PageHead
        title={'تقارير المصروفات'}
        description="مصروفات حالية ومستحقة ومقدمة في سجل موحد."
        onAction={() => navigate('/expenses/add')}
        label="إضافة مصروف"
        extra={
          <ReportActions
            onExport={() =>
              exportPdf(
                'المصروفات',
                [
                  'المستند',
                  'النوع',
                  'المعالجة',
                  'المصروف المعترف به YER',
                  'المستحق YER',
                  'المقدم المتبقي YER',
                ],
                reportRows,
                {
                  metadata: [
                    ['الفترة', from + ' — ' + to],
                    [
                      'الفرع',
                      reportBranch
                        ? workspace.branches.find((branch) => branch.id === reportBranch)?.name ||
                          ''
                        : 'جميع الفروع',
                    ],
                  ],
                },
              )
            }
          />
        }
      />
      {
        <>
          <div className="filter-bar">
            <Field label="من تاريخ — المصروف المعترف به">
              <Input type="date" value={from} max={to} onChange={(e) => setFrom(e.target.value)} />
            </Field>
            <Field label="إلى تاريخ — الأرصدة كما في">
              <Input type="date" value={to} min={from} onChange={(e) => setTo(e.target.value)} />
            </Field>
            <Field label="نوع المصروف">
              <Select value={typeId} onChange={(e) => setTypeId(e.target.value)}>
                <option value="">كل الأنواع</option>
                {[...new Set([...types.map((t) => t.id), ...all.map((d) => d.typeId)])].map(
                  (id) => (
                    <option key={id} value={id}>
                      {typeName(id)}
                    </option>
                  ),
                )}
              </Select>
            </Field>
            <Field label="الفرع">
              <Select value={reportBranch} onChange={(e) => setReportBranch(e.target.value)}>
                <option value="">جميع الفروع</option>
                {workspace.branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </Select>
            </Field>
          </div>
          <DataTable
            headers={[
              'المستند',
              'النوع',
              'المعالجة',
              'المصروف المعترف به · YER',
              'المستحق كما في · YER',
              'المقدم المتبقي كما في · YER',
            ]}
            rows={reportRows}
          />
          <p className="info-note">
            المصروف المعترف به داخل الفترة من القيود؛ المستحق والمقدم المتبقي تراكميان حتى نهاية
            الفترة. السداد لا يُحتسب كمصروف مرة ثانية.
          </p>
        </>
      }
      {null}
      {null}
    </>
  );
}
