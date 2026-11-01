import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import type { PageDefinition } from '@/core/types/PageDefinition';
import { MasterScreen } from '@/features/accounting/components/MasterDataScreen';
import { usePartiesData } from '@/features/parties/hooks/usePartiesData';
const DEFINITION: PageDefinition = {
  id: 'groups',
  module: 'customers',
  title: 'مجموعات العملاء والموردين',
  page: 72,
  mode: 'master',
  collection: 'groups',
  fields: [
    {
      key: 'name',
      label: 'اسم المجموعة',
      type: 'text',
      required: true,
    },
    {
      key: 'kind',
      label: 'نوع المجموعة',
      type: 'select',
      required: true,
      options: [
        ['customer', 'عملاء'],
        ['supplier', 'موردون'],
      ],
    },
    {
      key: 'note',
      label: 'ملاحظات',
      type: 'text',
      required: false,
    },
  ],
  note: 'تعريف مجموعات وربطها ببطاقات العملاء والموردين، مع تصفية القوائم حسب المجموعة.',
};
/** مجموعات العملاء والموردين — feature-owned route content. */
export default function PartyGroupListPage() {
  const featureData = usePartiesData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="customers~groups">
          <MasterScreen screen={DEFINITION} />
        </section>
      }
    </FeatureDataScope>
  );
}
