import { ViewButton } from '@/core/components/shared/actions/ViewButton';
import { Modal } from '@/core/components/shared/dialogs/Modal';
import { Pill } from '@/core/components/shared/display/Pill';
import { SearchBox } from '@/core/components/shared/filters/SearchBox';
import { Field } from '@/core/components/shared/forms/Field';
import { Form as ValidatedForm } from '@/core/components/shared/forms/ValidatedForm';
import { PageHead } from '@/core/components/shared/layout/PageHead';
import { DataTable } from '@/core/components/shared/tables/DataTable';
import { Button } from '@/core/components/ui/button';
import { Input } from '@/core/components/ui/input';
import { useErpContext } from '@/core/hooks/useErpContext';
import { useValidatedForm } from '@/core/hooks/useValidatedForm';
import { printReport } from '@/core/reporting/service';
import { useBranch } from '@/features/settings/hooks/useBranch';
import { branchSchema } from '@/features/settings/validation/settings-schema';
import { Printer, Save } from 'lucide-react';
import { useState } from 'react';
export function BranchDirectory() {
  const screen = {
    id: 'branches',
    module: 'settings',
    title: 'بطاقات الفروع ومواقع التشغيل',
    page: 53,
    mode: 'locations',
    collection: 'branch',
  };
  const { state: s, busy: isBusy, branchId } = useErpContext();
  const branchMutationRequest = useBranch();
  const branchForm = useValidatedForm(branchSchema, branchMutationRequest.execute);
  const branchMutation = { ...branchMutationRequest, execute: branchForm.submit };
  const [searchQuery, setQ] = useState('');
  const [edit, setEdit] = useState<{
    id?: string;
    name: string;
    address: string;
    branchId: string;
    active: boolean;
  } | null>(() =>
    screen.id.endsWith('-add') ? { name: '', address: '', branchId, active: true } : null,
  );
  if (!s) return null;
  const list = s.branches.map((branch) => ({ ...branch, branchId: '', address: branch.address }));
  return (
    <>
      <PageHead
        title={screen.title}
        description={'المنشأة هي الكيان المالك؛ الفرع موقع تشغيل يتبعها مباشرة.'}
        onAction={() => setEdit({ name: '', address: '', branchId, active: true })}
        label={'إضافة فرع'}
      />
      <div className="filter-bar">
        <SearchBox value={searchQuery} onChange={setQ} />
      </div>
      <DataTable
        headers={['الاسم', 'العنوان', 'الحالة', 'عرض']}
        rows={list
          .filter((v) => v.name.includes(searchQuery))
          .map((v) => [
            v.name,
            v.address,
            <Pill tone={v.active ? 'green' : 'gray'}>{v.active ? 'نشط' : 'غير نشط'}</Pill>,
            <ViewButton onClick={() => setEdit({ ...v })} />,
          ])}
      />
      {edit && (
        <Modal isOpen title={'بطاقة الفرع'} onClose={() => setEdit(null)}>
          <ValidatedForm
            onSubmit={async (e) => {
              e.preventDefault();
              if (
                await branchMutation.execute({
                  id: edit.id,
                  name: edit.name,
                  address: edit.address,
                  active: edit.active,
                })
              )
                setEdit(null);
            }}
          >
            <div className="form-grid">
              <Field label={'اسم الفرع *'}>
                <Input
                  required
                  value={edit.name}
                  onChange={(e) => setEdit({ ...edit, name: e.target.value })}
                />
              </Field>
              {
                <Field label="العنوان">
                  <Input
                    value={edit.address}
                    onChange={(e) => setEdit({ ...edit, address: e.target.value })}
                  />
                </Field>
              }
              <Field label="الحالة">
                <label className="check-label">
                  <input
                    type="checkbox"
                    checked={edit.active}
                    onChange={(e) => setEdit({ ...edit, active: e.target.checked })}
                  />
                  نشط
                </label>
              </Field>
            </div>
            <div className="info-note">
              لا يحذف التعطيل المستندات. يمنع تغيير تبعية مخزن له حركات أو تعطيل مخزن برصيد موجب.
            </div>
            <div className="dialog-actions">
              <Button disabled={isBusy}>
                <Save size={16} />
                حفظ
              </Button>
              <Button type="button" variant="outline" onClick={() => printReport()}>
                <Printer size={16} />
                طباعة
              </Button>
              <Button type="button" variant="ghost" onClick={() => setEdit(null)}>
                تراجع
              </Button>
            </div>
          </ValidatedForm>
        </Modal>
      )}
    </>
  );
}
