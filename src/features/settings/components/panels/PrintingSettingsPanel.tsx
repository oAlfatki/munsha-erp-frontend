import { Group } from '@/features/settings/components/Group';
import { Locked } from '@/features/settings/components/Locked';
import { Toggle } from '@/features/settings/components/Toggle';
import type { PrintingSettingsPanelProps } from '@/features/settings/types/props/PrintingSettingsPanelProps';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { Printer } from 'lucide-react';

export function PrintingSettingsPanel({
  device,
  setDevice,
  setPreview,
}: PrintingSettingsPanelProps) {

  return (
    <>
      <Group title="تنسيق الطباعة على هذا الجهاز">
        <Field label="تنسيق محتوى الطباعة">
          <Select
            value={device.paper}
            onChange={(e) => setDevice({ ...device, paper: e.target.value as 'A4' | 'thermal' })}
          >
            <option value="A4">A4 — قياسي</option>
            <option value="thermal">محتوى بعرض 80mm — حراري</option>
          </Select>
        </Field>
        <Toggle
          label="إظهار الشعار في الطباعة"
          isChecked={device.logo}
          onChange={(isV) => setDevice({ ...device, logo: isV })}
        />
        <Toggle
          label="إظهار عنوان المنشأة في الطباعة"
          isChecked={device.address}
          onChange={(isV) => setDevice({ ...device, address: isV })}
        />
        <Toggle
          label="إظهار التفقيط في الطباعة"
          isChecked={device.words}
          onChange={(isV) => setDevice({ ...device, words: isV })}
        />
        <Field label="رسالة أسفل الطباعة">
          <Input
            maxLength={200}
            value={device.footer}
            onChange={(e) => setDevice({ ...device, footer: e.target.value })}
          />
        </Field>
        <Button type="button" variant="outline" onClick={() => setPreview(true)}>
          <Printer size={16} />
          معاينة إعدادات الطباعة
        </Button>
      </Group>
      <Group title="الطابعة والحقول الثابتة">
        <Locked
          label="الطابعة وعدد النسخ"
          value="من نافذة طباعة المتصفح"
          reason="الموقع لا يحدد طابعة النظام أو مسارًا محليًا تلقائيًا."
        />
        <Locked label="القالب" value="القالب القياسي الحالي" />
        <Locked
          label="بيانات العميل والخصومات"
          value="تظهر بحسب المستند"
          reason="إخفاء حقول انتقائي حسب نوع المستند يحتاج قوالب طباعة مستقلة."
        />
        <Locked label="الضرائب" value="تظهر عند وجود ضريبة في المستند" />
      </Group>
    </>
  );
}
