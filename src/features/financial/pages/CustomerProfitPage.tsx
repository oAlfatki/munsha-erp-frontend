import { ProfitByCustomerReport } from '@/features/financial/components/reports/ProfitByCustomerReport';
/** الأرباح من العملاء — feature-owned route content. */
export default function CustomerProfitPage() {
  

  return (
    <section className="screen-page" data-screen="financial~profit-customers">
          <ProfitByCustomerReport />
        </section>
  );
}
