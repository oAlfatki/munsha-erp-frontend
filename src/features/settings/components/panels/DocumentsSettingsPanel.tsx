import { PREFIXES } from '@/features/accounting/public';
import type { DocumentKind } from '@/features/ledger/public';
import { Group } from '@/features/settings/components/Group';
import { Locked } from '@/features/settings/components/Locked';
import { Toggle } from '@/features/settings/components/Toggle';
import type { DocumentsSettingsPanelProps } from '@/features/settings/types/props/DocumentsSettingsPanelProps';
import { DataTable } from '@/shared/ui/tables/DataTable';

export function DocumentsSettingsPanel({
  branchName,
  draft,
  change,
  setDraft,
}: DocumentsSettingsPanelProps) {

  return (
    <>
      <Group title="نطاق الترقيم">
        <Toggle
          label="ترقيم مستقل لكل فرع"
          isChecked={draft.documents.independentBranch}
          onChange={(isV) =>
            setDraft({
              ...draft,
              documents: {
                ...draft.documents,
                independentBranch: isV,
                showBranch: isV || draft.documents.showBranch,
              },
            })
          }
        />
        {draft.documents.independentBranch ? (
          <Locked label="إظهار رمز الفرع" value="إلزامي للترقيم المستقل" />
        ) : (
          <Toggle
            label="إظهار رمز الفرع في الرقم"
            isChecked={draft.documents.showBranch}
            onChange={(isV) => change('documents', 'showBranch', isV)}
          />
        )}
        <Toggle
          label="إظهار السنة في الرقم"
          isChecked={draft.documents.showYear}
          onChange={(isV) => change('documents', 'showYear', isV)}
        />
        <Toggle
          label="بدء تسلسل جديد مع السنة المالية"
          isChecked={draft.documents.resetYear}
          onChange={(isV) => change('documents', 'resetYear', isV)}
        />
        <p className="info-note">
          تطبق التغييرات على المستندات الجديدة بعد الحفظ. الأرقام السابقة لا تتغير. الرقم التالي
          يديره الخادم بمعاملة تحفظ الإصدار وتمنع التكرار؛ لا يمكن إدخاله يدويًا.
        </p>
      </Group>
      <Group title={'ترقيم المستندات · ' + branchName}>
        <DataTable
          headers={['نوع المستند', 'البادئة الثابتة', 'الرقم التالي — للقراءة']}
          rows={(Object.keys(PREFIXES) as DocumentKind[]).map((kind) => [
            {
              sale: 'فاتورة مبيعات',
              purchase: 'فاتورة مشتريات',
              receipt: 'سند قبض عام',
              payment: 'سند صرف عام',
              opening: 'افتتاح',
              transfer: 'تحويل مخزني',
              adjustment: 'تسوية مخزون',
            }[kind],
            PREFIXES[kind],
            'غير متاح من API الحالي',
          ])}
        />
        <Locked
          label="المرتجعات"
          value="RET- + رقم الفاتورة الأصلية"
          reason="مرجع مرتبط بالأصل، وليس تسلسلًا حرًا. سندات المصروفات والأطراف لها معرفات مرتبطة آمنة مستقلة."
        />
        <Locked
          label="تغيير البادئات الأساسية"
          value="مقفلة في هذه النسخة"
          reason="للمحافظة على تمييز أنواع المستندات والتقارير القديمة."
        />
      </Group>
    </>
  );
}
