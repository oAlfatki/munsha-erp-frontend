import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import type { PageDefinition } from '@/app/types/PageDefinition';
import { MasterScreen } from '@/features/accounting/components/MasterDataScreen';
import { useInventoryData } from '@/features/inventory/hooks/useInventoryData';
const DEFINITION: PageDefinition = {
  id: 'groups',
  module: 'inventory',
  title: 'قائمة المجموعات',
  page: 83,
  mode: 'master',
  collection: 'productGroups',
  fields: [
    {
      key: 'name',
      label: 'اسم المجموعة',
      type: 'text',
      required: true,
    },
    {
      key: 'note',
      label: 'ملاحظات',
      type: 'text',
      required: false,
    },
  ],
  note: 'مجموعات لتصنيف الأصناف وإدارة البحث والتقارير.',
};
/** قائمة المجموعات — feature-owned route content. */
export default function ItemGroupListPage() {
  const featureData = useInventoryData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="inventory~groups">
          <MasterScreen screen={DEFINITION} />
        </section>
      }
    </FeatureDataScope>
  );
}
