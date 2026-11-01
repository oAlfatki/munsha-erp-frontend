import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { Form as ValidatedForm } from '@/shared/ui/forms/ValidatedForm';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { ReportActions } from '@/shared/ui/reports/ReportActions';
import { DataTable } from '@/shared/ui/tables/DataTable';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { exportPdf } from '@/core/reporting/service';
import { fmt } from '@/core/utils/formatters';
import { useSalesTargetsController } from '@/features/sales/hooks/useSalesTargetsController';
export function SalesTargets() {
  const model = useSalesTargetsController();
  if (!model) return null;
  const {
    s,
    branchId,
    isBusy,
    salesTargetMutation,
    period,
    setPeriod,
    employee,
    setEmployee,
    amount,
    setAmount,
    note,
    setNote,
    rows,
    headers,
    csvRows,
  } = model;
  return (
    <>
      <PageHead
        title="أهداف المبيعات ومتابعة الإنجاز"
        description="هدف شهري واحد للفرع، يقارن بصافي مبيعاته الفعلية بعد المرتجعات والخصومات."
        extra={<ReportActions onExport={() => exportPdf('أهداف المبيعات', headers, csvRows)} />}
      />
      <ValidatedForm
        className="panel form-panel"
        onSubmit={async (e) => {
          e.preventDefault();
          await salesTargetMutation.execute({ branchId, period, employee, amount, note });
        }}
      >
        <div className="form-grid">
          <Field label="الفترة">
            <Input
              required
              type="month"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            />
          </Field>
          <Field label="المسؤول عن متابعة الهدف">
            <Select value={employee} onChange={(e) => setEmployee(e.target.value)}>
              <option value="">غير محدد</option>
              {s.employees
                .filter((employee) => employee.active && employee.branchId === branchId)
                .map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
            </Select>
          </Field>
          <Field label="الهدف YER">
            <Input
              required
              type="number"
              min=".01"
              step=".01"
              value={amount}
              onChange={(e) => setAmount(+e.target.value)}
            />
          </Field>
          <Field label="ملاحظات">
            <Input value={note} onChange={(e) => setNote(e.target.value)} />
          </Field>
        </div>
        <Button disabled={isBusy}>حفظ الهدف</Button>
      </ValidatedForm>
      <div className="info-note">
        المسؤول للمتابعة؛ الإنجاز محسوب للفرع كله لعدم تسجيل موظف البيع في الفواتير السابقة. حفظ
        الهدف لا يثبت عمولة أو قيدًا ماليًا.
      </div>
      <DataTable
        headers={[...headers, 'تعديل']}
        rows={rows.map(({ t }, i) => [
          ...csvRows[i].map((v) => (typeof v === 'number' ? fmt(v) : v)),
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setPeriod(String(t.period));
              setEmployee(String(t.employee || ''));
              setAmount(Number(t.amount));
              setNote(String(t.note || ''));
            }}
          >
            تعديل
          </Button>,
        ])}
      />
    </>
  );
}
