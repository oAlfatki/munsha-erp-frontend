import { branchDefaults } from '@/features/organization/public';
import { Group } from '@/features/settings/components/Group';
import { Locked } from '@/features/settings/components/Locked';
import { Toggle } from '@/features/settings/components/Toggle';
import type { PurchasesSettingsPanelProps } from '@/features/settings/types/props/PurchasesSettingsPanelProps';

export function PurchasesSettingsPanel({
  s: state,
  draft,
  change,
  branchId,
  renderInheritedCash,
}: PurchasesSettingsPanelProps) {

  return (
    <>
      <Group title="سياسة الشراء">
        <Toggle
          label="السماح بالشراء الآجل"
          isChecked={draft.purchases.allowCredit}
          onChange={(isV) => change('purchases', 'allowCredit', isV)}
        />
        <Toggle
          label="تحديث سعر الشراء المرجعي للوحدة عند الحفظ النهائي"
          isChecked={draft.purchases.updatePurchasePrice}
          onChange={(isV) => change('purchases', 'updatePurchasePrice', isV)}
          note="يحدث الوحدة المشتراة بسعرها الصافي بالأساسية؛ لا يغير تكلفة مخزون سابقة."
        />
        <Toggle
          label="منع تكرار رقم فاتورة المورد لنفس المورد"
          isChecked={draft.purchases.preventDuplicateSupplierNumber}
          onChange={(isV) => change('purchases', 'preventDuplicateSupplierNumber', isV)}
        />
        <Toggle
          label="السماح بحذف مسودات المشتريات"
          isChecked={draft.purchases.allowDraftDelete}
          onChange={(isV) => change('purchases', 'allowDraftDelete', isV)}
        />
        {renderInheritedCash('purchase')}
        <Locked
          label="مخزن المشتريات الافتراضي"
          value={
            state.warehouses.find(
              (warehouse) =>
                warehouse.id ===
                (branchDefaults(state, branchId).purchaseWarehouseId ||
                  branchDefaults(state, branchId).warehouseId),
            )?.name || 'غير محدد'
          }
          reason="مصدره إعدادات الفرع."
        />
      </Group>
      <Group title="قواعد الشراء المعتمدة">
        <Locked label="الزيادة المجانية" value="مدعومة دائمًا في الشراء" />
        <Locked label="مرتجع المشتريات وربطه بالأصل" value="مدعوم وربط الأصل إلزامي" />
        <Locked
          label="المورد النقدي الافتراضي"
          value="اختياري داخل الفاتورة"
          reason="المورد إلزامي عند الشراء الآجل؛ لا يُختار طرف تلقائي غير محدد."
        />
      </Group>
    </>
  );
}
