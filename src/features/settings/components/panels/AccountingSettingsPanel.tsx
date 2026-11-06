import { ROUTES } from '@/core/config/navigation-paths';
import { isArchived } from '@/features/ledger/public';
import { Group } from '@/features/settings/components/Group';
import { Locked } from '@/features/settings/components/Locked';
import { Toggle } from '@/features/settings/components/Toggle';
import type { AccountingSettingsPanelProps } from '@/features/settings/types/props/AccountingSettingsPanelProps';
import { Button } from '@/shared/ui/primitives/button';
import { DataTable } from '@/shared/ui/tables/DataTable';

export function AccountingSettingsPanel({
  go,
  navigate,
  s: state,
  draft,
  change,
  chart,
  isBusy,
  organizationMutation,
  renderNumberField,
}: AccountingSettingsPanelProps) {

  return (
    <>
      <Group title="إعدادات الضرائب">
        <Toggle
          label="تفعيل الضريبة في الفواتير الجديدة"
          isChecked={draft.accounting.taxEnabled}
          onChange={(isV) => change('accounting', 'taxEnabled', isV)}
          note="يطبق على فواتير المبيعات والمشتريات الجديدة بعد حفظ التغييرات."
        />
        {renderNumberField(
          'نسبة الضريبة الافتراضية %',
          draft.accounting.taxRate,
          (v) => change('accounting', 'taxRate', v),
          100,
        )}
        <Locked
          label="طريقة احتساب الضريبة"
          value="تضاف إلى السعر بعد الخصومات"
          reason="الأسعار المدخلة لا تشمل الضريبة. تدعم الفاتورة نسبة ضريبة واحدة، وضريبة المشتريات قابلة للاسترداد."
        />
        <DataTable
          headers={['نوع الضريبة', 'الحساب المرتبط']}
          rows={[
            ['ضريبة المبيعات', '240 — ' + chart['240']?.name],
            ['ضريبة المشتريات', '165 — ' + chart['165']?.name],
          ]}
        />
        <p className="info-note">
          تحتفظ الفواتير المحفوظة بنسبتها ومبالغها، وتُحسب ضريبة المرتجع من الفاتورة الأصلية. تعطيل
          الضريبة لا يغير المستندات السابقة.
        </p>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(ROUTES.ACCOUNTING_TAX_REPORT)}
          >
            تقرير الضرائب
          </Button>
          <Button type="button" variant="link" onClick={() => go('company')}>
            تعديل الرقم الضريبي للمنشأة
          </Button>
        </div>
      </Group>
      <Group title="السنة والسياسات المحاسبية">
        <Locked
          label="سياسة التكلفة"
          value="جرد مستمر ومتوسط متحرك لكل مخزن"
          reason="المجاني في المشتريات يدخل في الكمية وتظل الأسعار التجارية مستقلة عن التكلفة."
        />
        {!state.organization.policyApproved ? (
          <Button
            type="button"
            disabled={isBusy || isArchived(state)}
            variant="outline"
            onClick={() =>
              organizationMutation.execute({ ...state.organization, policyApproved: true })
            }
          >
            اعتماد السياسة للسماح بالحفظ النهائي
          </Button>
        ) : (
          <Locked label="اعتماد سياسة التكلفة" value="معتمدة" />
        )}
        <Locked label="السنة المالية الحالية" value={String(state.organization.year)} />
        <Locked
          label="بداية ونهاية السنة"
          value={state.organization.year + '-01-01 ← ' + state.organization.year + '-12-31'}
          reason="سنة ميلادية كاملة في هذه النسخة؛ الإنشاء والانتقال عبر إدارة الفترات."
        />
        <Locked
          label="تقسيم الإقفال إلى فترات شهرية"
          value="غير مفعّل"
          reason="الحماية الحالية لإقفال السنة وأرشفتها؛ إقفال الأشهر يحتاج محرك فترات."
        />
        <Toggle
          label="السماح بالعملات المتعددة للمستندات الجديدة"
          isChecked={draft.accounting.multiCurrency}
          onChange={(isV) => change('accounting', 'multiCurrency', isV)}
          note="تظل المستندات السابقة وأسعار صرفها محفوظة."
        />
        <Toggle
          label="السماح بالأرصدة النقدية السالبة"
          isChecked={draft.accounting.allowNegativeCash}
          onChange={(isV) => change('accounting', 'allowNegativeCash', isV)}
          note="يطبق على رصيد الحساب النقدي لكل فرع. لا يمكن منعه مع وجود رصيد نقدي سالب."
        />
        <Locked
          label="دقة وتقريب المبالغ"
          value="منزلتان — لأقرب جزء من مئة"
          reason="ثابت لحماية اتساق القيود والتكلفة والتقارير."
        />
        <Locked label="منع التعديل في السنوات المؤرشفة" value="مفعّل دائمًا" />
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate(ROUTES.SETTINGS_ANNUAL_BOOKS)}
        >
          إدارة السنة والترحيل
        </Button>
      </Group>
      <Group title="ربط الحسابات الافتراضية">
        <DataTable
          headers={['الاستخدام', 'الحساب الحالي', 'الحالة']}
          rows={Object.entries({
            العملاء: '130',
            الموردون: '210',
            المبيعات: '400',
            المخزون: '120',
            'تكلفة البضاعة المباعة': '500',
            'فروق الجرد': '540',
            'الأرباح المرحلة': '310',
          }).map(([title, code]) => [title, code + ' — ' + chart[code]?.name, 'حساب رقابي ثابت'])}
        />
        <Locked
          label="المردودات والخصومات"
          value="عكس الأصل / صافي الفاتورة"
          reason="المحرك الحالي يعكس حسابات الأصل، ولا يملك ربطًا مستقلًا لحسابات المردودات."
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate(ROUTES.ACCOUNTING_ACCOUNTS)}
        >
          فتح دليل الحسابات
        </Button>
      </Group>
    </>
  );
}
