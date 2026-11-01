import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import type { PageDefinition } from '@/core/types/PageDefinition';
import { JournalScreen } from '@/features/accounting/components/JournalEntryScreen';
import { useAccountingData } from '@/features/accounting/hooks/useAccountingData';
const DEFINITION: PageDefinition = {
  id: 'journal-new',
  module: 'accounts',
  title: 'إضافة قيد يومي يدوي',
  page: 151,
  mode: 'journal',
  note: 'قيد متزن بالعملة الأساسية. الحسابات الرقابية للمخزون والذمم والرواتب والأصول تتغير من مستنداتها فقط.',
};
/** إضافة قيد يومي يدوي — feature-owned route content. */
export default function CreateJournalEntryPage() {
  const featureData = useAccountingData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="accounts~journal-new">
          <JournalScreen screen={DEFINITION} />
        </section>
      }
    </FeatureDataScope>
  );
}
