import { exportPdf } from '@/core/reporting/service';
import { fmt } from '@/core/utils/formatters';
import { ProductEditor } from '@/features/inventory/products/components/ProductEditor';
import { useCatalogController } from '@/features/inventory/products/hooks/useCatalogController';
import { extras } from '@/features/ledger/public';
import type { EditableListOptions } from '@/shared/types/EditableListOptions';
import { ViewButton } from '@/shared/ui/actions/ViewButton';
import { Pill } from '@/shared/ui/display/Pill';
import { SearchBox } from '@/shared/ui/filters/SearchBox';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { ReportActions } from '@/shared/ui/reports/ReportActions';
import { DataTable } from '@/shared/ui/tables/DataTable';
import { Check, Layers3, Package } from 'lucide-react';
export function Catalog({ isInitialCreate = false }: EditableListOptions) {
  const model = useCatalogController(isInitialCreate);
  if (!model) return null;
  const { s, search, setSearch, editing, setEditing, items, close } = model;
  return (
    <>
      <PageHead
        title="دليل الأصناف"
        description="أصنافك، وحداتها وأسعارها. كل التفاصيل في مكان واحد."
        onAction={() => setEditing(null)}
        label="إضافة صنف"
        extra={
          <ReportActions
            onExport={() =>
              exportPdf(
                'الأصناف',
                ['الرمز', 'الاسم', 'المجموعة', 'سعر التجزئة'],
                items.map((product) => [
                  product.code,
                  product.name,
                  extras(s).records.productGroups?.find((g) => g.id === product.groupId)?.name ||
                    '—',
                  product.units.at(-1)!.retail,
                ]),
              )
            }
          />
        }
      />
      <div className="mini-stats">
        <div>
          <Package />
          <span>
            إجمالي الأصناف<b>{s.products.length}</b>
          </span>
        </div>
        <div>
          <Check />
          <span>
            الأصناف النشطة<b>{s.products.filter((product) => product.active).length}</b>
          </span>
        </div>
        <div>
          <Layers3 />
          <span>
            الوحدات المدعومة<b>أحادية / ثنائية / ثلاثية</b>
          </span>
        </div>
      </div>
      <div className="list-toolbar">
        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="ابحث باسم الصنف، الرمز أو الباركود…"
        />
        <span className="muted">{items.length} أصناف</span>
      </div>
      <DataTable
        headers={[
          'الصنف',
          'رمز الصنف',
          'عدد الوحدات',
          'الوحدة الأساسية',
          'تجزئة / حبة',
          'الحالة',
          'عرض',
        ]}
        rows={items.map((p) => [
          <div className="table-main">
            <span className="product-avatar">{p.name.slice(0, 1)}</span>
            <strong>{p.name}</strong>
          </div>,
          <span className="code">{p.code}</span>,
          String(p.units.length),
          p.units.at(-1)?.name,
          <strong className="numeric">
            {fmt(p.units.at(-1)!.retail)} <small>ر.ي</small>
          </strong>,
          <Pill tone={p.active ? 'green' : 'gray'}>{p.active ? 'نشط' : 'غير نشط'}</Pill>,
          <ViewButton onClick={() => setEditing(p)} />,
        ])}
      />
      {editing !== undefined && <ProductEditor product={editing} onClose={close} />}
    </>
  );
}
