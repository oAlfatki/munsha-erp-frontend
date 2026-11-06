import { ROUTES } from '@/core/config/navigation-paths';
import { Group } from '@/features/settings/components/Group';
import { Locked } from '@/features/settings/components/Locked';
import type { CompanySettingsPanelProps } from '@/features/settings/types/props/CompanySettingsPanelProps';
import { Field } from '@/shared/ui/forms/Field';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { toast } from 'sonner';

export function CompanySettingsPanel({
  navigate,
  company,
  setCompany,
  s: state,
}: CompanySettingsPanelProps) {

  return (
    <>
      <Group title="بيانات النشاط والهوية التجارية">
        <div className="form-grid">
          {[
            ['name', 'اسم المنشأة القانوني *'],
            ['tradeName', 'الاسم التجاري / اسم النظام *'],
            ['activity', 'نوع النشاط التجاري'],
            ['address', 'العنوان'],
            ['phone', 'الهاتف'],
            ['email', 'البريد الإلكتروني'],
            ['taxNumber', 'الرقم الضريبي'],
            ['registrationNumber', 'رقم السجل التجاري'],
            ['tagline', 'الوصف المختصر للهوية'],
          ].map(([key, title]) => (
            <Field key={key} label={title}>
              <Input
                required={key === 'name' || key === 'tradeName'}
                type={key === 'email' ? 'email' : 'text'}
                value={company[key as keyof typeof company]}
                onChange={(e) => setCompany({ ...company, [key]: e.target.value })}
              />
            </Field>
          ))}
          <Field label="اللون الرئيسي للهوية">
            <Input
              pattern="#[0-9a-fA-F]{6}"
              value={company.color}
              onChange={(e) => setCompany({ ...company, color: e.target.value })}
            />
          </Field>
          <Field label="شعار المنشأة — PNG / JPEG / WebP حتى 100KB">
            <Input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                if (
                  !['image/png', 'image/jpeg', 'image/webp'].includes(file.type) ||
                  file.size > 100000
                ) {
                  toast.error('اختر صورة PNG أو JPEG أو WebP حتى 100KB');
                  return;
                }
                const reader = new FileReader();
                reader.onload = () => setCompany({ ...company, logo: String(reader.result) });
                reader.readAsDataURL(file);
              }}
            />
          </Field>
          {company.logo && (
            <div>
              <img src={company.logo} alt="شعار المنشأة" width={85} />
              <Button
                type="button"
                variant="ghost"
                onClick={() => setCompany({ ...company, logo: '' })}
              >
                حذف الشعار
              </Button>
            </div>
          )}
        </div>
      </Group>
      <Group title="تأسيس المنشأة">
        <Locked
          label="العملة الأساسية"
          value={state.organization.currency}
          reason="عملة المحرك الحالية ثابتة، ولا تتغير بسعر صرف أو بعد وجود الحركات."
        />
        <Locked
          label="تعدد الفروع"
          value={
            state.branches.filter((branch) => branch.active).length > 1
              ? 'متعددة الفروع'
              : 'فرع واحد'
          }
          reason="يعكس الفروع النشطة فعليًا؛ إدارته من دليل الفروع."
        />
        <Button type="button" variant="outline" onClick={() => navigate(ROUTES.SETTINGS_BRANCHES)}>
          إدارة الفروع
        </Button>
      </Group>
    </>
  );
}
