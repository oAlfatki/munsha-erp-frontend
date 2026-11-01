import { Modal } from '@/shared/ui/dialogs/Modal';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { Form as ValidatedForm } from '@/shared/ui/forms/ValidatedForm';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { DataTable } from '@/shared/ui/tables/DataTable';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { AccountPanel } from '@/features/auth/components/AccountPanel';
import { useAccessController } from '@/features/users/hooks/useAccessController';
export const ACCESS_MODULES = [
  ['dashboard', 'لوحة المتابعة'],
  ['products', 'الأصناف'],
  ['inventory', 'المخزون'],
  ['customers', 'العملاء'],
  ['suppliers', 'الموردون'],
  ['sales', 'المبيعات'],
  ['purchases', 'المشتريات'],
  ['expenses', 'المصروفات'],
  ['employees', 'الموظفون'],
  ['accounts', 'الحسابات'],
  ['financial', 'القوائم المالية'],
  ['settings', 'الإعدادات'],
] as const;
const ROLES = { admin: 'مسؤول النظام', staff: 'مستخدم عمليات', viewer: 'مشاهدة فقط' };
export function Access() {
  const model = useAccessController();
  if (!model) return null;
  const {
    view,
    users,
    user,
    error,
    setError,
    isBusy,
    edit,
    reset,
    setReset,
    isOpen,
    setOpen,
    name,
    setName,
    username,
    setUsername,
    password,
    setPassword,
    role,
    setRole,
    isActive,
    setActive,
    success,
    setSuccess,
    load,
    start,
    save,
    submitPasswordReset,
  } = model;
  if (view.endsWith('/password')) return <AccountPanel />;
  if (view.endsWith('/sessions')) return <AccountPanel mode="sessions" />;
  const rules = (
    <>
      <p className="info-note">
        المسؤول: إدارة المستخدمين والجلسات والإعدادات والنسخ الاحتياطية وجميع العمليات. مستخدم
        العمليات: عرض البيانات وتنفيذ العمليات التشغيلية، دون إدارة المستخدمين والإعدادات والبيانات
        التنظيمية وإضافة الأرصدة الافتتاحية وترحيل السنوات. المشاهدة: عرض التقارير والبيانات فقط.
        الصلاحيات تُفحص في الخادم، وتسري على جميع الفروع الحالية.
      </p>
      <p className="info-note">
        حسابات المستخدمين وكلمات المرور والجلسات تُحفظ منفصلة عن ملفات النسخ الاحتياطية التشغيلية،
        فلا يستبدل استرجاع بيانات المنشأة حسابات الدخول.
      </p>
    </>
  );
  if (view.endsWith('/matrix'))
    return (
      <>
        <PageHead
          title="صلاحيات الحسابات"
          description="الصلاحيات المعتمدة لكل نوع من حسابات النظام."
        />
        {rules}
      </>
    );
  return (
    <>
      <PageHead
        title="المستخدمون"
        description="حسابات الدخول المستقلة وحالة الحساب ونوع الصلاحية."
        extra={
          user?.role === 'admin' ? (
            <Button onClick={() => start(null)}>إضافة مستخدم</Button>
          ) : undefined
        }
      />
      {rules}
      {error && !isOpen && !reset && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
      {success && (
        <p role="status" className="info-note">
          {success}
        </p>
      )}
      {user?.role !== 'admin' ? (
        <p className="info-note">
          إدارة حسابات المستخدمين متاحة لمسؤول النظام. استخدم «تغيير كلمة المرور» و«الجلسات» لإدارة
          حسابك.
        </p>
      ) : (
        <DataTable
          headers={['الاسم', 'اسم الدخول', 'الصلاحية', 'الحالة', 'كلمة المرور', 'الإجراءات']}
          rows={users.map((u) => [
            u.name,
            u.username,
            ROLES[u.role as keyof typeof ROLES] || u.role,
            u.active ? 'نشط' : 'معطّل',
            u.must_change ? 'يلزم تغييرها' : 'محدثة',
            <div className="flex gap-2" key={u.id}>
              <Button variant="outline" onClick={() => start(u)}>
                عرض وتعديل
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setReset(u);
                  setPassword('');
                  setError('');
                }}
              >
                إعادة تعيين كلمة المرور
              </Button>
            </div>,
          ])}
        />
      )}
      {isOpen && (
        <Modal
          isOpen
          title={edit ? 'تعديل المستخدم' : 'إضافة مستخدم'}
          onClose={() => {
            setOpen(false);
            setPassword('');
          }}
        >
          <ValidatedForm
            onSubmit={(e) => {
              e.preventDefault();
              save();
            }}
          >
            <div className="form-grid">
              <Field label="الاسم الكامل *">
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </Field>
              <Field label="اسم الدخول *">
                <Input
                  dir="ltr"
                  autoComplete="off"
                  disabled={!!edit}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Field>
              <Field label="الصلاحية">
                <Select value={role} onChange={(e) => setRole(e.target.value)}>
                  {Object.entries(ROLES).map(([id, label]) => (
                    <option key={id} value={id}>
                      {label}
                    </option>
                  ))}
                </Select>
              </Field>
              {!edit && (
                <Field label="كلمة المرور المؤقتة *">
                  <Input
                    type="password"
                    autoComplete="new-password"
                    minLength={10}
                    maxLength={128}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Field>
              )}
              {edit && (
                <label className="check-label">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setActive(e.target.checked)}
                  />
                  حساب نشط
                </label>
              )}
            </div>
            {error && (
              <p className="field-error" role="alert">
                {error}
              </p>
            )}
            <div className="dialog-actions">
              <Button disabled={isBusy}>حفظ المستخدم</Button>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                تراجع
              </Button>
            </div>
          </ValidatedForm>
        </Modal>
      )}
      {reset && (
        <Modal
          isOpen
          title={'إعادة تعيين كلمة المرور — ' + reset.name}
          onClose={() => {
            setReset(null);
            setPassword('');
          }}
        >
          <p className="info-note">
            تنتهي جميع جلسات هذا المستخدم فورًا. عليه تغيير كلمة المرور المؤقتة في أول دخول.
          </p>
          <Field label="كلمة المرور المؤقتة الجديدة *">
            <Input
              type="password"
              autoComplete="new-password"
              minLength={10}
              maxLength={128}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          {error && (
            <p role="alert" className="field-error">
              {error}
            </p>
          )}
          <div className="dialog-actions">
            <Button
              disabled={isBusy}
              onClick={async () => {
                setError('');
                try {
                  if (
                    !(await submitPasswordReset({
                      action: 'resetPassword',
                      id: reset.id,
                      password,
                    }))
                  )
                    return;
                  setReset(null);
                  setPassword('');
                  setSuccess('أُعيد تعيين كلمة المرور وأُنهيت الجلسات.');
                  await load();
                } catch (e) {
                  setError((e as Error).message);
                }
              }}
            >
              تأكيد إعادة التعيين
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
