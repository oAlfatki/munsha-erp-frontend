import { MasterScreen } from '@/features/master-data/public/MasterDataScreen';
import type { MasterFormDefinition } from '@/features/master-data/public/types/MasterFormDefinition';
const DEFINITION = {
  title: 'قائمة الوحدات',
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
} satisfies MasterFormDefinition;
/** قائمة الوحدات — feature-owned route content. */
export default function UnitListPage() {
  return (
    <section className="screen-page">
      <MasterScreen screen={DEFINITION} />
    </section>
  );
}
