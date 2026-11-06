import { fmt } from '@/core/utils/formatters';
import { balance, extras } from '@/features/ledger/public';
import { SupplierEditor } from '@/features/suppliers/components/SupplierEditor';
import type { SupplierDirectoryViewProps } from '@/features/suppliers/types/props/SupplierDirectoryViewProps';
import { exportPdf } from '@/shared/services/report-actions';
import { ViewButton } from '@/shared/ui/actions/ViewButton';
import { Pill } from '@/shared/ui/display/Pill';
import { SearchBox } from '@/shared/ui/filters/SearchBox';
import { Select } from '@/shared/ui/forms/Select';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { ReportActions } from '@/shared/ui/reports/ReportActions';
import { DataTable } from '@/shared/ui/tables/DataTable';

export function SupplierDirectoryView({ model }: SupplierDirectoryViewProps) {

  if (!model) return null;
  const {
    s: state,
    closeEditor,
    searchQuery,
    setQ,
    group,
    setGroup,
    editing,
    setEditing,
    list,
  } = model;
  return (
    <>
      <PageHead
        title={'\u0627\u0644\u0645\u0648\u0631\u062F\u0648\u0646'}
        description={'كل بيانات مورديك وحساباتهم في مكان واحد.'}
        onAction={() => setEditing(null)}
        label={'إضافة ' + '\u0645\u0648\u0631\u062F'}
        extra={
          <ReportActions
            onExport={() =>
              exportPdf(
                '\u0627\u0644\u0645\u0648\u0631\u062F\u0648\u0646',
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
          {(extras(state).records.groups || [])
            .filter((g) => g.kind === 'supplier')
            .map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
        </Select>
        <span className="muted">
          {list.length} {'\u0627\u0644\u0645\u0648\u0631\u062F\u0648\u0646'}
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
            {fmt(Math.abs(balance(state, '210', party.id)))}{' '}
            <small>{balance(state, '210', party.id) >= 0 ? 'مدين' : 'دائن'}</small>
          </span>,
          <Pill>{party.active ? 'نشط' : 'غير نشط'}</Pill>,
          <ViewButton onClick={() => setEditing(party)} />,
        ])}
      />
      {editing !== undefined && (
        <SupplierEditor
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
