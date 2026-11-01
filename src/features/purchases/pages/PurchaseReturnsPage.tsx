import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { PurchaseReturnInvoice } from '@/features/purchases/components/returns/PurchaseReturnInvoice';
import { usePurchasesData } from '@/features/purchases/hooks/usePurchasesData';
/** فاتورة مرتجع شراء — feature-owned route content. */
export default function PurchaseReturnsPage() {
  const featureData = usePurchasesData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="purchases~purchase-returns">
          <PurchaseReturnInvoice />
        </section>
      }
    </FeatureDataScope>
  );
}
