import { ROUTES } from '@/core/config/navigation-paths';

export function NotFoundPage() {

  return (
    <main className="empty">
      <h1>الصفحة غير موجودة</h1>
      <a href={ROUTES.DASHBOARD}>العودة إلى لوحة المتابعة</a>
    </main>
  );
}
