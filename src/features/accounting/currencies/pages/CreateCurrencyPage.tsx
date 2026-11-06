import { CurrencyScreen } from '@/features/accounting/currencies/components/CurrencyScreen';
import type { ScreenHeading } from '@/shared/types/ScreenHeading';

const DEFINITION = {
  title: 'إضافة عملة وسعر صرف',
  note: 'إضافة عملة وسعر مرجعي مؤرخ. سعر الصرف في المستند يظل نسخة تاريخية مستقلة، ولا تتغير قيود قديمة عند تحديث المرجع.',
  initiallyOpen: true,
} satisfies ScreenHeading;

/** إضافة عملة وسعر صرف — feature-owned route content. */

export default function CreateCurrencyPage() {

  return (
    <section className="screen-page">
      <CurrencyScreen screen={DEFINITION} />
    </section>
  );
}
