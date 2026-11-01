import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { SalesReturnInvoice } from '@/features/sales/components/returns/SalesReturnInvoice';
import { useSalesData } from '@/features/sales/hooks/useSalesData';
/** فاتورة مرتجع مبيعات — feature-owned route content. */
export default function SalesReturnsPage() {
  const featureData = useSalesData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="sales~sales-returns">
          <SalesReturnInvoice />
        </section>
      }
    </FeatureDataScope>
  );
}
