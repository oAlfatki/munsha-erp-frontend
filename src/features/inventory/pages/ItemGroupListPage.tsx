import { MasterScreen } from "@/features/accounting/public/MasterDataScreen";
import type { MasterFormDefinition } from "@/features/accounting/public/types/MasterFormDefinition";
const DEFINITION = {title:'قائمة المجموعات',note:'مجموعات لتصنيف الأصناف وإدارة البحث والتقارير.',collection:'productGroups',fields:[
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
  ]} satisfies MasterFormDefinition;
/** قائمة المجموعات — feature-owned route content. */
export default function ItemGroupListPage() {
  

  return (
    <section className="screen-page">
          <MasterScreen screen={DEFINITION} />
        </section>
  );
}
