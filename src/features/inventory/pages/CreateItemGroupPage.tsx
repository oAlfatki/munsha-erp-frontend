import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import type { PageDefinition } from '@/core/types/PageDefinition';
import { MasterScreen } from '@/features/accounting/components/MasterDataScreen';
import { useInventoryData } from '@/features/inventory/hooks/useInventoryData';
const DEFINITION: PageDefinition = {
  id: 'groups-add',
  module: 'inventory',
  title: 'إضافة مجموعة',
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
/** إضافة مجموعة — feature-owned route content. */
export default function CreateItemGroupPage() {
  const featureData = useInventoryData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="inventory~groups-add">
          <MasterScreen screen={DEFINITION} />
        </section>
      }
    </FeatureDataScope>
  );
}
