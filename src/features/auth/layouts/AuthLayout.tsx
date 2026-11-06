import type { AuthLayoutProps } from '@/features/auth/types/props/AuthLayoutProps';
import { GuestLayout } from '@/shared/ui/layout/GuestLayout';
import { ThemeToggle } from '@/shared/ui/actions/ThemeToggle';
import { Boxes, ShieldCheck } from 'lucide-react';

export function AuthLayout({ children }: AuthLayoutProps) {

  return (
    <GuestLayout
      aside={
        <>
          <span className="login-kicker">منشأة · ERP</span>
          <h1>
            أعمالك،
            <br />
            في مساحة واحدة.
          </h1>
          <p>المبيعات والمشتريات والمخزون والحسابات، مترابطة من المستند إلى التقرير.</p>
          <div className="login-story-stats">
            <span>مستندات مترابطة</span>
            <span>دفاتر حسب الفرع</span>
            <span>تقارير واضحة</span>
          </div>
          <Boxes size={180} strokeWidth={0.7} />
        </>
      }
    >
      <ThemeToggle />
      <span className="login-brand">
        <Boxes size={28} />
      </span>
      <p className="eyebrow">مرحبًا بك</p>
      <h2>تسجيل الدخول</h2>
      <p>ادخل باسم المستخدم وكلمة المرور للاتصال بنظام المنشأة.</p>
      {children}
      <div className="login-security">
        <ShieldCheck size={18} />
        <span>جلسات آمنة وكلمات مرور مستقلة لمستخدمي المنشأة.</span>
      </div>
    </GuestLayout>
  );
}
