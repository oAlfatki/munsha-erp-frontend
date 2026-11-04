import { PurchaseReturnInvoice } from '@/features/purchases/components/returns/PurchaseReturnInvoice';
/** فاتورة مرتجع شراء — feature-owned route content. */
export default function PurchaseReturnsPage() {
  return (
    <section className="screen-page" data-screen="purchases~purchase-returns">
      <PurchaseReturnInvoice />
    </section>
  );
}
