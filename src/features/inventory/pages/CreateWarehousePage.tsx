import { WarehouseDirectory } from '@/features/inventory/components/screens/WarehouseDirectory';
/** إضافة مخزن — feature-owned route content. */
export default function CreateWarehousePage() {
  return (
    <section className="screen-page" data-screen="inventory~warehouses-add">
      <WarehouseDirectory shouldInitiallyAdd />
    </section>
  );
}
