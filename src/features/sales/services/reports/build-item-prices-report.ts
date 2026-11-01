import type {BuildItemPricesReportContext} from '@/features/sales/types/read-models/BuildItemPricesReportContext';
import type { ErpReadModel } from '@/core/types/ErpReadModel';
import type { Filters } from '@/core/types/Filters';
import type { ReportData } from '@/core/types/ReportData';
export function buildItemPricesReport(
  workspace: BuildItemPricesReportContext,
  branch: string,
  filters: Filters,
): ReportData {
  let reportData: ReportData = { headers: [], rows: [] };
  {
    reportData = {
      headers: [
        'رمز الصنف',
        'الصنف',
        'الوحدة',
        'المعامل',
        'شراء مرجعي',
        'سعر البيع',
        'تجزئة',
        'جملة',
        'خصم مسموح %',
        'باركود',
      ],
      rows: workspace.products
        .filter(
          (product) =>
            (!filters.category || String(product.category) === filters.category) &&
            (!filters.productId || product.id === filters.productId),
        )
        .flatMap((product) =>
          product.units.map((u) => [
            product.code,
            product.name,
            u.name,
            u.factor,
            u.purchase,
            filters.priceType === 'wholesale' ? u.wholesale : u.retail,
            u.retail,
            u.wholesale,
            product.maxDiscount,
            u.barcode,
          ]),
        ),
      note: 'أسعار البطاقات الحالية بالأساسية؛ لتعديلها افتح بطاقة الصنف من دليل الأصناف.',
    };
  }
  if (filters.query) {
    reportData.rows = reportData.rows.filter((row) =>
      row.join(' ').toLowerCase().includes(filters.query.toLowerCase()),
    );
  }
  return reportData;
}
