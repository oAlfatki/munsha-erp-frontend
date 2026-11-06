import { ROUTES } from '@/core/config/navigation-paths';
import { quantityByUnits } from '@/features/inventory/stock-balances/services/models/inventory-display';
import type { StockBalanceHeaderProps } from '@/features/inventory/stock-balances/types/props/StockBalanceHeaderProps';
import { exportPdf } from '@/shared/services/report-actions';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { ReportActions } from '@/shared/ui/reports/ReportActions';

export function StockBalanceHeader({ model }: StockBalanceHeaderProps) {

  const { s: state, navigate, tab, isShowUnits, warehouses, rows, moves } = model;
  return (
    <PageHead
      title="المخزون والمخازن"
      description="أرصدة دقيقة، تكلفة واضحة وحركة موثقة لكل صنف."
      onAction={() => navigate(ROUTES.INVENTORY_TRANSFER_DOCUMENT)}
      label="تحويل بين المخازن"
      extra={
        <ReportActions
          onExport={() =>
            tab === 'warehouses'
              ? exportPdf(
                  'قائمة المخازن',
                  ['اسم المخزن', 'الفرع', 'الأصناف ذات رصيد', 'الحالة'],
                  warehouses.map((warehouse) => [
                    warehouse.name,
                    state.branches.find((branch) => branch.id === warehouse.branchId)?.name || '',
                    state.stocks.filter((x) => x.warehouseId === warehouse.id && x.qty > 0).length,
                    warehouse.active ? 'نشط' : 'غير نشط',
                  ]),
                )
              : tab === 'movements'
                ? exportPdf(
                    'حركة الأصناف',
                    [
                      'التاريخ',
                      'المستند',
                      'الصنف',
                      'المخزن',
                      'الحركة',
                      'الكمية بالأساسية',
                      'القيمة YER',
                    ],
                    moves.map((m) => [
                      m.date,
                      m.reference,
                      state.products.find((product) => product.id === m.productId)?.name || '',
                      state.warehouses.find((warehouse) => warehouse.id === m.warehouseId)?.name ||
                        '',
                      m.kind,
                      m.qty,
                      m.value,
                    ]),
                  )
                : exportPdf(
                    'أرصدة المخزون',
                    [
                      'الصنف',
                      'الكمية',
                      ...(isShowUnits ? ['الكمية المتاحة للوحدات'] : []),
                      'القيمة YER',
                    ],
                    rows.map((x) => [
                      x.p.name,
                      x.qty,
                      ...(isShowUnits ? [quantityByUnits(x.qty, x.p.units)] : []),
                      x.value,
                    ]),
                  )
          }
        />
      }
    />
  );
}
