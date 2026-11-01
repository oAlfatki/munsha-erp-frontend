import { ViewButton } from '@/core/components/shared/actions/ViewButton';
import { Pill } from '@/core/components/shared/display/Pill';
import { SearchBox } from '@/core/components/shared/filters/SearchBox';
import { Select } from '@/core/components/shared/forms/Select';
import { PageHead } from '@/core/components/shared/layout/PageHead';
import { ReportActions } from '@/core/components/shared/reports/ReportActions';
import { DataTable } from '@/core/components/shared/tables/DataTable';
import { exportPdf } from '@/core/reporting/service';
import { fmt } from '@/core/utils/formatters';
import { extras } from '@/features/accounting/services/models/extensions';
import { balance } from '@/features/accounting/utils/account-balances';
import { SupplierEditor } from '@/features/suppliers/components/SupplierEditor';
import { useSupplierDirectoryController } from '@/features/suppliers/hooks/useSupplierDirectoryController';
export function SupplierDirectory() {
  const model = useSupplierDirectoryController();
  if (!model) return null;
  const { s, navigate, view, searchQuery, setQ, group, setGroup, editing, setEditing, list } =
    model;
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
          {(extras(s).records.groups || [])
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
            {fmt(Math.abs(balance(s, '210', party.id)))}{' '}
            <small>{balance(s, '210', party.id) >= 0 ? 'مدين' : 'دائن'}</small>
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
            setEditing(undefined);
            if (view.endsWith('/new')) navigate('/suppliers');
          }}
        />
      )}
    </>
  );
}
