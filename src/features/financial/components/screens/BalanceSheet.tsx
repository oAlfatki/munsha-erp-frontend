import { exportPdf } from '@/core/reporting/service';
import { fmt } from '@/core/utils/formatters';
import { useBalanceSheetController } from '@/features/financial/hooks/useBalanceSheetController';
import { Pill } from '@/shared/ui/display/Pill';
import { Field } from '@/shared/ui/forms/Field';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { Input } from '@/shared/ui/primitives/input';
import { ReportActions } from '@/shared/ui/reports/ReportActions';
export function BalanceSheet() {
  const model = useBalanceSheetController();
  if (!model) return null;
  const { refresh, to, setTo, list, sum, income, bal } = model;
  const group = (type: string) =>
    list
      .filter(([, a]) => a.type === type)
      .map(([c, a]) => (
        <div key={c} className="financial-row">
          <span>{a.name}</span>
          <strong dir="ltr">{fmt((type === 'asset' ? 1 : -1) * bal(c))}</strong>
        </div>
      ));
  return (
    <>
      <PageHead
        title={'قائمة المركز المالي'}
        description="القوائم تتضمن جميع الحسابات التشغيلية والمضافة، مشتقة من القيود الفعلية."
        extra={
          <ReportActions
            onView={refresh}
            onExport={() =>
              exportPdf(
                'قائمة المركز المالي',
                ['البيان', 'YER'],
                [
                  ...list
                    .filter(([, a]) => ['asset', 'liability', 'equity'].includes(a.type))
                    .map(
                      ([c, a]) =>
                        [a.name, (a.type === 'asset' ? 1 : -1) * bal(c)] as [string, number],
                    ),
                  ['نتيجة السنة حتى التاريخ', income(false)],
                ],
              )
            }
          />
        }
      />
      <div className="filter-bar">
        {false}
        <Field label={'كما في تاريخ'}>
          <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        </Field>
        <Pill>YER · الفرع الحالي</Pill>
      </div>
      <div className="financial-grid single-financial">
        {false}
        {
          <section className="panel financial-panel">
            <h2>قائمة المركز المالي</h2>
            <p>تراكمي كما في {to}</p>
            <h3>الأصول</h3>
            {group('asset')}
            <div className="financial-row total">
              <span>إجمالي الأصول</span>
              <strong>{fmt(sum('asset'))}</strong>
            </div>
            <h3>الالتزامات وحقوق الملكية</h3>
            {group('liability')}
            {group('equity')}
            <div className="financial-row">
              <span>نتيجة السنة حتى التاريخ</span>
              <strong>{fmt(income(false))}</strong>
            </div>
            <div className="financial-row total">
              <span>إجمالي الالتزامات والملكية</span>
              <strong>{fmt(-sum('liability') - sum('equity') + income(false))}</strong>
            </div>
            <div className="financial-row">
              <span>فرق المطابقة</span>
              <strong>
                {fmt(sum('asset') + sum('liability') + sum('equity') - income(false))}
              </strong>
            </div>
          </section>
        }
      </div>
      <div className="info-note">
        ضريبة الفواتير القابلة للإعداد مشمولة في الحسابات الرقابية، وترحيل السنة من الإعدادات. تسوية
        فروق العملات غير مفعّلة. الفترات في الدخل تختلف عن المركز التراكمي؛ مجمع الإهلاك يظهر أصلًا
        مقابلًا سالبًا.
      </div>
    </>
  );
}
