import { Expenses } from '@/features/expenses/components/Expenses';
/** قائمة المصروفات — feature-owned route content. */
export default function ExpenseListPage() {
  

  return (
    <section className="screen-page" data-screen="expenses~expense-list">
          <Expenses mode="list" />
        </section>
  );
}
