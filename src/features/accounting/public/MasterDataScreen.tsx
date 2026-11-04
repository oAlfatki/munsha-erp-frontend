import { ROUTES } from "@/core/config/navigation-paths";
import { printReport } from "@/core/reporting/service";
import { useMasterScreenController } from "@/features/accounting/hooks/useMasterScreenController";
import type { MasterScreenProps } from "@/features/accounting/types/MasterScreenProps";
import { LookupField as DynamicField } from "@/features/settings/public/LookupField";
import { ViewButton } from "@/shared/ui/actions/ViewButton";
import { Modal } from "@/shared/ui/dialogs/Modal";
import { Pill } from "@/shared/ui/display/Pill";
import { SearchBox } from "@/shared/ui/filters/SearchBox";
import { Field } from "@/shared/ui/forms/Field";
import { Form as ValidatedForm } from "@/shared/ui/forms/ValidatedForm";
import { PageHead } from "@/shared/ui/layout/PageHead";
import { Button } from "@/shared/ui/primitives/button";
import { DataTable } from "@/shared/ui/tables/DataTable";
import { Printer,Save,Undo2 } from 'lucide-react';

export function MasterScreen({ screen }: MasterScreenProps) {
  const model = useMasterScreenController({ screen });
  if (!model) return null;
  const {
    s,
    isBusy,
    navigate,
    masterMutation,
    query,
    setQuery,
    edit,
    setEdit,
    isActive,
    setActive,
    list,
    open,
    fields,
  } = model;
  return (
    <>
      <PageHead
        title={screen.title}
        description={
          screen.note ||
          'إضافة، بحث، عرض وتعديل من البطاقة الموحدة. حفظ التعريف لا يولّد قيدًا ماليًا.'
        }
        extra={
          screen.collection === 'contacts' ? (
            <Button variant="outline" onClick={() => navigate(ROUTES.ACCOUNTING_CONTACTS_LEDGER)}>
              حركة الأطراف وكشف الحساب
            </Button>
          ) : screen.showCashListLink ? (
            <Button variant="outline" onClick={() => navigate(ROUTES.ACCOUNTING_CASH_BANK_LIST)}>
              قائمة الصناديق والبنوك
            </Button>
          ) : undefined
        }
        onAction={() => open()}
        label={
          screen.collection === 'units'
            ? 'إضافة وحدة'
            : screen.collection === 'categories'
              ? 'إضافة فئة'
              : screen.collection === 'productGroups'
                ? 'إضافة مجموعة'
                : screen.collection === 'cash'
                  ? 'إضافة صندوق أو بنك'
                  : 'إضافة سجل'
        }
      />
      <div className="filter-bar">
        <SearchBox value={query} onChange={setQuery} />
        <Pill>{list.length} سجل</Pill>
      </div>
      {screen.collection === 'accounts' && (
        <div className="info-note">
          حسابات النظام الأساسية موجودة في دليل الحسابات الرئيسي ولا يمكن استبدالها هنا. الحسابات
          الجديدة تظهر كذلك في القيود اليدوية والقوائم حسب التصنيف.
        </div>
      )}
      <DataTable
        headers={[...fields.slice(0, 4).map((field) => field.label), 'الحالة', 'عرض']}
        rows={list
          .filter((r) => Object.values(r).join(' ').includes(query))
          .map((r) => [
            ...fields
              .slice(0, 4)
              .map((field) =>
                field.type === 'branch'
                  ? s.branches.find((branch) => branch.id === r[field.key])?.name || '—'
                  : field.options?.find((o) => o[0] === String(r[field.key]))?.[1] ||
                    String(r[field.key] ?? '—'),
              ),
            <Pill tone={r.active ? 'green' : 'gray'}>{r.active ? 'نشط' : 'غير نشط'}</Pill>,
            <ViewButton onClick={() => open(r)} />,
          ])}
      />
      {edit && (
        <Modal
          isOpen
          isWide
          title={
            edit.id
              ? 'بطاقة السجل — عرض وتعديل'
              : screen.collection === 'units'
                ? 'إضافة وحدة'
                : screen.collection === 'productGroups'
                  ? 'إضافة مجموعة'
                  : screen.collection === 'categories'
                    ? 'إضافة فئة'
                    : screen.collection === 'cash'
                      ? 'إضافة صندوق أو بنك'
                      : 'إضافة سجل جديد'
          }
          onClose={() => setEdit(null)}
        >
          <ValidatedForm
            onSubmit={async (e) => {
              e.preventDefault();
              const record: Record<string, string | number | boolean> = {
                ...edit,
                active: isActive,
              };
              for (const field of fields)
                if (field.type === 'number') record[field.key] = Number(edit[field.key] || 0);
              if (!record.id) delete record.id;
              if (await masterMutation.execute({ collection: screen.collection, record }))
                setEdit(null);
            }}
          >
            <div className="form-grid">
              {fields.map((f) => (
                <DynamicField
                  key={f.key}
                  field={f}
                  value={edit[f.key] || ''}
                  onChange={(v) => setEdit({ ...edit, [f.key]: v })}
                />
              ))}
              <Field label="الحالة">
                <label className="check-label">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setActive(e.target.checked)}
                  />
                  نشط
                </label>
              </Field>
            </div>
            <div className="dialog-actions">
              <Button disabled={isBusy}>
                <Save size={16} />
                حفظ البطاقة
              </Button>
              <Button type="button" variant="outline" onClick={() => printReport()}>
                <Printer size={16} />
                طباعة
              </Button>
              <Button type="button" variant="ghost" onClick={() => setEdit(null)}>
                <Undo2 size={16} />
                تراجع
              </Button>
            </div>
          </ValidatedForm>
        </Modal>
      )}
    </>
  );
}
