import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import type { PageDefinition } from '@/core/types/PageDefinition';
import { CurrencyScreen } from '@/features/accounting/components/CurrencyScreen';
import { useAccountingData } from '@/features/accounting/hooks/useAccountingData';
const DEFINITION: PageDefinition = {
  id: 'currencies-add',
  module: 'accounts',
  title: 'إضافة عملة وسعر صرف',
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
/** إضافة عملة وسعر صرف — feature-owned route content. */
export default function CreateCurrencyPage() {
  const featureData = useAccountingData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="accounts~currencies-add">
          <CurrencyScreen screen={DEFINITION} />
        </section>
      }
    </FeatureDataScope>
  );
}
