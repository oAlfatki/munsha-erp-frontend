import { fmt } from '@/core/utils/formatters';
import { useIncomeStatementController } from '@/features/financial/hooks/useIncomeStatementController';
import { exportPdf } from '@/shared/services/report-actions';
import { Pill } from '@/shared/ui/display/Pill';
import { Field } from '@/shared/ui/forms/Field';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { Input } from '@/shared/ui/primitives/input';
import { ReportActions } from '@/shared/ui/reports/ReportActions';

export function IncomeStatement() {

  const model = useIncomeStatementController();
  if (!model) return null;
  const { refresh, from, setFrom, to, setTo, income, incomeRows } = model;
  return (
    <>
      <PageHead
        title={'قائمة الدخل'}
        description="القوائم تتضمن جميع الحسابات التشغيلية والمضافة، مشتقة من القيود الفعلية."
        extra={
          <ReportActions
            onView={refresh}
            onExport={() =>
              exportPdf(
                'قائمة الدخل',
                ['البيان', 'YER'],
                [...incomeRows, ['صافي نتيجة الفترة', income(true)]],
              )
            }
          />
        }
      />
      <div className="filter-bar">
        {
          <Field label="من تاريخ">
            <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          </Field>
        }
        <Field label={'إلى تاريخ'}>
          <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        </Field>
        <Pill>YER · الفرع الحالي</Pill>
      </div>
      <div className="financial-grid single-financial">
        {
          <section className="panel financial-panel">
            <h2>قائمة الدخل</h2>
            <p>
              {from || 'بداية السنة'} — {to}
            </p>
            {incomeRows.map(([name, value]) => (
              <div key={name} className="financial-row">
                <span>{name}</span>
                <strong dir="ltr">{fmt(value)}</strong>
              </div>
            ))}
            <div className="financial-row total">
              <span>صافي الربح / الخسارة</span>
              <strong>{fmt(income(true))}</strong>
            </div>
          </section>
        }
        {false}
      </div>
      <div className="info-note">
        ضريبة الفواتير القابلة للإعداد مشمولة في الحسابات الرقابية، وترحيل السنة من الإعدادات. تسوية
        فروق العملات غير مفعّلة. الفترات في الدخل تختلف عن المركز التراكمي؛ مجمع الإهلاك يظهر أصلًا
        مقابلًا سالبًا.
      </div>
    </>
  );
}
