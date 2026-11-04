import { ROUTES } from '@/core/config/navigation-paths';

import { useValidatedForm } from '@/core/hooks/useValidatedForm';
import { exportPdf, printReport } from '@/core/reporting/service';
import { fmt, today } from '@/core/utils/formatters';
import { useAssetsQuery } from '@/features/accounting/queries/useAssetsQuery';
import { assetValues } from '@/features/accounting/services/models/asset-values';
import type { AssetsProps } from '@/features/accounting/types/AssetsProps';
import { extras } from '@/features/ledger/public/extensions';
import type { AssetForm } from '@/features/ledger/public/types/models/AssetForm';
import type { MasterRecord } from '@/features/ledger/public/types/models/MasterRecord';
import { masterSchema } from '@/features/master-data/public/master-schema';
import { useMaster } from '@/features/master-data/public/useMaster';
import { ViewButton } from '@/shared/ui/actions/ViewButton';
import { Pill } from '@/shared/ui/display/Pill';
import { SearchBox } from '@/shared/ui/filters/SearchBox';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { Form as ValidatedForm } from '@/shared/ui/forms/ValidatedForm';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { ReportActions } from '@/shared/ui/reports/ReportActions';
import { DataTable } from '@/shared/ui/tables/DataTable';
import { List, Printer, Save } from 'lucide-react';
import { useState } from 'react';

function form(r: MasterRecord | undefined, branchId: string): AssetForm {
  return {
    method: r?.method === 'variable' ? 'variable' : 'straight-line',
    id: r?.id,
    code: String(r?.code || ''),
    name: r?.name || '',
    branchId: String(r?.branchId || branchId),
    cost: Number(r?.cost || 0),
    residual: Number(r?.residual || 0),
    life: Number(r?.life || 5),
    lifeUnit: String(r?.lifeUnit || 'year'),
    lifeInput: Number(r?.lifeInput || r?.life || 5),
    ready: String(r?.ready || today()),
    purchaseDate: String(r?.purchaseDate || r?.ready || today()),
    note: String(r?.note || ''),
    serial: String(r?.serial || ''),
    active: r?.active ?? true,
    installmentPeriod: r?.installmentPeriod === 'month' ? 'month' : 'year',
  };
}

