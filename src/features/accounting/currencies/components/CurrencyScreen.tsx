import { useValidatedForm } from '@/core/hooks/useValidatedForm';
import { printReport } from '@/core/reporting/service';
import { fmt, today } from '@/core/utils/formatters';
import { useCurrency } from '@/features/accounting/currencies/hooks/useCurrency';
import { useCurrencyScreenQuery } from '@/features/accounting/currencies/queries/useCurrencyScreenQuery';
import type { CurrencyScreenProps } from '@/features/accounting/currencies/types/props/CurrencyScreenProps';
import { currencySchema, extras } from '@/features/ledger/public';
import { ViewButton } from '@/shared/ui/actions/ViewButton';
import { Modal } from '@/shared/ui/dialogs/Modal';
import { Field } from '@/shared/ui/forms/Field';
import { Form as ValidatedForm } from '@/shared/ui/forms/ValidatedForm';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { DataTable } from '@/shared/ui/tables/DataTable';
import { Save } from 'lucide-react';
import { useState } from 'react';

export function CurrencyScreen({ screen }: CurrencyScreenProps) {
  const { state: s, busy: isBusy } = useCurrencyScreenQuery();
  const currencyMutationRequest = useCurrency(),
    currencyForm = useValidatedForm(currencySchema, currencyMutationRequest.execute),
    currencyMutation = { ...currencyMutationRequest, execute: currencyForm.submit };
  const [name, setName] = useState(''),
    [code, setCode] = useState(''),
    [date, setDate] = useState(today()),
    [rate, setRate] = useState(''),
    [source, setSource] = useState(''),
    [selected, setSelected] = useState<string | null>(null);
  if (!s) return null;
  return (
    <>
      <PageHead title={screen.title} description={screen.note!} />
      <ValidatedForm
        className="panel form-panel"
        onSubmit={async (e) => {
          e.preventDefault();
          if (await currencyMutation.execute({ name, code, date, rate: Number(rate), source })) {
            setRate('');
            setSource('');
          }
        }}
      >
        <div className="form-grid">
          <Field label="اسم العملة *">
            <Input value={name} required onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="الرمز — ثلاثة أحرف لاتينية *">
            <Input
              dir="ltr"
              value={code}
              required
              maxLength={3}
              pattern="[A-Z]{3}"
              onChange={(e) => {
                const v = e.target.value.toUpperCase();
                setCode(v);
                const c = s.currencies.find((c) => c.code === v);
                if (c) setName(c.name);
              }}
            />
          </Field>
          <Field label="تاريخ السريان *">
            <Input type="date" required value={date} onChange={(e) => setDate(e.target.value)} />
          </Field>
          <Field label="عدد وحدات YER لكل وحدة أجنبية *">
            <Input
              type="number"
              min="0.000001"
              step="any"
              value={rate}
              required
              onChange={(e) => setRate(e.target.value)}
            />
          </Field>
          <Field label="مصدر السعر / ملاحظة *">
            <Input value={source} required onChange={(e) => setSource(e.target.value)} />
          </Field>
        </div>
        <div className="info-note">
          الأسعار الحالية في العينة توضيحية. التحديث لا يعيد تقييم أرصدة قديمة؛ راجع سعر الفاتورة
          وتاريخها قبل الحفظ. السعر المرجعي المقترح عند اختيار العملة هو أحدث سعر محفوظ.
        </div>
        <div className="dialog-actions">
          <Button disabled={isBusy}>
            <Save size={16} />
            حفظ العملة والسعر
          </Button>
        </div>
      </ValidatedForm>
      <h2 className="section-heading">العملات التشغيلية</h2>
      <DataTable
        headers={['اسم العملة', 'الرمز', 'آخر سعر مرجعي', 'عرض']}
        rows={s.currencies.map((c) => [
          c.name,
          c.code,
          fmt(c.rate),
          <ViewButton onClick={() => setSelected(c.code)} />,
        ])}
      />
      <Modal isOpen={!!selected} title="بطاقة العملة" onClose={() => setSelected(null)}>
        {(() => {
          const c = s.currencies.find((c) => c.code === selected);
          if (!c) return null;
          return (
            <>
              <dl className="confirm-grid">
                <dt>اسم العملة</dt>
                <dd>{c.name}</dd>
                <dt>الرمز</dt>
                <dd>{c.code}</dd>
                <dt>آخر سعر مرجعي مقابل YER</dt>
                <dd>{fmt(c.rate)}</dd>
                <dt>النوع</dt>
                <dd>{c.code === 'YER' ? 'عملة أساسية' : 'عملة أجنبية'}</dd>
              </dl>
              <h3>الأسعار المؤرخة للعملة</h3>
              <DataTable
                headers={['التاريخ', 'السعر', 'المصدر']}
                rows={(extras(s).records.fxRates || [])
                  .filter((r) => r.code === c.code)
                  .map((r) => [String(r.date), fmt(Number(r.rate)), String(r.source)])}
              />
              <div className="dialog-actions">
                <Button
                  onClick={() => {
                    setName(c.name);
                    setCode(c.code);
                    setRate(String(c.rate));
                    setSelected(null);
                  }}
                >
                  تحديث سعر العملة
                </Button>
                <Button variant="outline" onClick={() => printReport()}>
                  طباعة
                </Button>
              </div>
            </>
          );
        })()}
      </Modal>
      <h2 className="section-heading">سجل الأسعار المؤرخة</h2>
      <DataTable
        headers={['العملة', 'التاريخ', 'السعر مقابل YER', 'المصدر']}
        rows={(extras(s).records.fxRates || [])
          .slice()
          .reverse()
          .map((r) => [String(r.code), String(r.date), fmt(Number(r.rate)), String(r.source)])}
      />
    </>
  );
}
