import { CurrencyDocumentsReport } from '@/features/accounting/reports/components/CurrencyDocumentsReport';

/** مراجعة أرصدة العملات — feature-owned route content. */

export default function CurrencyDocumentsPage() {

  return (
    <section className="screen-page" data-screen="accounts~fx">
      <CurrencyDocumentsReport />
    </section>
  );
}
