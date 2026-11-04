import { MasterScreen } from "@/features/accounting/public/MasterDataScreen";
import type { MasterFormDefinition } from "@/features/accounting/public/types/MasterFormDefinition";
const DEFINITION = {title:'إضافة وحدة',collection:'units',fields:[
    {
      key: 'name',
      label: 'اسم الوحدة',
      type: 'text',
      required: true,
    },
    {
      key: 'category',
      label: 'فئة الاستخدام',
      type: 'select',
      required: true,
      options: [
        ['1', 'أحادية'],
        ['2', 'ثنائية'],
        ['3', 'ثلاثية'],
      ],
    },
  ],initiallyOpen:true} satisfies MasterFormDefinition;
/** إضافة وحدة — feature-owned route content. */
export default function CreateUnitPage() {
  

  return (
    <section className="screen-page">
          <MasterScreen screen={DEFINITION} />
        </section>
  );
}
