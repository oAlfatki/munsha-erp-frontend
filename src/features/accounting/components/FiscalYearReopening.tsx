import { PageHead } from '@/shared/ui/layout/PageHead';
import { Button } from '@/shared/ui/primitives/button';
import { useErpContext } from '@/core/hooks/useErpContext';
export function FiscalYearReopening() {
  const { navigate } = useErpContext();
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
        <Button onClick={() => navigate('/settings/annual-books')}>فتح الفترات والأرشيف</Button>
      </section>
    </>
  );
}
