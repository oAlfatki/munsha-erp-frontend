import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import type { PageDefinition } from '@/core/types/PageDefinition';
import { MasterScreen } from '@/features/accounting/components/MasterDataScreen';
import { useAccountingData } from '@/features/accounting/hooks/useAccountingData';
const DEFINITION: PageDefinition = {
  id: 'cash-bank',
  module: 'accounts',
  title: 'إضافة الصناديق والبنوك',
  page: 155,
  mode: 'master',
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
  note: 'الصناديق مرتبطة بالفرع والعملة والحساب؛ سند صرف المصروف يستخدم الصندوق المحدد. الفواتير والسندات العامة تستخدم الصندوق الرئيسي في هذه النسخة.',
};
/** إضافة الصناديق والبنوك — feature-owned route content. */
export default function CreateCashAccountPage() {
  const featureData = useAccountingData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="accounts~cash-bank">
          <MasterScreen screen={DEFINITION} />
        </section>
      }
    </FeatureDataScope>
  );
}
