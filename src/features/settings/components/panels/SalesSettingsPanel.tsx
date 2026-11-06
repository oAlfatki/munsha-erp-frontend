import { Group } from '@/features/settings/components/Group';
import { Locked } from '@/features/settings/components/Locked';
import { Toggle } from '@/features/settings/components/Toggle';
import type { SalesSettingsPanelProps } from '@/features/settings/types/props/SalesSettingsPanelProps';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';

export function SalesSettingsPanel({
  draft,
  change,
  renderNumberField,
  renderInheritedCash,
}: SalesSettingsPanelProps) {

  return (
    <>
      <Group title="سياسة البيع">
        <Field label="نوع السعر الافتراضي للمنشأة — قبل تخصيص الفرع والعميل">
          <Select
            value={draft.sales.defaultPrice}
            onChange={(e) => change('sales', 'defaultPrice', e.target.value)}
          >
            <option value="retail">تجزئة</option>
            <option value="wholesale">جملة</option>
          </Select>
        </Field>
        <Toggle
          label="السماح بالبيع الآجل"
          isChecked={draft.sales.allowCredit}
          onChange={(isV) => change('sales', 'allowCredit', isV)}
        />
        <Toggle
          label="السماح بالبيع بأقل من التكلفة"
          isChecked={draft.sales.allowBelowCost}
          onChange={(isV) => change('sales', 'allowBelowCost', isV)}
        />
        <Toggle
          label="السماح بخصم على مستوى الصنف"
          isChecked={draft.sales.lineDiscount}
          onChange={(isV) => change('sales', 'lineDiscount', isV)}
        />
        {renderNumberField(
          'أقصى خصم مبيعات % — مع تطبيق الحد الأقل من بطاقة الصنف',
          draft.sales.maxDiscount,
          (v) => change('sales', 'maxDiscount', v),
          100,
        )}
        <Toggle
          label="السماح بحذف مسودات فواتير المبيعات"
          isChecked={draft.sales.allowDraftDelete}
          onChange={(isV) => change('sales', 'allowDraftDelete', isV)}
        />
        {renderInheritedCash('sale')}
      </Group>
      <Group title="ضوابط ثابتة أو غير متاحة">
        <Locked label="العميل عند البيع الآجل" value="إلزامي" />
        <Locked
          label="البيع دون كمية متاحة / المخزون السالب"
          value="ممنوع"
          reason="سياسة واحدة ثابتة مرتبطة بتقييم المخزون؛ ليست مفتاحًا مستقلًا للبيع."
        />
        <Locked label="خصم إجمالي على الفاتورة" value="غير مفعّل" />
        <Locked label="مرتجع المبيعات وربطه بالأصل" value="مدعوم وربط الأصل إلزامي" />
        <Locked label="تعديل أو إلغاء نهائي مباشر" value="غير مسموح — التصحيح بمرتجع" />
        <Locked
          label="الطباعة تلقائيًا بعد الحفظ"
          value="غير مفعّلة"
          reason="الطباعة الحالية تبدأ من زر الطباعة ومعاينة المتصفح."
        />
      </Group>
    </>
  );
}
