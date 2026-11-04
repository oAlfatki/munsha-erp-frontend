import { ProfitByItemReport } from '@/features/financial/components/reports/ProfitByItemReport';
/** الأرباح من الأصناف — feature-owned route content. */
export default function ProductProfitPage() {
  return (
    <section className="screen-page" data-screen="financial~profit-items">
      <ProfitByItemReport />
    </section>
  );
}
