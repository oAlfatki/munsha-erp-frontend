import type { MasterFormDefinition } from '@/features/master-data/public';
import { MasterScreen } from '@/features/master-data/public';

const DEFINITION = {
  title: 'أنواع المصروفات',
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
} satisfies MasterFormDefinition;

/** أنواع المصروفات — feature-owned route content. */

export default function ExpenseTypeListPage() {

  return (
    <section className="screen-page">
      <MasterScreen screen={DEFINITION} />
    </section>
  );
}
