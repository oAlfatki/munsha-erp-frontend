import { AccountStatement } from '@/features/accounting/components/Statement';
/** كشف حساب — feature-owned route content. */
export default function AccountStatementPage() {
  return (
    <section className="screen-page" data-screen="accounts~statement">
      <AccountStatement />
    </section>
  );
}
