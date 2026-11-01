import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import type { PageDefinition } from '@/core/types/PageDefinition';
import { MasterScreen } from '@/features/accounting/components/MasterDataScreen';
import { useAccountingData } from '@/features/accounting/hooks/useAccountingData';
const DEFINITION: PageDefinition = {
  id: 'accounts',
  module: 'accounts',
  title: 'إضافة حساب ودليل الحسابات',
  page: 138,
  mode: 'master',
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
};
/** إضافة حساب ودليل الحسابات — feature-owned route content. */
export default function ChartOfAccountsPage() {
  const featureData = useAccountingData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="accounts~accounts">
          <MasterScreen screen={DEFINITION} />
        </section>
      }
    </FeatureDataScope>
  );
}
