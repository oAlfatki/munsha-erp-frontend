import { WarehouseTransfersReport } from '@/features/inventory/components/reports/WarehouseTransfersReport';
/** فواتير التحويل بين المخازن — feature-owned route content. */
export default function StockTransferHistoryPage() {
  

  return (
    <section className="screen-page" data-screen="inventory~transfers">
          <WarehouseTransfersReport />
        </section>
  );
}
