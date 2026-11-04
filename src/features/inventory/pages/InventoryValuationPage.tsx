import { InventoryCost } from '@/features/inventory/components/InventoryCost';
/** تقرير تكلفة المخزون — feature-owned route content. */
export default function InventoryValuationPage() {
  

  return (
    <section className="screen-page" data-screen="inventory~cost">
          <InventoryCost />
        </section>
  );
}
