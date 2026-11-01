import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import type { PageDefinition } from '@/app/types/PageDefinition';
import { MasterScreen } from '@/features/accounting/components/MasterDataScreen';
import { useInventoryData } from '@/features/inventory/hooks/useInventoryData';
const DEFINITION: PageDefinition = {
  id: 'units',
  module: 'inventory',
  title: 'قائمة الوحدات',
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
/** قائمة الوحدات — feature-owned route content. */
export default function UnitListPage() {
  const featureData = useInventoryData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="inventory~units">
          <MasterScreen screen={DEFINITION} />
        </section>
      }
    </FeatureDataScope>
  );
}
