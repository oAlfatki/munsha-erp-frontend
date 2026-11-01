import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import type { PageDefinition } from '@/core/types/PageDefinition';
import { MasterScreen } from '@/features/accounting/components/MasterDataScreen';
import { useInventoryData } from '@/features/inventory/hooks/useInventoryData';
const DEFINITION: PageDefinition = {
  id: 'units-add',
  module: 'inventory',
  title: 'إضافة وحدة',
  page: 82,
  mode: 'master',
  collection: 'units',
  fields: [
    {
      key: 'name',
      label: 'اسم الوحدة',
      type: 'text',
      required: true,
    },
    {
      key: 'category',
      label: 'فئة الاستخدام',
      type: 'select',
      required: true,
      options: [
        ['1', 'أحادية'],
        ['2', 'ثنائية'],
        ['3', 'ثلاثية'],
      ],
    },
  ],
};
/** إضافة وحدة — feature-owned route content. */
export default function CreateUnitPage() {
  const featureData = useInventoryData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="inventory~units-add">
          <MasterScreen screen={DEFINITION} />
        </section>
      }
    </FeatureDataScope>
  );
}
