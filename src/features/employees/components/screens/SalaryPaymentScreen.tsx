import { useValidatedForm } from '@/core/hooks/useValidatedForm';
import { fmt, today } from '@/core/utils/formatters';
import { useOperation } from '@/features/accounting/public';
import { useSalaryPaymentScreenQuery } from '@/features/employees/queries/useSalaryPaymentScreenQuery';
import { extras, operationSchema } from '@/features/ledger/public';
import { Modal } from '@/shared/ui/dialogs/Modal';
import { Pill } from '@/shared/ui/display/Pill';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { Form as ValidatedForm } from '@/shared/ui/forms/ValidatedForm';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { DataTable } from '@/shared/ui/tables/DataTable';
import { CheckCheck, Save, Undo2 } from 'lucide-react';
import { useState } from 'react';
export function SalaryPaymentScreen() {
  const screen = {
    id: 'salary-payment',
    module: 'employees',
    title: 'صرف رواتب الموظفين',
    page: 67,
    mode: 'operation',
    operation: 'salaryPayment',
    note: 'صرف كامل لمستحق راتب مثبت، دون تسجيل المصروف مرة ثانية.',
  };
  const { state: s, branchId, busy: isBusy } = useSalaryPaymentScreenQuery();
  const operationMutationRequest = useOperation();
  const operationForm = useValidatedForm(operationSchema, operationMutationRequest.execute);
  const operationMutation = { ...operationMutationRequest, execute: operationForm.submit };
  const [date, setDate] = useState(today());
  const [subject, setSubject] = useState('');
  const [amount, setAmount] = useState('');
  const [, setQty] = useState('');
  const [, setWarehouse] = useState('');
  const [source, setSource] = useState('');
  const [note, setNote] = useState('');
  const [isConfirm, setConfirm] = useState(false);
  if (!s) return null;
  const x = extras(s);
  const sources = x.operations.filter(
    (o) => o.kind === 'payroll' && o.branchId === branchId && !o.paid && true,
  );
  const sourceDoc = sources.find((o) => o.id === source);
  const actualAmount = sourceDoc && true ? sourceDoc.amount : Number(amount || 0);
  const payload = {
    kind: 'salaryPayment',
    date,
    branchId,
    subject: sourceDoc?.subject || subject,
    amount: actualAmount,
    note,
    period: undefined,
    source: source || undefined,
    qty: undefined,
    warehouseId: undefined,
  };
  const history = x.operations
    .filter((o) => o.branchId === branchId && o.kind === 'salaryPayment')
    .slice()
    .reverse();
  return (
    <>
      <PageHead
        title={screen.title}
        description={screen.note || 'مستند بالعملة الأساسية مع تحقق من القواعد قبل الحفظ.'}
      />
      <ValidatedForm
        className="panel form-panel"
        onSubmit={(e) => {
          e.preventDefault();
          setConfirm(true);
        }}
      >
        <div className="form-section-title">
          <h2>بيانات المستند</h2>
          <Pill>{'حفظ نهائي = إثبات العملية'}</Pill>
        </div>
        <div className="form-grid">
          {
            <Field label="المستند المصدر *">
              <Select
                required
                value={source}
                onChange={(e) => {
                  setSource(e.target.value);
                  const v = sources.find((v) => v.id === e.target.value);
                  if (v) {
                    setSubject(v.subject);
                    setWarehouse(v.warehouseId || '');
                    setQty(String(v.qty ?? ''));
                    setAmount(String(v.amount));
                  }
                }}
              >
                <option value="">اختر مصدرًا لم يسوّ بعد</option>
                {sources.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.reference} · {v.date} · {fmt(v.amount)} YER
                  </option>
                ))}
              </Select>
            </Field>
          }
          <Field label="تاريخ المستند *">
            <Input type="date" required value={date} onChange={(e) => setDate(e.target.value)} />
          </Field>
          {false}
          {false}
          {
            <Field label={'المبلغ · YER *'}>
              <Input
                type="number"
                min="0.01"
                step=".01"
                required
                readOnly={true}
                value={String(actualAmount || '')}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Field>
          }
          <Field label="الفرع">
            <div className="input-readonly">
              {s.branches.find((branch) => branch.id === branchId)?.name}
            </div>
          </Field>
          <Field label="البيان / سبب العملية *">
            <Input required value={note} onChange={(e) => setNote(e.target.value)} />
          </Field>
        </div>
        {false}
        {false}
        <div className="dialog-actions">
          <Button disabled={isBusy}>
            <CheckCheck size={16} />
            مراجعة ثم حفظ
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setSubject('');
              setSource('');
              setAmount('');
              setQty('');
              setNote('');
            }}
          >
            <Undo2 size={16} />
            جديد / تراجع
          </Button>
        </div>
      </ValidatedForm>
      <h2 className="section-heading">المستندات المحفوظة</h2>
      <DataTable
        headers={['المرجع', 'التاريخ', 'الفترة', 'القيمة YER', 'الكمية الأساسية', 'الحالة']}
        rows={history.map((o) => [
          o.reference,
          o.date,
          o.period || '—',
          fmt(o.amount),
          o.qty ?? '—',
          <Pill>{o.kind === 'count' ? 'محضر محفوظ' : o.paid ? 'مسدد' : 'نهائي'}</Pill>,
        ])}
      />
      <Modal
        isOpen={isConfirm}
        title="مراجعة العملية"
        description="الحفظ ينفذ عملية واحدة في مساحة التجربة، ولا يمكن تعديل المستند النهائي."
        onClose={() => setConfirm(false)}
      >
        <dl className="confirm-grid">
          <dt>نوع المستند</dt>
          <dd>{screen.title}</dd>
          <dt>التاريخ</dt>
          <dd>{date}</dd>
          <dt>المصدر</dt>
          <dd>{sourceDoc?.reference || 'مستند جديد'}</dd>
          <dt>المبلغ</dt>
          <dd>{fmt(actualAmount) + ' YER'}</dd>
          <dt>البيان</dt>
          <dd>{note}</dd>
        </dl>
        <div className="dialog-actions">
          <Button
            disabled={isBusy}
            onClick={async () => {
              if (await operationMutation.execute(payload)) {
                setConfirm(false);
                setSource('');
                setSubject('');
                setAmount('');
                setQty('');
                setNote('');
              }
            }}
          >
            <Save size={16} />
            حفظ {'نهائي'}
          </Button>
          <Button variant="outline" onClick={() => setConfirm(false)}>
            تراجع
          </Button>
        </div>
      </Modal>
    </>
  );
}