export function Assets({ isAdd: isAdd = false }: AssetsProps) {
  const { state: s, branchId, busy: isBusy, navigate } = useAssetsQuery();
  const masterMutationRequest = useMaster(),
    masterForm = useValidatedForm(masterSchema, masterMutationRequest.execute),
    masterMutation = { ...masterMutationRequest, execute: masterForm.submit };
  const [searchQuery, setQ] = useState(''),
    [edit, setEdit] = useState<AssetForm | null>(isAdd ? form(undefined, branchId) : null);
  if (!s) return null;
  const all = extras(s).records.assets || [],
    rows = all.filter(
      (a) =>
        a.branchId === branchId &&
        (a.name + ' ' + a.code + ' ' + a.serial).toLowerCase().includes(searchQuery.toLowerCase()),
    );
  const handleExportRows = () =>
    exportPdf(
      'قائمة الأصول الثابتة',
      ['اسم الأصل', 'الكود', 'تاريخ الشراء', 'التكلفة YER', 'القسط السنوي YER'],
      rows.map((a) => [
        a.name,
        String(a.code || a.id),
        String(a.purchaseDate || a.ready),
        Number(a.cost),
        a.method === 'variable' ? 'متغير لكل فترة' : assetValues(a).installment,
      ]),
    );
  const open = (a: MasterRecord) => setEdit(form(a, branchId));
  if (edit) {
    const values = assetValues(edit, edit.installmentPeriod);
    const isPosted = extras(s).operations.some(
      (o) => o.kind === 'assetPurchase' && o.subject === edit.id,
    );
    const handleBack = () => {
      setEdit(null);
      if (isAdd) navigate(ROUTES.ACCOUNTING_ASSETS);
    };
    return (
      <>
        <PageHead
          title={edit.id ? 'بطاقة الأصل الثابت' : 'إضافة أصل ثابت'}
          description="بطاقة تعريف وقياس الأصل. إثبات الاقتناء المحاسبي يتم من العملية المخصصة."
          extra={
            <Button variant="outline" onClick={handleBack}>
              <List size={16} />
              قائمة الأصول
            </Button>
          }
        />
        <ValidatedForm
          className="panel form-panel"
          onSubmit={async (e) => {
            e.preventDefault();
            const { id, ...record } = edit;
            if (
              await masterMutation.execute({
                collection: 'assets',
                record: { ...record, ...(id ? { id } : {}), method: edit.method },
              })
            )
              handleBack();
          }}
        >
          <div className="form-grid">
            <Field label="اسم الأصل *">
              <Input
                required
                value={edit.name}
                onChange={(e) => setEdit({ ...edit, name: e.target.value })}
              />
            </Field>
            <Field label="كود الأصل">
              <Input readOnly value={edit.code || 'يولد تلقائيًا عند الحفظ'} />
            </Field>
            <Field label="الفرع *">
              <Select
                disabled={isPosted}
                value={edit.branchId}
                onChange={(e) => setEdit({ ...edit, branchId: e.target.value })}
              >
                {s.branches
                  .filter((branch) => branch.active || branch.id === edit.branchId)
                  .map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
                    </option>
                  ))}
              </Select>
            </Field>
            <Field label="تكلفة الأصل · YER *">
              <Input
                required
                disabled={isPosted}
                min="0"
                step=".01"
                type="number"
                value={edit.cost}
                onChange={(e) => setEdit({ ...edit, cost: +e.target.value })}
              />
            </Field>
            <Field label="تاريخ الشراء *">
              <Input
                required
                disabled={isPosted}
                type="date"
                value={edit.purchaseDate}
                onChange={(e) => setEdit({ ...edit, purchaseDate: e.target.value })}
              />
            </Field>
            <Field label="تاريخ الجاهزية للاستخدام *">
              <Input
                required
                disabled={isPosted}
                type="date"
                min={edit.purchaseDate}
                value={edit.ready}
                onChange={(e) => setEdit({ ...edit, ready: e.target.value })}
              />
            </Field>
            <Field label="طريقة الإهلاك">
              <Select
                disabled={isPosted}
                value={edit.method}
                onChange={(e) =>
                  setEdit({ ...edit, method: e.target.value as AssetForm['method'] })
                }
              >
                <option value="straight-line">طريقة القسط الثابت</option>
                <option value="variable">طريقة القسط المتغير — مبلغ لكل فترة</option>
              </Select>
            </Field>
            <Field label="عمر الأصل *">
              <Input
                required
                disabled={isPosted}
                type="number"
                min="1"
                step="1"
                value={edit.lifeInput}
                onChange={(e) => {
                  const v = +e.target.value;
                  setEdit({ ...edit, lifeInput: v, life: edit.lifeUnit === 'month' ? v / 12 : v });
                }}
              />
            </Field>
            <Field label="وحدة العمر">
              <Select
                disabled={isPosted}
                value={edit.lifeUnit}
                onChange={(e) =>
                  setEdit({
                    ...edit,
                    lifeUnit: e.target.value,
                    life: e.target.value === 'month' ? edit.lifeInput / 12 : edit.lifeInput,
                  })
                }
              >
                <option value="year">سنة</option>
                <option value="month">شهر</option>
              </Select>
            </Field>
            <Field label="قيمة الخردة · YER *">
              <Input
                disabled={isPosted}
                required
                min="0"
                max={edit.cost}
                step=".01"
                type="number"
                value={edit.residual}
                onChange={(e) => setEdit({ ...edit, residual: +e.target.value })}
              />
            </Field>
            <Field label="دورية عرض القسط والمعدل">
              <Select
                value={edit.installmentPeriod}
                onChange={(e) =>
                  setEdit({ ...edit, installmentPeriod: e.target.value as 'year' | 'month' })
                }
              >
                <option value="year">سنوي</option>
                <option value="month">شهري</option>
              </Select>
            </Field>
            <Field label="قيمة القسط · YER">
              <Input
                readOnly
                value={
                  edit.method === 'variable' ? 'يحدد عند إثبات الفترة' : fmt(values.installment)
                }
              />
            </Field>
            <Field label="معدل الإهلاك %">
              <Input
                readOnly
                value={edit.method === 'variable' ? 'حسب مبلغ كل فترة' : fmt(values.rate)}
              />
            </Field>
            <Field label="الرقم التسلسلي">
              <Input
                value={edit.serial}
                onChange={(e) => setEdit({ ...edit, serial: e.target.value })}
              />
            </Field>
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
            <Field label="ملاحظات">
              <Input
                value={edit.note}
                onChange={(e) => setEdit({ ...edit, note: e.target.value })}
              />
            </Field>
          </div>
          <p className="info-note">
            {edit.method === 'variable'
              ? 'القسط المتغير: تدخل مبلغًا معتمدًا لكل فترة من شاشة إثبات الإهلاك؛ لا يتجاوز المتبقي القابل للإهلاك.'
              : 'القسط الثابت = (التكلفة − قيمة الخردة) ÷ العمر. يتغير العرض بين سنوي وشهري، بينما الإثبات يتم شهريًا.'}{' '}
            {isPosted
              ? 'الأصل مثبت؛ بيانات القياس مقفلة لحماية القيود السابقة.'
              : 'حفظ البطاقة لا يسجل دفعة أو قيد اقتناء.'}
          </p>
          <div className="dialog-actions">
            <Button disabled={isBusy}>
              <Save size={16} />
              حفظ الأصل
            </Button>
            <Button type="button" variant="outline" onClick={() => printReport()}>
              <Printer size={16} />
              طباعة
            </Button>
            <Button type="button" variant="outline" onClick={handleBack}>
              <List size={16} />
              قائمة الأصول
            </Button>
          </div>
        </ValidatedForm>
      </>
    );
  }
  return (
    <>
      <PageHead
        title="قائمة الأصول الثابتة"
        description="بطاقات الأصول وتكلفتها وقسط الإهلاك الثابت أو المتغير لكل فترة."
        onAction={() => navigate(ROUTES.ACCOUNTING_ASSETS_ADD)}
        label="إضافة أصل"
        extra={<ReportActions onExport={handleExportRows} />}
      />
      <div className="filter-bar">
        <SearchBox
          value={searchQuery}
          onChange={setQ}
          placeholder="ابحث باسم الأصل أو الكود أو الرقم التسلسلي…"
        />
      </div>
      <DataTable
        headers={[
          'اسم الأصل',
          'كود الأصل',
          'تاريخ الشراء',
          'تكلفة الأصل · YER',
          'قسط الإهلاك السنوي · YER',
          'الحالة',
          'عرض',
        ]}
        rows={rows.map((a) => [
          a.name,
          String(a.code || a.id),
          String(a.purchaseDate || a.ready),
          fmt(Number(a.cost)),
          a.method === 'variable' ? 'متغير لكل فترة' : fmt(assetValues(a).installment),
          <Pill tone={a.active ? 'green' : 'gray'}>{a.active ? 'نشط' : 'غير نشط'}</Pill>,
          <ViewButton onClick={() => open(a)} />,
        ])}
      />
      <div className="document-stats">
        <div>
          <span>عدد الأصول</span>
          <strong>{rows.length}</strong>
        </div>
        <div>
          <span>إجمالي تكلفة الأصول · YER</span>
          <strong>{fmt(rows.reduce((n, a) => n + Number(a.cost), 0))}</strong>
        </div>
        <div>
          <span>إجمالي الأقساط السنوية الثابتة · YER</span>
          <strong>
            {fmt(
              rows
                .filter((a) => a.method !== 'variable')
                .reduce((n, a) => n + assetValues(a).installment, 0),
            )}
          </strong>
        </div>
      </div>
      <p className="info-note">
        الأقساط المعروضة محسوبة من البطاقات؛ الإهلاك المثبت فعليًا يظهر في تقرير الأصول والإهلاك.
      </p>
    </>
  );
}
