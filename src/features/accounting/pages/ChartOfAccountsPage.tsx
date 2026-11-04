import { MasterScreen } from '@/features/master-data/public/MasterDataScreen';
import type { MasterFormDefinition } from '@/features/master-data/public/types/MasterFormDefinition';
const DEFINITION = {
  title: 'إضافة حساب ودليل الحسابات',
  collection: 'accounts',
  fields: [
    {
      key: 'name',
      label: 'اسم الحساب',
      type: 'text',
      required: true,
    },
    {
      key: 'parent',
      label: 'حساب الأب',
      type: 'account',
      required: false,
    },
    {
      key: 'code',
      label: 'رمز الحساب',
      type: 'text',
      required: true,
    },
    {
      key: 'type',
      label: 'التصنيف',
      type: 'select',
      required: true,
      options: [
        ['asset', 'أصول'],
        ['liability', 'التزامات'],
        ['equity', 'حقوق ملكية'],
        ['revenue', 'إيرادات'],
        ['expense', 'مصروفات'],
      ],
    },
    {
      key: 'nature',
      label: 'الطبيعة',
      type: 'select',
      required: true,
      options: [
        ['debit', 'مدين'],
        ['credit', 'دائن'],
      ],
    },
    {
      key: 'postable',
      label: 'قابل للقيد',
      type: 'select',
      required: true,
      options: [
        ['yes', 'نعم'],
        ['no', 'حساب تجميعي فقط'],
      ],
    },
  ],
} satisfies MasterFormDefinition;
/** إضافة حساب ودليل الحسابات — feature-owned route content. */
export default function ChartOfAccountsPage() {
  return (
    <section className="screen-page">
      <MasterScreen screen={DEFINITION} />
    </section>
  );
}
