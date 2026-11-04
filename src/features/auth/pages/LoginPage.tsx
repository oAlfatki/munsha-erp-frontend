import { ThemeToggle } from '@/core/theme/ThemeToggle';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { Boxes,ShieldCheck } from 'lucide-react';
export default function LoginPage() {
  return (
    <main className="login-page" dir="rtl">
      <section className="login-story">
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
      </section>
      <section className="login-form-section">
        <div className="login-card">
          <ThemeToggle />
          <span className="login-brand">
            <Boxes size={28} />
          </span>
          <p className="eyebrow">مرحبًا بك</p>
          <h2>تسجيل الدخول</h2>
          <p>ادخل باسم المستخدم وكلمة المرور للاتصال بنظام المنشأة.</p>
          <LoginForm />
          <div className="login-security">
            <ShieldCheck size={18} />
            <span>جلسات آمنة وكلمات مرور مستقلة لمستخدمي المنشأة.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
