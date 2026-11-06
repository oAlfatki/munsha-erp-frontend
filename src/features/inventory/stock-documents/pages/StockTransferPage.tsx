import { StockDocuments } from '@/features/inventory/stock-documents/components/StockDocuments';
/** إضافة فاتورة تحويل مخزني — feature-owned route content. */
export default function StockTransferPage() {
  return (
    <section className="screen-page" data-screen="inventory~transfer-document">
      <StockDocuments kind="transfer" />
    </section>
  );
}
