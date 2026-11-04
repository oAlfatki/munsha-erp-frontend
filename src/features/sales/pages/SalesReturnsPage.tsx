import { SalesReturnInvoice } from '@/features/sales/components/returns/SalesReturnInvoice';
/** فاتورة مرتجع مبيعات — feature-owned route content. */
export default function SalesReturnsPage() {
  

  return (
    <section className="screen-page" data-screen="sales~sales-returns">
          <SalesReturnInvoice />
        </section>
  );
}
