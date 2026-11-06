import { CashMovementReport } from '@/features/accounting/reports/components/CashMovementReport';
/** حركة الصندوق — feature-owned route content. */
export default function CashMovementPage() {
  return (
    <section className="screen-page" data-screen="accounts~cash-movement">
      <CashMovementReport />
    </section>
  );
}
