import { cashOptions } from '@/features/ledger/public';
import { branchDefaults } from '@/features/organization/public';
import { Group } from '@/features/settings/components/Group';
import { Locked } from '@/features/settings/components/Locked';
import type { BranchesSettingsPanelProps } from '@/features/settings/types/props/BranchesSettingsPanelProps';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';

export function BranchesSettingsPanel({
  go,
  s: state,
  draft,
  branch,
  isDirty,
  setBranch,
  setBranchData,
  branchData,
}: BranchesSettingsPanelProps) {

  return (
    <>
      <Group title="الفرع ومصادر الافتراضيات">
        <Locked
          label="الفرع الافتراضي للمستخدم"
          value="من محدد الفرع في الشريط العلوي"
          reason="تفضيل مرتبط بهوية مستخدم فعلية غير مفعّل حاليًا."
        />
        {state.branches.filter((branch) => branch.active).length > 1 ? (
          <Field label="اختيار الفرع">
            <Select
              value={branch}
              onChange={(e) => {
                if (isDirty && !window.confirm('الانتقال إلى فرع آخر دون حفظ؟')) return;
                setBranch(e.target.value);
                setBranchData(branchDefaults(state, e.target.value));
              }}
            >
              {state.branches
                .filter((branch) => branch.active)
                .map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
            </Select>
          </Field>
        ) : (
          <p>{state.branches.find((b) => b.id === branch)?.name}</p>
        )}
        <div className="form-grid">
          <Field label="المخزن الافتراضي للفرع">
            <Select
              value={branchData.warehouseId}
              onChange={(e) => setBranchData({ ...branchData, warehouseId: e.target.value })}
            >
              <option value="">بدون اختيار</option>
              {state.warehouses
                .filter((warehouse) => warehouse.branchId === branch && warehouse.active)
                .map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </option>
                ))}
            </Select>
          </Field>
          <Field label="مخزن المشتريات — فارغ يعني مخزن الفرع">
            <Select
              value={branchData.purchaseWarehouseId}
              onChange={(e) =>
                setBranchData({ ...branchData, purchaseWarehouseId: e.target.value })
              }
            >
              <option value="">استخدام مخزن الفرع</option>
              {state.warehouses
                .filter((warehouse) => warehouse.branchId === branch && warehouse.active)
                .map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </option>
                ))}
            </Select>
          </Field>
          {(
            [
              ['cashId', 'الصندوق الأساسي للفرع'],
              ['saleCashId', 'صندوق البيع النقدي'],
              ['purchaseCashId', 'صندوق الشراء النقدي'],
              ['expenseCashId', 'صندوق المصروفات'],
              ['receiptCashId', 'صندوق سندات القبض'],
              ['paymentCashId', 'صندوق سندات الصرف'],
            ] as const
          ).map(([key, title]) => (
            <Field key={key} label={title}>
              <Select
                value={branchData[key]}
                onChange={(e) => setBranchData({ ...branchData, [key]: e.target.value })}
              >
                {key !== 'cashId' && <option value="">وراثة صندوق الفرع بعملة العملية</option>}
                {cashOptions(state, branch)
                  .filter(
                    (c) =>
                      c.active &&
                      (key === 'expenseCashId' || c.currency === state.organization.currency),
                  )
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} · {c.currency}
                    </option>
                  ))}
              </Select>
            </Field>
          ))}
          <Field label="نوع السعر الافتراضي للفرع">
            <Select
              value={branchData.priceType}
              onChange={(e) =>
                setBranchData({
                  ...branchData,
                  priceType: e.target.value as 'retail' | 'wholesale',
                })
              }
            >
              <option value="retail">تجزئة</option>
              <option value="wholesale">جملة</option>
            </Select>
          </Field>
          <Field label="رمز الفرع لترقيم المستندات — أحرف إنجليزية وأرقام">
            <Input
              pattern="[A-Z0-9]{1,8}"
              maxLength={8}
              value={branchData.code}
              onChange={(e) => setBranchData({ ...branchData, code: e.target.value.toUpperCase() })}
            />
          </Field>
        </div>
        <p className="info-note">
          المخازن والصناديق تُعرّف في قوائمها. هنا يحدد الاستخدام الافتراضي فقط، ولا تعاد كتابة
          المستندات السابقة. الفواتير وسندات الذمم النقدية تسجل بالعملة الأساسية، والمصروفات بصندوق
          عملتها.
        </p>
      </Group>
      <Group title="سياسات الفروع الثابتة">
        <Locked label="استقلال الأرصدة والقيود لكل فرع" value="مفعّل دائمًا" />
        <Locked
          label="مشاركة بطاقات العملاء والموردين"
          value="مشتركة للمنشأة"
          reason="الأرصدة منفصلة لكل فرع، أما تعريف الطرف فمشترك. الفصل التعريفي غير مدعوم حاليًا."
        />
        <Locked label="التحصيل نيابة عن فرع آخر" value="غير مفعّل" />
        <Locked
          label="التحويل بين الفروع"
          value={draft.inventory.allowCrossBranchTransfer ? 'مسموح' : 'ممنوع'}
          reason="مصدره الوحيد في إعدادات المخزون."
        />
        <Button type="button" variant="link" onClick={() => go('inventory')}>
          ضبط التحويلات
        </Button>
      </Group>
    </>
  );
}
