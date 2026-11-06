import { exportCsv } from '@/core/services/export-csv';
import { importMastersSchema } from '@/features/organization/public';
import { useImportMasters } from '@/features/settings/hooks/useImportMasters';
import { useImportMastersQuery } from '@/features/settings/queries/useImportMastersQuery';
import { parseMasterCsv } from '@/features/settings/services/models/csv';
import { validateImportPreview } from '@/features/settings/validations/import-preview';
import { useValidatedForm } from '@/shared/hooks/useValidatedForm';
import { Modal } from '@/shared/ui/dialogs/Modal';
import { Pill } from '@/shared/ui/display/Pill';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { DataTable } from '@/shared/ui/tables/DataTable';
import { useState } from 'react';

export function ImportMasters() {

  const { state, busy: isBusy, revision } = useImportMastersQuery();
  const importMastersMutationRequest = useImportMasters(),
    importMastersForm = useValidatedForm(importMastersSchema, importMastersMutationRequest.execute),
    importMastersMutation = { ...importMastersMutationRequest, execute: importMastersForm.submit };
  const [kind, setKind] = useState<'customer' | 'supplier' | 'product'>('customer'),
    [data, setData] = useState<string[][]>([]),
    [mapping, setMapping] = useState<Record<string, string>>({}),
    [error, setError] = useState(''),
    [valid, setValid] = useState(''),
    [isConfirm, setConfirm] = useState(false);
  if (!state) return null;
  const fields =
    kind === 'product'
      ? [
          ['name', 'اسم الصنف *'],
          ['unit', 'الوحدة الأساسية'],
          ['purchase', 'سعر الشراء'],
          ['retail', 'التجزئة'],
          ['wholesale', 'الجملة'],
          ['barcode', 'الباركود'],
          ['min', 'حد الطلب'],
        ]
      : [
          ['name', 'الاسم *'],
          ['address', 'العنوان'],
          ['phone', 'الهاتف'],
          ['currency', 'رمز العملة'],
        ];
  const rows = data
      .slice(1)
      .map((row) =>
        Object.fromEntries(
          fields.map(([key]) => [
            key,
            mapping[key] !== undefined && mapping[key] !== ''
              ? row[Number(mapping[key])].trim()
              : '',
          ]),
        ),
      ),
    signature = JSON.stringify({ kind, rows, revision });

  const handleCheck = () => {

    setError('');
    setValid('');
    try {
      if (mapping.name === undefined || mapping.name === '') throw Error('اربط عمود الاسم');
      validateImportPreview(state, { kind, rows });
      setValid(signature);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'راجع ربط الأعمدة');
    }
  };

  return (
    <>
      <PageHead
        title="استيراد البطاقات من CSV"
        description="استيراد ذري لبطاقات جديدة، مع معاينة وربط الأعمدة وفحص التكرار قبل الاعتماد."
      />
      <section className="panel form-panel">
        <div className="form-grid">
          <Field label="نوع البطاقات">
            <Select
              value={kind}
              onChange={(e) => {
                setKind(e.target.value as typeof kind);
                setValid('');
                setError('');
              }}
            >
              <option value="customer">عملاء</option>
              <option value="supplier">موردون</option>
              <option value="product">أصناف بوحدة أساسية واحدة</option>
            </Select>
          </Field>
          <Field label="ملف CSV — UTF-8، حتى 200 صف">
            <Input
              type="file"
              accept=".csv,text/csv"
              onChange={async (e) => {
                setValid('');
                setData([]);
                setError('');
                const file = e.target.files?.[0];
                if (!file) return;
                try {
                  if (file.size > 200000) throw Error('حد الملف 200KB');
                  const all = parseMasterCsv(await file.text());
                  setData(all);
                  setMapping(
                    Object.fromEntries(
                      fields.flatMap(([key]) => {
                        const index = all[0].indexOf(key);
                        return index >= 0 ? [[key, String(index)]] : [];
                      }),
                    ),
                  );
                } catch (e) {
                  setError(e instanceof Error ? e.message : 'تعذر قراءة الملف');
                }
              }}
            />
          </Field>
        </div>
        <Button
          variant="outline"
          onClick={() =>
            exportCsv(
              'قالب-استيراد-' + kind,
              fields.map(([k]) => k),
              [
                kind === 'product'
                  ? ['صنف جديد', 'حبة', 100, 125, 115, '', 0]
                  : ['طرف جديد', 'تعز', '770000000', 'YER'],
              ],
            )
          }
        >
          تنزيل قالب CSV
        </Button>
        {data.length > 0 && (
          <>
            <h2 className="section-heading">ربط الأعمدة</h2>
            <div className="form-grid">
              {fields.map(([key, label]) => (
                <Field key={key} label={label}>
                  <Select
                    value={mapping[key] ?? ''}
                    onChange={(e) => {
                      setMapping({ ...mapping, [key]: e.target.value });
                      setValid('');
                    }}
                  >
                    <option value="">بدون ربط</option>
                    {data[0].map((h, i) => (
                      <option key={i} value={i}>
                        {h}
                      </option>
                    ))}
                  </Select>
                </Field>
              ))}
            </div>
            <p>{rows.length} بطاقة · معاينة أول 20 صفًا</p>
            <DataTable
              headers={fields.map(([, v]) => v)}
              rows={rows.slice(0, 20).map((r) => fields.map(([k]) => r[k]))}
            />
          </>
        )}
        {error && (
          <div role="alert" className="error-banner">
            {error}
          </div>
        )}
        {valid === signature && <Pill>الفحص ناجح لهذا الإصدار من البيانات</Pill>}
        <div className="dialog-actions">
          <Button variant="outline" disabled={!data.length} onClick={handleCheck}>
            تحقق من الدفعة
          </Button>
          <Button
            disabled={isBusy || !data.length || valid !== signature}
            onClick={() => setConfirm(true)}
          >
            اعتماد الاستيراد
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setData([]);
              setMapping({});
              setValid('');
              setError('');
            }}
          >
            تراجع
          </Button>
        </div>
        <div className="info-note">
          لا تستبدل بطاقات موجودة ولا تستورد فواتير أو أرصدة. الأصناف المستوردة أحادية الوحدة. أي
          خطأ يرفض الدفعة كلها، وتُراجع العملات والباركود والأسماء في الخادم عند الاعتماد.
        </div>
      </section>
      <Modal
        isOpen={isConfirm}
        title="اعتماد البطاقات الجديدة"
        onClose={() => setConfirm(false)}
        description="ستضاف جميع البطاقات بعد التحقق النهائي، دون توليد قيود أو مخزون."
      >
        <p>{rows.length} بطاقة</p>
        <div className="dialog-actions">
          <Button
            disabled={isBusy || valid !== signature}
            onClick={async () => {
              if (await importMastersMutation.execute({ kind, rows })) {
                setConfirm(false);
                setData([]);
                setValid('');
              }
            }}
          >
            تأكيد الاستيراد
          </Button>
          <Button variant="ghost" onClick={() => setConfirm(false)}>
            تراجع
          </Button>
        </div>
      </Modal>
    </>
  );
}
