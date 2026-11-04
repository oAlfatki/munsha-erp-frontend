import { BalanceSheet } from '@/features/financial/components/screens/BalanceSheet';
/** قائمة المركز المالي — feature-owned route content. */
export default function BalanceSheetScreenBalanceSheetPage() {
  

  return (
    <section className="screen-page" data-screen="financial~balance-sheet">
          <BalanceSheet />
        </section>
  );
}
