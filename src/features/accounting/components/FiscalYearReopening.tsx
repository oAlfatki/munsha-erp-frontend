import { ROUTES } from '@/core/config/navigation-paths';
import { useApplication } from '@/core/state/ApplicationProvider';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { Button } from '@/shared/ui/primitives/button';
export function FiscalYearReopening() {
  const { navigate } = useApplication();
  return (
    <>
      <PageHead
        title="إعادة فتح فترة"
        description="السنة المؤرشفة محفوظة للعرض فقط. إعادة فتحها للتعديل ليست مفعلة في النسخة الحالية."
      />
      <section className="panel form-panel">
        <h2>إدارة الفترات والأرشيف</h2>
        <p>
          يمكن فتح السنة السابقة لعرض التقارير ثم الرجوع للسنة الحالية. لن يغيّر زر العرض حالة
          الإقفال أو الأرصدة.
        </p>
        <Button onClick={() => navigate(ROUTES.SETTINGS_ANNUAL_BOOKS)}>فتح الفترات والأرشيف</Button>
      </section>
    </>
  );
}
