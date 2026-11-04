import { MasterScreen } from "@/features/accounting/public/MasterDataScreen";
import type { MasterFormDefinition } from "@/features/accounting/public/types/MasterFormDefinition";
const DEFINITION = {title:'مجموعات العملاء والموردين',note:'تعريف مجموعات وربطها ببطاقات العملاء والموردين، مع تصفية القوائم حسب المجموعة.',collection:'groups',fields:[
    {
      key: 'name',
      label: 'اسم المجموعة',
      type: 'text',
      required: true,
    },
    {
      key: 'kind',
      label: 'نوع المجموعة',
      type: 'select',
      required: true,
      options: [
        ['customer', 'عملاء'],
        ['supplier', 'موردون'],
      ],
    },
    {
      key: 'note',
      label: 'ملاحظات',
      type: 'text',
      required: false,
    },
  ]} satisfies MasterFormDefinition;
/** مجموعات العملاء والموردين — feature-owned route content. */
export default function PartyGroupListPage() {
  

  return (
    <section className="screen-page">
          <MasterScreen screen={DEFINITION} />
        </section>
  );
}
