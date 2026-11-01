import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import type { PageDefinition } from '@/app/types/PageDefinition';
import { MasterScreen } from '@/features/accounting/components/MasterDataScreen';
import { useAccountingData } from '@/features/accounting/hooks/useAccountingData';
const DEFINITION: PageDefinition = {
  id: 'contacts',
  module: 'accounts',
  title: 'حسابات الدائنين والمدينين المتنوعين',
  page: 159,
  mode: 'master',
  collection: 'contacts',
  fields: [
    {
      key: 'name',
      label: 'اسم الحساب / الطرف',
      type: 'text',
      required: true,
    },
    {
      key: 'address',
      label: 'العنوان',
      type: 'text',
      required: false,
    },
    {
      key: 'phone',
      label: 'رقم الهاتف',
      type: 'text',
      required: false,
    },
    {
      key: 'kind',
      label: 'نوع العلاقة',
      type: 'select',
      required: true,
      options: [
        ['debtor', 'مدين متنوع'],
        ['creditor', 'دائن متنوع'],
      ],
    },
    {
      key: 'account',
      label: 'الحساب المرتبط من دليل الحسابات',
      type: 'account',
      required: true,
    },
    {
      key: 'limit',
      label: 'سقف الحساب',
      type: 'number',
      required: false,
    },
  ],
  note: 'بطاقة طرف متنوع مرتبطة بحساب فرعي للأصول أو الالتزامات. إثبات الذمة والسداد من شاشة حركة الأطراف.',
};
/** حسابات الدائنين والمدينين المتنوعين — feature-owned route content. */
export default function AccountingContactListPage() {
  const featureData = useAccountingData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="accounts~contacts">
          <MasterScreen screen={DEFINITION} />
        </section>
      }
    </FeatureDataScope>
  );
}
