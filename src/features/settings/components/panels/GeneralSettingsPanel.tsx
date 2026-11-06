import { ROUTES } from '@/core/config/navigation-paths';
import { Group } from '@/features/settings/components/Group';
import { Locked } from '@/features/settings/components/Locked';
import type { GeneralSettingsPanelProps } from '@/features/settings/types/props/GeneralSettingsPanelProps';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { Button } from '@/shared/ui/primitives/button';
import { Database } from 'lucide-react';

export function GeneralSettingsPanel({ navigate, device, setDevice }: GeneralSettingsPanelProps) {

  return (
    <>
      <Group title="واجهة الجهاز الحالي">
        <Field label="عدد السجلات في صفحة الجدول">
          <Select
            value={device.pageSize}
            onChange={(e) => setDevice({ ...device, pageSize: +e.target.value })}
          >
            {[10, 25, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n} سجل
              </option>
            ))}
          </Select>
        </Field>
        <Locked label="لغة النظام" value="العربية — RTL" />
        <Locked
          label="المظهر"
          value="فاتح بالهوية التجارية"
          reason="اللون والشعار من تبويب المنشأة؛ المظهر الداكن غير مفعّل."
        />
        <Locked label="تنسيق الأرقام" value="1,234.56" />
        <Locked label="التواريخ" value="حفظ ISO، وعرض الإدخال وفق المتصفح" />
      </Group>
      <Group title="النسخ والبيانات دون تكرار">
        <p>النسخ المباشر والاستعادة والجدولة ووجهة الحفظ في شاشة موحدة.</p>
        <Button type="button" variant="outline" onClick={() => navigate(ROUTES.SETTINGS_BACKUP)}>
          <Database size={16} />
          النسخ ونقاط الاسترجاع
        </Button>
        <Button
          type="button"
          variant="link"
          onClick={() => navigate(ROUTES.SETTINGS_BACKUP_POLICY)}
        >
          إعدادات النسخ الاحتياطي
        </Button>
      </Group>
    </>
  );
}
