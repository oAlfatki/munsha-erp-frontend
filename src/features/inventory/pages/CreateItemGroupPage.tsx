import { MasterScreen } from "@/features/accounting/public/MasterDataScreen";
import type { MasterFormDefinition } from "@/features/accounting/public/types/MasterFormDefinition";
const DEFINITION = {title:'إضافة مجموعة',note:'مجموعات لتصنيف الأصناف وإدارة البحث والتقارير.',collection:'productGroups',fields:[
    {
      key: 'name',
      label: 'اسم المجموعة',
      type: 'text',
      required: true,
    },
    {
      key: 'note',
      label: 'ملاحظات',
      type: 'text',
      required: false,
    },
  ],initiallyOpen:true} satisfies MasterFormDefinition;
/** إضافة مجموعة — feature-owned route content. */
export default function CreateItemGroupPage() {
  

  return (
    <section className="screen-page">
          <MasterScreen screen={DEFINITION} />
        </section>
  );
}
