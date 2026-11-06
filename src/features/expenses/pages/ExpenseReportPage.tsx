import { Expenses } from '@/features/expenses/components/Expenses';

/** تقارير المصروفات — feature-owned route content. */

export default function ExpenseReportPage() {

  return (
    <section className="screen-page" data-screen="expenses~expense-report">
      <Expenses mode="report" />
    </section>
  );
}
