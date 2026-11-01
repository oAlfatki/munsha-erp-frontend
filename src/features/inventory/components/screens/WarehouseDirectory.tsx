import { ViewButton } from '@/core/components/shared/actions/ViewButton';
import { Modal } from '@/core/components/shared/dialogs/Modal';
import { Pill } from '@/core/components/shared/display/Pill';
import { SearchBox } from '@/core/components/shared/filters/SearchBox';
import { Field } from '@/core/components/shared/forms/Field';
import { Select } from '@/core/components/shared/forms/Select';
import { Form as ValidatedForm } from '@/core/components/shared/forms/ValidatedForm';
import { PageHead } from '@/core/components/shared/layout/PageHead';
import { DataTable } from '@/core/components/shared/tables/DataTable';
import { Button } from '@/core/components/ui/button';
import { Input } from '@/core/components/ui/input';
import { useErpContext } from '@/core/hooks/useErpContext';
import { useValidatedForm } from '@/core/hooks/useValidatedForm';
import { printReport } from '@/core/reporting/service';
import { useWarehouse } from '@/features/inventory/hooks/useWarehouse';
import type { WarehouseDirectoryProps } from '@/features/inventory/types/WarehouseDirectoryProps';
import { warehouseSchema } from '@/features/inventory/validation/inventory-schema';
import { Printer, Save } from 'lucide-react';
import { useState } from 'react';
export function WarehouseDirectory({
  shouldInitiallyAdd: isInitiallyAdd = false,
}: WarehouseDirectoryProps) {
  const screen = {
    id: 'warehouses-add',
    module: 'inventory',
    title: 'قائمة المخازن',
    page: 84,
    mode: 'locations',
    collection: 'warehouse',
  };
  const { state: s, busy: isBusy, branchId } = useErpContext();
  const warehouseMutationRequest = useWarehouse();
  const warehouseForm = useValidatedForm(warehouseSchema, warehouseMutationRequest.execute);
  const warehouseMutation = { ...warehouseMutationRequest, execute: warehouseForm.submit };
  const [searchQuery, setQ] = useState('');
  const [edit, setEdit] = useState<{
    id?: string;
    name: string;
    address: string;
    branchId: string;
    active: boolean;
  } | null>(() => (isInitiallyAdd ? { name: '', address: '', branchId, active: true } : null));
  if (!s) return null;
  const list = s.warehouses.map((warehouse) => ({ ...warehouse, address: '' }));
  return (
    <>
      <PageHead
        title={screen.title}
        description={'المخزن يتبع فرعًا واحدًا؛ لكل فرع مخزن أو أكثر. رمز المخزن يولده النظام.'}
        onAction={() => setEdit({ name: '', address: '', branchId, active: true })}
        label={'إضافة مخزن'}
      />
      <div className="filter-bar">
        <SearchBox value={searchQuery} onChange={setQ} />
      </div>
      <DataTable
        headers={['الاسم', 'الفرع', 'الحالة', 'عرض']}
        rows={list
          .filter((v) => v.name.includes(searchQuery))
          .map((v) => [
            v.name,
            s.branches.find((branch) => branch.id === v.branchId)?.name || '',
            <Pill tone={v.active ? 'green' : 'gray'}>{v.active ? 'نشط' : 'غير نشط'}</Pill>,
            <ViewButton onClick={() => setEdit({ ...v })} />,
          ])}
      />
      {edit && (
        <Modal isOpen title={'بطاقة المخزن'} onClose={() => setEdit(null)}>
          <ValidatedForm
            onSubmit={async (e) => {
              e.preventDefault();
              if (
                await warehouseMutation.execute({
                  id: edit.id,
                  name: edit.name,
                  branchId: edit.branchId,
                  active: edit.active,
                })
              )
                setEdit(null);
            }}
          >
            <div className="form-grid">
              <Field label={'اسم المخزن *'}>
                <Input
                  required
                  value={edit.name}
                  onChange={(e) => setEdit({ ...edit, name: e.target.value })}
                />
              </Field>
              {
                <Field label="الفرع *">
                  <Select
                    required
                    value={edit.branchId}
                    onChange={(e) => setEdit({ ...edit, branchId: e.target.value })}
                  >
                    {s.branches
                      .filter((branch) => branch.active)
                      .map((branch) => (
                        <option key={branch.id} value={branch.id}>
                          {branch.name}
                        </option>
                      ))}
                  </Select>
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
