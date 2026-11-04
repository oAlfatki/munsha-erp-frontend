import { CashFlowReport } from '@/features/financial/components/reports/CashFlowReport';
/** قائمة التدفقات النقدية — feature-owned route content. */
export default function CashFlowPage() {
  

  return (
    <section className="screen-page" data-screen="financial~cash-flow">
          <CashFlowReport />
        </section>
  );
}
