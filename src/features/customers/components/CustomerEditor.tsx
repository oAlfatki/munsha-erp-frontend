import { ROUTES } from '@/core/config/navigation-paths';
import { useCustomerEditorController } from '@/features/customers/hooks/useCustomerEditorController';
import type { CustomerEditorProps } from '@/features/customers/types/CustomerEditorProps';
import { extras } from '@/features/ledger/public/extensions';
import { Modal } from '@/shared/ui/dialogs/Modal';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
export function CustomerEditor({ party, onClose: close }: CustomerEditorProps) {
  const model = useCustomerEditorController({ party, onClose: close });
  if (!model) return null;
  const { s, isBusy, navigate, partyMutation, form, p, update } = model;
  return (
    <Modal
      isOpen
      title={(party ? 'بطاقة ' : 'إضافة ') + '\u0639\u0645\u064A\u0644'}
      onClose={close}
    >
      <form
        noValidate
        onSubmit={form.handleSubmit(async (values) => {
          if (await partyMutation.execute({ ...values, id: party?.id })) close();
        })}
      >
        <div className="form-grid">
          <Field label={'اسم العميل *'}>
            <Input
              autoFocus
              required
              value={p.name}
              onChange={(e) => update('name', e.target.value)}
            />
          </Field>
          <Field label="المجموعة">
            <Select value={p.groupId || ''} onChange={(e) => update('groupId', e.target.value)}>
              <option value="">بدون مجموعة</option>
              {s &&
                (extras(s).records.groups || [])
                  .filter((g) => g.kind === 'customer' && (g.active || g.id === p.groupId))
                  .map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
            </Select>
          </Field>
          <Field label="العنوان">
            <Input value={p.address} onChange={(e) => update('address', e.target.value)} />
          </Field>
          <Field label="رقم الهاتف">
            <Input dir="ltr" value={p.phone} onChange={(e) => update('phone', e.target.value)} />
          </Field>
          <Field label="العملة الأساسية *">
            <Select value={p.currency} onChange={(e) => update('currency', e.target.value)}>
              {s?.currencies.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="سقف الحساب بالعملة الأساسية YER">
            <Input
              type="number"
              min="0"
              value={p.limit}
              onChange={(e) => update('limit', +e.target.value)}
            />
          </Field>
          {
            <Field label="نوع السعر الافتراضي">
              <Select
                value={p.priceType}
                onChange={(e) => update('priceType', e.target.value as 'retail' | 'wholesale')}
              >
                <option value="retail">تجزئة</option>
                <option value="wholesale">جملة</option>
              </Select>
            </Field>
          }
          <Field label="الحالة">
            <label className="check-label">
              <input
                type="checkbox"
                checked={p.active}
                onChange={(e) => update('active', e.target.checked)}
              />
              نشط
            </label>
          </Field>
        </div>
        <p className="info-note">
          يرتبط الطرف تلقائيًا بحساب ذمم رقابي. إنشاء البطاقة لا ينشئ قيدًا ولا رصيدًا افتتاحيًا.
        </p>
        {Object.values(form.formState.errors).map((error, i) => (
          <p key={i} role="alert" className="field-error">
            {String(error?.message || 'راجع الحقول')}
          </p>
        ))}
        <div className="dialog-actions">
          <Button disabled={isBusy} type="submit">
            حفظ البيانات
          </Button>
          {party && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                navigate(ROUTES.ACCOUNT_STATEMENT_PREFIX + party.id);
                close();
              }}
            >
              كشف الحساب
            </Button>
          )}
          <Button type="button" variant="outline" onClick={close}>
            تراجع
          </Button>
        </div>
      </form>
    </Modal>
  );
}
