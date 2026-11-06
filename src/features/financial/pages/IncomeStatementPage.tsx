import { IncomeStatement } from '@/features/financial/components/screens/IncomeStatement';

/** قائمة الدخل — feature-owned route content. */

export default function IncomeStatementScreenIncomePage() {

  return (
    <section className="screen-page" data-screen="financial~income">
      <IncomeStatement />
    </section>
  );
}
