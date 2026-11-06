import { Group } from '@/features/settings/components/Group';
import { Locked } from '@/features/settings/components/Locked';
import { Toggle } from '@/features/settings/components/Toggle';
import type { ExpensesSettingsPanelProps } from '@/features/settings/types/props/ExpensesSettingsPanelProps';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';

export function ExpensesSettingsPanel({
  s: state,
  draft,
  change,
  renderNumberField,
  renderInheritedCash,
}: ExpensesSettingsPanelProps) {

  return (
    <>
      <Group title="المصروفات">
        <Field label="عملة المصروف الافتراضية">
          <Select
            value={draft.expenses.currency}
            onChange={(e) => change('expenses', 'currency', e.target.value)}
          >
            {state.currencies
              .filter(
                (c) => draft.accounting.multiCurrency || c.code === state.organization.currency,
              )
              .map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} — {c.name}
                </option>
              ))}
          </Select>
        </Field>
        {renderInheritedCash('expense')}
        {renderNumberField(
          'حد قيمة المصروف المعتمد YER — صفر يعني دون حد إضافي',
          draft.expenses.maxExpense,
          (v) => change('expenses', 'maxExpense', v),
        )}
        <Locked label="بيان المصروف" value="إلزامي دائمًا" />
        <Locked
          label="اشتراط مرفق للمصروف / إلغاء مصروف نهائي"
          value="غير مفعّل"
          reason="محرك اعتماد إضافي ومرفقات المصروفات ليسا متاحين في هذه النسخة."
        />
      </Group>
      <Group title="سندات القبض والصرف">
        <Toggle
          label="اشتراط البيان في سند القبض أو الصرف"
          isChecked={draft.expenses.requireVoucherNote}
          onChange={(isV) => change('expenses', 'requireVoucherNote', isV)}
        />
        {renderInheritedCash('receipt')}
        {renderInheritedCash('payment')}
        <Locked
          label="عملات سندات الذمم"
          value="عدة مبالغ وعملات في السند الواحد"
          reason="لكل بند صندوق بعملته وسعر صرف محفوظ، وتسوى الذمة بالعملة الأساسية. إتاحة العملات الأجنبية من إعدادات المحاسبة والضرائب."
        />
        <Locked label="إلغاء سند نهائي / طباعته تلقائيًا" value="غير مفعّل" />
      </Group>
    </>
  );
}
