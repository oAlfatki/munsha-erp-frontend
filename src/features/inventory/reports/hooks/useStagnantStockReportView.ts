import { useStagnantStockReportQuery } from '@/features/inventory/reports/queries/useStagnantStockReportQuery';
import { buildStagnantStockReport } from '@/features/inventory/reports/services/build-stagnant-stock-report';
import { fiscalRange } from '@/features/ledger/public';
import { useReportFilters } from '@/shared/hooks/useReportFilters';
import { useReportPresentation } from '@/shared/hooks/useReportPresentation';
import type { ReportOptions } from '@/shared/types/reporting/ReportOptions';
export function useStagnantStockReportView(options: ReportOptions) {
  const { state, branchId } = useStagnantStockReportQuery();
  const range = fiscalRange(state);
  const filterState = useReportFilters({ ...range, warehouse: '', query: '', voucherKind: '' });
  const data = buildStagnantStockReport(state, branchId, filterState.filters);
  return useReportPresentation({
    ...options,
    data,
    filterState,
    context: {
      organizationName: state.organization.name,
      branchName: state.branches.find((branch) => branch.id === branchId)?.name || '',
      warehouseOptions: state.warehouses
        .filter((warehouse) => warehouse.branchId === branchId)
        .map((warehouse) => ({ id: warehouse.id, name: warehouse.name })),
    },
  });
}
