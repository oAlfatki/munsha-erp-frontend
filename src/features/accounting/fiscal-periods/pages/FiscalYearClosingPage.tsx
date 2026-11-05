import { AnnualSettings } from '@/features/accounting/fiscal-periods/components/AnnualSettings';
/** مراجعة إقفال السنة والفترة — feature-owned route content. */
export default function FiscalYearClosingPage() {
  return (
    <section className="screen-page" data-screen="accounts~close">
      <AnnualSettings isConnection={false} />
    </section>
  );
}
