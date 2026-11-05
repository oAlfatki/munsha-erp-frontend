import { JournalScreen } from '@/features/accounting/journals/components/JournalEntryScreen';
import type { ScreenHeading } from '@/shared/types/ScreenHeading';
const DEFINITION = {
  title: 'إضافة قيد يومي يدوي',
  note: 'قيد متزن بالعملة الأساسية. الحسابات الرقابية للمخزون والذمم والرواتب والأصول تتغير من مستنداتها فقط.',
} satisfies ScreenHeading;
/** إضافة قيد يومي يدوي — feature-owned route content. */
export default function CreateJournalEntryPage() {
  return (
    <section className="screen-page">
      <JournalScreen screen={DEFINITION} />
    </section>
  );
}
