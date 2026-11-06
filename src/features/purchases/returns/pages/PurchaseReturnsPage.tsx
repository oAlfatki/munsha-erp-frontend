import { PurchaseReturnInvoice } from '@/features/purchases/returns/components/PurchaseReturnInvoice';

/** فاتورة مرتجع شراء — feature-owned route content. */

export default function PurchaseReturnsPage() {

  return (
    <section className="screen-page" data-screen="purchases~purchase-returns">
      <PurchaseReturnInvoice />
    </section>
  );
}
