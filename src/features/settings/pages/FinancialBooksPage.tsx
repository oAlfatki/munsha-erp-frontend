import { AnnualSettings } from '@/features/accounting/public/AnnualSettings';
/** إنشاء الفترة المالية وترحيل الأرصدة — feature-owned route content. */
export default function FinancialBooksPage() {
  return (
    <section className="screen-page" data-screen="settings~annual-books">
      <AnnualSettings isConnection={false} />
    </section>
  );
}
