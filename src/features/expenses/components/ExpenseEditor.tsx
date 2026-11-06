import { ROUTES } from '@/core/config/navigation-paths';
import { fmt } from '@/core/utils/formatters';
import { money } from '@/core/utils/money';
import { expenseForeignPaid } from '@/features/expenses/services/models/expenses';
import type { ExpenseEditorProps } from '@/features/expenses/types/props/ExpenseEditorProps';
import { LABELS } from '@/features/expenses/utils/treatments';
import type { ExpenseTreatment } from '@/features/ledger/public';
import { cashOptions } from '@/features/ledger/public';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { Form as ValidatedForm } from '@/shared/ui/forms/ValidatedForm';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';

export function ExpenseEditor({ controller }: ExpenseEditorProps) {

  const {
    s: workspace,
    send,
    busy: isBusy,
    navigate,
    edit,
    setEdit,
    payment,
    setPayment,
    types,
    typeName,
    formOld,
    locked: isLocked,
    close,
  } = controller;
  if (!edit) return null;
  return (
    <>
      <PageHead
        title={edit.id ? 'عرض وتعديل المصروف' : 'إضافة مصروف'}
        description="المعالجة المحاسبية مستقلة عن السداد. السداد يولّد سند صرف مرتبطًا بالمصروف."
        extra={
          <Button variant="outline" onClick={close}>
            قائمة المصروفات
          </Button>
        }
      />
      <ValidatedForm
        className="panel form-panel"
        onSubmit={async (e) => {
          e.preventDefault();
          if (
            await send('expenseSave', {
              ...edit,
              paid: formOld
                ? expenseForeignPaid(formOld)
                : payment === 'paid'
                  ? edit.amount
                  : payment === 'partial'
                    ? edit.paid
                    : 0,
            })
          )
            close();
        }}
      >
        <div className="form-grid">
          <Field label="البيان *">
            <Input
              required
              value={edit.description}
              onChange={(e) => setEdit({ ...edit, description: e.target.value })}
            />
          </Field>
          <Field label="نوع المصروف *">
            <Select
              disabled={isLocked}
              required
              value={edit.typeId}
              onChange={(e) => setEdit({ ...edit, typeId: e.target.value })}
            >
              <option value="">اختر النوع المرتبط بالحساب</option>
              {types
                .filter((t) => t.active || t.id === edit.typeId)
                .map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} — {String(t.account || 'غير مربوط')}
                  </option>
                ))}
              {formOld?.legacy && <option value={edit.typeId}>{typeName(edit.typeId)}</option>}
            </Select>
          </Field>
          <Field label="المعالجة المحاسبية">
            <Select
              disabled={isLocked}
              value={edit.treatment}
              onChange={(e) => setEdit({ ...edit, treatment: e.target.value as ExpenseTreatment })}
            >
              {LABELS.map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="تاريخ المصروف *">
            <Input
              disabled={isLocked}
              required
              type="date"
              value={edit.date}
              onChange={(e) => setEdit({ ...edit, date: e.target.value })}
            />
          </Field>
          <Field label="عملة المصروف *">
            <Select
              required
              disabled={isLocked}
              value={edit.currency}
              onChange={(e) => {
                const c = workspace.currencies.find((c) => c.code === e.target.value)!;
                const cash = cashOptions(workspace, edit.branchId).find(
                  (v) => v.active && v.currency === c.code,
                );
                setEdit({ ...edit, currency: c.code, rate: c.rate, cashId: cash?.id || '' });
              }}
            >
              {workspace.currencies.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} — {c.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="سعر الصرف المثبت إلى YER *">
            <Input
              required
              disabled={isLocked || edit.currency === workspace.organization.currency}
              type="number"
              min=".000001"
              step="any"
              value={edit.rate}
              onChange={(e) => setEdit({ ...edit, rate: +e.target.value })}
            />
          </Field>
          <Field label="الصندوق / البنك *">
            <Select
              required
              disabled={isLocked}
              value={edit.cashId}
              onChange={(e) => setEdit({ ...edit, cashId: e.target.value })}
            >
              <option value="">اختر صندوقًا بعملة المصروف</option>
              {cashOptions(workspace, edit.branchId)
                .filter((c) => c.currency === edit.currency && (c.active || c.id === edit.cashId))
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} · {c.currency}
                  </option>
                ))}
            </Select>
          </Field>
          <Field label={'المبلغ · ' + edit.currency + ' *'}>
            <Input
              disabled={isLocked}
              required
              type="number"
              min=".01"
              step=".01"
              value={edit.amount}
              onChange={(e) => setEdit({ ...edit, amount: +e.target.value })}
            />
          </Field>
          <Field label="حالة السداد">
            <Select
              disabled={!!formOld}
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
            >
              <option value="unpaid">غير مسدد</option>
              <option value="partial">مسدد جزئيًا</option>
              <option value="paid">مسدد بالكامل</option>
            </Select>
          </Field>
          {payment === 'partial' && (
            <Field label={'المبلغ المدفوع · ' + edit.currency}>
              <Input
                disabled={!!formOld}
                type="number"
                required
                min=".01"
                max={edit.amount}
                step=".01"
                value={edit.paid}
                onChange={(e) => setEdit({ ...edit, paid: +e.target.value })}
              />
            </Field>
          )}
          {edit.treatment === 'prepaid' && (
            <>
              <Field label="بداية فترة التغطية">
                <Input
                  disabled={isLocked}
                  required
                  type="date"
                  value={edit.start}
                  onChange={(e) => setEdit({ ...edit, start: e.target.value })}
                />
              </Field>
              <Field label="نهاية فترة التغطية">
                <Input
                  disabled={isLocked}
                  required
                  type="date"
                  min={edit.start}
                  value={edit.end}
                  onChange={(e) => setEdit({ ...edit, end: e.target.value })}
                />
              </Field>
            </>
          )}
          <Field label="الفرع">
            <Input
              readOnly
              value={workspace.branches.find((branch) => branch.id === edit.branchId)?.name}
            />
          </Field>
        </div>
        <div className="info-note">
          القيمة المحلية: {fmt(money(edit.amount * edit.rate))} YER.{' '}
          {edit.currency !== workspace.organization.currency &&
            'راجع سعر الصرف؛ السداد في هذه النسخة بعملة المصروف وسعره المثبت.'}{' '}
          <Button
            type="button"
            variant="link"
            onClick={() => navigate(ROUTES.ACCOUNTING_CASH_BANK)}
          >
            إضافة صندوق أو بنك
          </Button>
        </div>
        <div className="info-note">
          {isLocked
            ? 'يمكن تعديل الوصف؛ بيانات القياس محمية لوجود سداد أو تسوية أو سجل سابق. استخدم سند الصرف والتسوية من بطاقة المصروف.'
            : edit.id
              ? 'تغيير المبلغ أو المعالجة قبل أي سداد يُصحح بقيد عكسي موثق مع الاحتفاظ بالقيد السابق.'
              : 'المقدم غير المدفوع لا يولد قيد أصل. المصروف الحالي والمستحق يُثبتان مقابل مستحقات المصروفات، والسداد مرتبط بسند صرف.'}
        </div>
        <div className="dialog-actions">
          <Button disabled={isBusy}>حفظ المصروف</Button>
          <Button type="button" variant="outline" onClick={close}>
            تراجع
          </Button>
        </div>
      </ValidatedForm>
    </>
  );
}
