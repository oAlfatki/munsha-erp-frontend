import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import type { PageDefinition } from '@/app/types/PageDefinition';
import { MasterScreen } from '@/features/accounting/components/MasterDataScreen';
import { useExpensesData } from '@/features/expenses/hooks/useExpensesData';
const DEFINITION: PageDefinition = {
  id: 'expense-types',
  module: 'expenses',
  title: 'أنواع المصروفات',
  page: 114,
  mode: 'master',
  collection: 'expenseTypes',
  fields: [
    {
      key: 'name',
      label: 'اسم نوع المصروف',
      type: 'text',
      required: true,
    },
    {
      key: 'account',
      label: 'الحساب المحاسبي',
      type: 'account',
      required: true,
    },
    {
      key: 'note',
      label: 'وصف الاستخدام',
      type: 'text',
      required: false,
    },
  ],
};
/** أنواع المصروفات — feature-owned route content. */
export default function ExpenseTypeListPage() {
  const featureData = useExpensesData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="expenses~expense-types">
          <MasterScreen screen={DEFINITION} />
        </section>
      }
    </FeatureDataScope>
  );
}
