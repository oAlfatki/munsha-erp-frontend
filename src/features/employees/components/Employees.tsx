import { ViewButton } from '@/shared/ui/actions/ViewButton';
import { Modal } from '@/shared/ui/dialogs/Modal';
import { Pill } from '@/shared/ui/display/Pill';
import { SearchBox } from '@/shared/ui/filters/SearchBox';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { Form as ValidatedForm } from '@/shared/ui/forms/ValidatedForm';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { ReportActions } from '@/shared/ui/reports/ReportActions';
import { DataTable } from '@/shared/ui/tables/DataTable';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { exportPdf, printReport } from '@/core/reporting/service';
import { fmt } from '@/core/utils/formatters';
import { useEmployeesController } from '@/features/employees/hooks/useEmployeesController';
export function Employees() {
  const model = useEmployeesController();
  if (!model) return null;
  const {
    s,
    isBusy,
    employeeMutation,
    employeeDeleteMutation,
    blank,
    searchQuery,
    setQ,
    edit,
    setEdit,
    tab,
    setTab,
    isDeleting,
    setDeleting,
    list,
    handleClose,
    upload,
    download,
  } = model;
  return (
    <>
      <PageHead
        title="الموظفون"
        description="بطاقة الموظف وبيانات الاتصال والهوية والمرفقات."
        onAction={() => {
          setEdit(blank());
          setTab('basic');
        }}
        label="إضافة موظف"
        extra={
          <ReportActions
            onExport={() =>
              exportPdf(
                'الموظفون',
                ['الكود', 'الاسم', 'الوظيفة', 'الهاتف', 'الراتب', 'العملة'],
                list.map((employee) => [
                  employee.code || employee.id,
                  employee.name,
                  employee.job,
                  employee.phone,
                  employee.salary,
                  employee.currency,
                ]),
              )
            }
          />
        }
      />
      <div className="filter-bar">
        <SearchBox value={searchQuery} onChange={setQ} />
      </div>
      <DataTable
        headers={[
          'كود الموظف',
          'الاسم',
          'الوظيفة',
          'الفرع',
          'الهاتف',
          'الراتب الأساسي',
          'الحالة',
          'عرض',
        ]}
        rows={list.map((employee) => [
          employee.code || 'سجل سابق',
          employee.name,
          employee.job,
          s.branches.find((branch) => branch.id === employee.branchId)?.name,
          employee.phone,
          fmt(employee.salary) + ' ' + employee.currency,
          <Pill tone={employee.active ? 'green' : 'gray'}>
            {employee.active ? 'نشط' : 'غير نشط'}
          </Pill>,
          <ViewButton
            onClick={() => {
              setEdit(structuredClone(employee));
              setTab('basic');
            }}
          />,
        ])}
      />
      {edit && (
        <Modal
          isOpen
          isWide
          title={edit.id ? 'بطاقة الموظف — عرض وتعديل' : 'إضافة موظف'}
          onClose={handleClose}
        >
          <ValidatedForm
            onSubmit={async (e) => {
              e.preventDefault();
              if (await employeeMutation.execute({ ...edit, id: edit.id || undefined }))
                handleClose();
            }}
          >
            <div className="form-grid">
              <Field label="كود الموظف">
                <Input
                  readOnly
                  value={
                    edit.code || (edit.id ? 'سجل سابق — يخصص الكود عند الحفظ' : 'يولد عند الحفظ')
                  }
                />
              </Field>
              <Field label="اسم الموظف *">
                <Input
                  required
                  value={edit.name}
                  onChange={(e) => setEdit({ ...edit, name: e.target.value })}
                />
              </Field>
              <Field label="الفرع">
                <Select
                  value={edit.branchId}
                  onChange={(e) => setEdit({ ...edit, branchId: e.target.value })}
                >
                  {s.branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
                    </option>
                  ))}
                </Select>
              </Field>
              <label className="check-label">
                <input
                  type="checkbox"
                  checked={edit.active}
                  onChange={(e) => setEdit({ ...edit, active: e.target.checked })}
                />
                نشط
              </label>
            </div>
            <div className="module-tabs">
              {[
                ['basic', 'البيانات الأساسية'],
                ['contact', 'بيانات الاتصال'],
                ['identity', 'البطاقة الشخصية'],
                ['files', 'الصورة والمرفقات'],
              ].map(([id, label]) => (
                <button
                  type="button"
                  key={id}
                  className={tab === id ? 'active' : ''}
                  onClick={() => setTab(id)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="form-grid">
              {tab === 'basic' && (
                <>
                  <Field label="الوظيفة *">
                    <Input
                      required
                      value={edit.job}
                      onChange={(e) => setEdit({ ...edit, job: e.target.value })}
                    />
                  </Field>
                  <Field label="تاريخ الالتحاق">
                    <Input
                      required
                      type="date"
                      value={edit.joined}
                      onChange={(e) => setEdit({ ...edit, joined: e.target.value })}
                    />
                  </Field>
                  <Field label="الراتب الأساسي">
                    <Input
                      type="number"
                      min="0"
                      step=".01"
                      value={edit.salary}
                      onChange={(e) => setEdit({ ...edit, salary: +e.target.value })}
                    />
                  </Field>
                  <Field label="عملة الراتب">
                    <Select
                      value={edit.currency}
                      onChange={(e) => setEdit({ ...edit, currency: e.target.value })}
                    >
                      {s.currencies.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.name}
                        </option>
                      ))}
                    </Select>
                  </Field>
                  <Field label="الحالة الاجتماعية">
                    <Select
                      value={edit.marital || ''}
                      onChange={(e) => setEdit({ ...edit, marital: e.target.value })}
                    >
                      {[
                        ['', 'غير محدد'],
                        ['single', 'أعزب'],
                        ['married', 'متزوج'],
                        ['divorced', 'مطلق'],
                        ['widowed', 'أرمل'],
                      ].map(([id, label]) => (
                        <option key={id} value={id}>
                          {label}
                        </option>
                      ))}
                    </Select>
                  </Field>
                </>
              )}
              {tab === 'contact' && (
                <>
                  <Field label="رقم الهاتف">
                    <Input
                      value={edit.phone}
                      onChange={(e) => setEdit({ ...edit, phone: e.target.value })}
                    />
                  </Field>
                  <Field label="العنوان">
                    <Input
                      value={edit.address}
                      onChange={(e) => setEdit({ ...edit, address: e.target.value })}
                    />
                  </Field>
                  <Field label="البريد الإلكتروني">
                    <Input
                      type="email"
                      value={edit.email}
                      onChange={(e) => setEdit({ ...edit, email: e.target.value })}
                    />
                  </Field>
                </>
              )}
              {tab === 'identity' && (
                <>
                  <Field label="رقم البطاقة">
                    <Input
                      value={edit.identity}
                      onChange={(e) => setEdit({ ...edit, identity: e.target.value })}
                    />
                  </Field>
                  <Field label="جهة الإصدار">
                    <Input
                      value={edit.issuer}
                      onChange={(e) => setEdit({ ...edit, issuer: e.target.value })}
                    />
                  </Field>
                  <Field label="تاريخ الإصدار">
                    <Input
                      type="date"
                      value={edit.issueDate || ''}
                      onChange={(e) => setEdit({ ...edit, issueDate: e.target.value })}
                    />
                  </Field>
                </>
              )}
              {tab === 'files' && (
                <>
                  <Field label="صورة الموظف PNG / JPEG — حتى 80KB">
                    <Input
                      type="file"
                      accept="image/png,image/jpeg"
                      onChange={(e) => upload(e.target.files?.[0], true)}
                    />
                  </Field>
                  {edit.photo && (
                    <div>
                      <img src={edit.photo} alt="صورة الموظف" width={90} height={90} />
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setEdit({ ...edit, photo: '' })}
                      >
                        حذف الصورة
                      </Button>
                    </div>
                  )}
                  <Field label="مرفق PDF أو صورة — ثلاثة ملفات بحد 80KB لكل ملف">
                    <Input
                      type="file"
                      accept="application/pdf,image/png,image/jpeg"
                      onChange={(e) => upload(e.target.files?.[0], false)}
                    />
                  </Field>
                  <div className="col-span-full">
                    <DataTable
                      headers={['الملف', 'حجم تقريبي', 'تنزيل', 'حذف']}
                      rows={(edit.files || []).map((f) => [
                        f.name,
                        Math.ceil((f.data.length * 0.75) / 1024) + ' KB',
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => download(f)}
                        >
                          تنزيل
                        </Button>,
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            setEdit({ ...edit, files: edit.files?.filter((v) => v.id !== f.id) })
                          }
                        >
                          حذف المرفق
                        </Button>,
                      ])}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="info-note">
              حفظ البطاقة لا يثبت راتبًا أو قيدًا. حذف الموظف متاح إذا لم يرتبط بحركات أو أهداف؛
              استخدم التعطيل عند وجود ارتباطات.
            </div>
            <div className="dialog-actions">
              <Button disabled={isBusy}>حفظ</Button>
              <Button type="button" variant="outline" onClick={() => printReport()}>
                طباعة البطاقة
              </Button>
              <Button type="button" variant="outline" onClick={handleClose}>
                قائمة الموظفين
              </Button>
              {edit.id && (
                <Button type="button" variant="ghost" onClick={() => setDeleting(true)}>
                  حذف الموظف
                </Button>
              )}
              <Button type="button" variant="ghost" onClick={handleClose}>
                تراجع
              </Button>
            </div>
          </ValidatedForm>
        </Modal>
      )}
      <Modal
        isOpen={isDeleting}
        title="حذف بطاقة الموظف"
        onClose={() => setDeleting(false)}
        description="لن تحذف بطاقة لها حركات أو أهداف مرتبطة."
      >
        <div className="dialog-actions">
          <Button
            disabled={isBusy}
            onClick={async () => {
              if (edit && (await employeeDeleteMutation.execute({ id: edit.id }))) {
                setDeleting(false);
                handleClose();
              }
            }}
          >
            تأكيد الحذف
          </Button>
          <Button variant="ghost" onClick={() => setDeleting(false)}>
            تراجع
          </Button>
        </div>
      </Modal>
    </>
  );
}
