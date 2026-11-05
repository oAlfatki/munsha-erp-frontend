import type { MasterFormDefinition } from '@/features/master-data/public';
import { MasterScreen } from '@/features/master-data/public';
const DEFINITION = {
  title: 'إضافة الصناديق والبنوك',
  note: 'الصناديق مرتبطة بالفرع والعملة والحساب؛ سند صرف المصروف يستخدم الصندوق المحدد. الفواتير والسندات العامة تستخدم الصندوق الرئيسي في هذه النسخة.',
  collection: 'cash',
  fields: [
    {
      key: 'name',
      label: 'اسم الصندوق أو البنك',
      type: 'text',
      required: true,
    },
    {
      key: 'branchId',
      label: 'الفرع',
      type: 'branch',
      required: true,
    },
    {
      key: 'kind',
      label: 'نوع الحساب',
      type: 'select',
      required: true,
      options: [
        ['cash', 'صندوق'],
        ['bank', 'حساب بنكي'],
      ],
    },
    {
      key: 'currency',
      label: 'العملة',
      type: 'select',
      required: true,
      options: [
        ['YER', 'ريال يمني'],
        ['SAR', 'ريال سعودي'],
        ['USD', 'دولار أمريكي'],
      ],
    },
    {
      key: 'bank',
      label: 'اسم البنك',
      type: 'text',
      required: false,
    },
    {
      key: 'iban',
      label: 'رقم الحساب / IBAN',
      type: 'text',
      required: false,
    },
    {
      key: 'account',
      label: 'الحساب المحاسبي',
      type: 'account',
      required: false,
    },
  ],
  initiallyOpen: true,
  showCashListLink: true,
} satisfies MasterFormDefinition;
/** إضافة الصناديق والبنوك — feature-owned route content. */
export default function CreateCashAccountPage() {
  return (
    <section className="screen-page">
      <MasterScreen screen={DEFINITION} />
    </section>
  );
}
