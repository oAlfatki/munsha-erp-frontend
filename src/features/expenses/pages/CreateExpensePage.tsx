import { Expenses } from '@/features/expenses/components/Expenses';
/** إضافة مصروف — feature-owned route content. */
export default function CreateExpensePage() {
  return (
    <section className="screen-page" data-screen="expenses~add">
      <Expenses mode="add" />
    </section>
  );
}
