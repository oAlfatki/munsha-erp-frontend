import { fmt, today } from '@/core/utils/formatters';
import { useDepreciationScreenQuery } from '@/features/accounting/assets/queries/useDepreciationScreenQuery';
import { useOperation } from '@/features/accounting/overview/hooks/useOperation';
import { extras, operationSchema } from '@/features/ledger/public';
import { useValidatedForm } from '@/shared/hooks/useValidatedForm';
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

export function DepreciationScreen() {

  const screen = {
    id: 'depreciation',
    module: 'accounts',
    title: 'إثبات إهلاك فترة',
    page: 158,
    mode: 'operation',
    operation: 'depreciation',
    note: 'قسط ثابت شهري أو مبلغ متغير معتمد للفترة، دون تجاوز التكلفة ناقص التخريدية. يمنع تكرار الأصل والفترة.',
  };
  const { state, branchId, busy: isBusy } = useDepreciationScreenQuery();
  const operationMutationRequest = useOperation();
  const operationForm = useValidatedForm(operationSchema, operationMutationRequest.execute);
  const operationMutation = { ...operationMutationRequest, execute: operationForm.submit };
  const [date, setDate] = useState(today());
  const [period, setPeriod] = useState(today().slice(0, 7));
  const [subject, setSubject] = useState('');
  const [amount, setAmount] = useState('');
  const [, setQty] = useState('');
  const [source, setSource] = useState('');
  const [note, setNote] = useState('');
  const [isConfirm, setConfirm] = useState(false);
  if (!state) return null;
  const x = extras(state);
  const sources = x.operations.filter(
    (o) => o.kind === 'count' && o.branchId === branchId && !o.paid && true,
  );
  const sourceDoc = sources.find((o) => o.id === source);
  const options = (x.records.assets || [])
    .filter((a) => a.branchId === branchId && a.active)
    .map((a) => [a.id, a.name]);
  const chosenAsset = x.records.assets?.find((a) => a.id === subject);
  const isVariableDepreciation = chosenAsset?.method === 'variable';
  const actualAmount = Number(amount || 0);
  const payload = {
    kind: 'depreciation',
    date,
    branchId,
    subject: sourceDoc?.subject || subject,
    amount: actualAmount,
    note,
    period: period,
    source: source || undefined,
    qty: undefined,
    warehouseId: undefined,
  };
  const history = x.operations
    .filter((o) => o.branchId === branchId && o.kind === 'depreciation')
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
            <Field label={'\u0627\u0644\u0623\u0635\u0644' + ' *'}>
              <Select
                value={subject}
                required
                onChange={(e) => {
                  setSubject(e.target.value);
                  setAmount('');
                }}
              >
                <option value="">اختر…</option>
                {options.map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </Select>
            </Field>
          }
          <Field label="تاريخ المستند *">
            <Input type="date" required value={date} onChange={(e) => setDate(e.target.value)} />
          </Field>
          {
            <Field label="الفترة *">
              <Input
                type="month"
                required
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
              />
            </Field>
          }
          {false}
          {isVariableDepreciation && (
            <Field
              label={isVariableDepreciation ? 'قسط إهلاك الفترة المعتمد · YER *' : 'المبلغ · YER *'}
            >
              <Input
                type="number"
                min="0.01"
                step=".01"
                required
                readOnly={false}
                value={String(actualAmount || '')}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Field>
          )}
          <Field label="الفرع">
            <div className="input-readonly">
              {state.branches.find((branch) => branch.id === branchId)?.name}
            </div>
          </Field>
          <Field label="البيان / سبب العملية *">
            <Input required value={note} onChange={(e) => setNote(e.target.value)} />
          </Field>
        </div>
        {false}
        {chosenAsset && (
          <div className="info-note">
            تكلفة البطاقة {fmt(Number(chosenAsset.cost))} — تخريدية{' '}
            {fmt(Number(chosenAsset.residual))} — عمر {chosenAsset.life} سنوات.{' '}
            {isVariableDepreciation
              ? 'أدخل مبلغ الفترة؛ يمنع تجاوز المتبقي أو تكرار الفترة.'
              : 'القسط الثابت يحدد في الخادم وفق المتبقي.'}
          </div>
        )}
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
          <dd>
            {!isVariableDepreciation ? 'يحسب وفق سياسة القسط الثابت' : fmt(actualAmount) + ' YER'}
          </dd>
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
