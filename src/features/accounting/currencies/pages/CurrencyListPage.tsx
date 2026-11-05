import { CurrencyScreen } from '@/features/accounting/currencies/components/CurrencyScreen';
import type { ScreenHeading } from '@/shared/types/ScreenHeading';
const DEFINITION = {
  title: 'قائمة العملات',
  note: 'إضافة عملة وسعر مرجعي مؤرخ. سعر الصرف في المستند يظل نسخة تاريخية مستقلة، ولا تتغير قيود قديمة عند تحديث المرجع.',
} satisfies ScreenHeading;
/** قائمة العملات — feature-owned route content. */
export default function CurrencyListPage() {
  return (
    <section className="screen-page">
      <CurrencyScreen screen={DEFINITION} />
    </section>
  );
}
