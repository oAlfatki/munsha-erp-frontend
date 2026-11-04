import { MasterScreen } from '@/features/master-data/public/MasterDataScreen';
import type { MasterFormDefinition } from '@/features/master-data/public/types/MasterFormDefinition';
const DEFINITION = {
  title: 'حسابات الدائنين والمدينين المتنوعين',
  note: 'بطاقة طرف متنوع مرتبطة بحساب فرعي للأصول أو الالتزامات. إثبات الذمة والسداد من شاشة حركة الأطراف.',
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
} satisfies MasterFormDefinition;
/** حسابات الدائنين والمدينين المتنوعين — feature-owned route content. */
export default function AccountingContactListPage() {
  return (
    <section className="screen-page">
      <MasterScreen screen={DEFINITION} />
    </section>
  );
}
