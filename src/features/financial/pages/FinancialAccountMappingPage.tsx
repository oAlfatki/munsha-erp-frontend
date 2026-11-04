import { AccountMappingReport } from '@/features/financial/components/reports/AccountMappingReport';
/** ربط الحسابات بالقوائم المالية — feature-owned route content. */
export default function FinancialAccountMappingPage() {
  return (
    <section className="screen-page" data-screen="financial~mapping">
      <AccountMappingReport />
    </section>
  );
}
