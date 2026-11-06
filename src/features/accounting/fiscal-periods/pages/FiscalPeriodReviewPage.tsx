import { AnnualSettings } from '@/features/accounting/fiscal-periods/components/AnnualSettings';

/** السنة والفترات المالية — feature-owned route content. */

export default function FiscalPeriodReviewPage() {

  return (
    <section className="screen-page" data-screen="accounts~periods">
      <AnnualSettings isConnection={false} />
    </section>
  );
}
