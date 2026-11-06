import { Group } from '@/features/settings/components/Group';
import { Locked } from '@/features/settings/components/Locked';
import { Toggle } from '@/features/settings/components/Toggle';
import type { InventorySettingsPanelProps } from '@/features/settings/types/props/InventorySettingsPanelProps';

export function InventorySettingsPanel({
  draft,
  change,
  renderNumberField,
}: InventorySettingsPanelProps) {

  return (
    <>
      <Group title="التقييم والضوابط">
        <Locked
          label="طريقة تقييم تكلفة المخزون"
          value="متوسط متحرك لكل مخزن"
          reason="طريقة المحرك الحالية؛ لا تتغير إلى FIFO دون ترحيل تكلفة مدروس."
        />
        <Locked label="المخزون السالب" value="ممنوع دائمًا" />
        <Locked label="دقة الكميات والوحدات" value="حتى 6 منازل — وحدات 1 / 2 / 3" />
        <Toggle
          label="السماح بالتحويل بين المخازن"
          isChecked={draft.inventory.allowTransfer}
          onChange={(isV) => change('inventory', 'allowTransfer', isV)}
        />
        <Toggle
          label="السماح بالتحويل بين الفروع"
          isChecked={draft.inventory.allowCrossBranchTransfer}
          onChange={(isV) => change('inventory', 'allowCrossBranchTransfer', isV)}
        />
        <Toggle
          label="السماح بتسويات المخزون"
          isChecked={draft.inventory.allowAdjustment}
          onChange={(isV) => change('inventory', 'allowAdjustment', isV)}
        />
        <Toggle
          label="اشتراط سبب لتسوية المخزون"
          isChecked={draft.inventory.requireAdjustmentReason}
          onChange={(isV) => change('inventory', 'requireAdjustmentReason', isV)}
        />
        <Locked label="متابعة الصلاحية والتشغيلات" value="غير مفعّلة" />
      </Group>
      <Group title="افتراضيات الأصناف والعرض">
        <Toggle
          label="تفعيل تنبيهات انخفاض المخزون"
          isChecked={draft.inventory.alert}
          onChange={(isV) => change('inventory', 'alert', isV)}
        />
        <div className="form-grid">
          {renderNumberField('حد إعادة الطلب للصنف الجديد', draft.inventory.reorder, (v) =>
            change('inventory', 'reorder', v),
          )}
          {renderNumberField(
            'اقتراح الربح للصنف الجديد %',
            draft.inventory.profit,
            (v) => change('inventory', 'profit', v),
            1000,
          )}
          {renderNumberField(
            'حد الخصم الافتراضي للصنف الجديد %',
            draft.inventory.discount,
            (v) => change('inventory', 'discount', v),
            100,
          )}
        </div>
        <Toggle
          label="عرض الأصناف ذات الرصيد الصفري افتراضيًا"
          isChecked={draft.inventory.showZero}
          onChange={(isV) => change('inventory', 'showZero', isV)}
        />
        <p className="info-note">
          افتراضيات البطاقة لا تعدّل صنفًا محفوظًا. مخزن التشغيل الافتراضي مصدره إعدادات الفرع.
        </p>
      </Group>
    </>
  );
}
