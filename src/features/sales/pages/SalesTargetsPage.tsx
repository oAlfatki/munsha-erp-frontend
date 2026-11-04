import { SalesTargets } from '@/features/sales/components/SalesTargets';
/** أهداف المبيعات ومتابعة الإنجاز — feature-owned route content. */
export default function SalesTargetsPage() {
  return (
    <section className="screen-page" data-screen="sales~targets">
      <SalesTargets />
    </section>
  );
}
