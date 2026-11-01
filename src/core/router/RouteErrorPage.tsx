import { Link, useRouteError } from 'react-router-dom';
export function RouteErrorPage() {
  const error = useRouteError();
  return (
    <main role="alert">
      <h1>تعذر عرض الصفحة</h1>
      <p>{error instanceof Error ? error.message : 'حدث خطأ أثناء فتح الشاشة.'}</p>
      <Link to="/dashboard">العودة إلى لوحة المتابعة</Link>
    </main>
  );
}
