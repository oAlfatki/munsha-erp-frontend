import { exportPdf } from '@/core/reporting/service';
import { fmt } from '@/core/utils/formatters';
import { CustomerEditor } from '@/features/customers/components/CustomerEditor';
import type { CustomerDirectoryViewProps } from '@/features/customers/types/CustomerDirectoryViewProps';
import { balance } from '@/features/ledger/public/account-balances';
import { extras } from '@/features/ledger/public/extensions';
import { ViewButton } from '@/shared/ui/actions/ViewButton';
import { Pill } from '@/shared/ui/display/Pill';
import { SearchBox } from '@/shared/ui/filters/SearchBox';
import { Select } from '@/shared/ui/forms/Select';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { ReportActions } from '@/shared/ui/reports/ReportActions';
import { DataTable } from '@/shared/ui/tables/DataTable';
export function CustomerDirectoryView({ model }: CustomerDirectoryViewProps) {
  if (!model) return null;
  const { s, closeEditor, searchQuery, setQ, group, setGroup, editing, setEditing, list } = model;
  return (
    <>
      <PageHead
        title={'\u0627\u0644\u0639\u0645\u0644\u0627\u0621'}
        description={'علاقات أقوى، وأرصدة واضحة لكل عميل.'}
        onAction={() => setEditing(null)}
        label={'إضافة ' + '\u0639\u0645\u064A\u0644'}
        extra={
          <ReportActions
            onExport={() =>
              exportPdf(
                '\u0627\u0644\u0639\u0645\u0644\u0627\u0621',
                ['الاسم', 'العنوان', 'الهاتف', 'العملة'],
                list.map((party) => [party.name, party.address, party.phone, party.currency]),
              )
            }
          />
        }
      />
      <div className="list-toolbar">
        <SearchBox
          value={searchQuery}
          onChange={setQ}
          placeholder="ابحث بالاسم، العنوان أو الهاتف…"
        />
        <Select
          aria-label="تصفية المجموعة"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
        >
          <option value="">كل المجموعات</option>
          {(extras(s).records.groups || [])
            .filter((g) => g.kind === 'customer')
            .map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
        </Select>
        <span className="muted">
          {list.length} {'\u0627\u0644\u0639\u0645\u0644\u0627\u0621'}
        </span>
      </div>
      <DataTable
        headers={[
          'الاسم',
          'العنوان',
          'رقم الهاتف',
          'العملة الأساسية',
          'الرصيد · YER',
          'الحالة',
          'عرض',
        ]}
        rows={list.map((party) => [
          <strong>{party.name}</strong>,
          party.address,
          <span dir="ltr">{party.phone}</span>,
          party.currency,
          <span className="numeric">
            {fmt(Math.abs(balance(s, '130', party.id)))}{' '}
            <small>{balance(s, '130', party.id) >= 0 ? 'مدين' : 'دائن'}</small>
          </span>,
          <Pill>{party.active ? 'نشط' : 'غير نشط'}</Pill>,
          <ViewButton onClick={() => setEditing(party)} />,
        ])}
      />
      {editing !== undefined && (
        <CustomerEditor
          key={editing?.id || 'new'}
          party={editing}
          onClose={() => {
            closeEditor();
          }}
        />
      )}
    </>
  );
}
