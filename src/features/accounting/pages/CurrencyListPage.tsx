import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import type { PageDefinition } from '@/app/types/PageDefinition';
import { CurrencyScreen } from '@/features/accounting/components/CurrencyScreen';
import { useAccountingData } from '@/features/accounting/hooks/useAccountingData';
const DEFINITION: PageDefinition = {
  id: 'currencies',
  module: 'accounts',
  title: 'قائمة العملات',
  page: 153,
  mode: 'currency',
  fields: [
    {
      key: 'name',
      label: 'اسم العملة',
      type: 'text',
      required: true,
    },
    {
      key: 'code',
      label: 'رمز العملة',
      type: 'text',
      required: true,
    },
    {
      key: 'date',
      label: 'تاريخ السريان',
      type: 'date',
      required: true,
    },
    {
      key: 'rate',
      label: 'عدد وحدات YER لكل وحدة أجنبية',
      type: 'number',
      required: true,
    },
    {
      key: 'source',
      label: 'مصدر السعر',
      type: 'text',
      required: true,
    },
  ],
  note: 'إضافة عملة وسعر مرجعي مؤرخ. سعر الصرف في المستند يظل نسخة تاريخية مستقلة، ولا تتغير قيود قديمة عند تحديث المرجع.',
};
/** قائمة العملات — feature-owned route content. */
export default function CurrencyListPage() {
  const featureData = useAccountingData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="accounts~currencies">
          <CurrencyScreen screen={DEFINITION} />
        </section>
      }
    </FeatureDataScope>
  );
}
