import { useWarehouseTransfersReportQuery } from '@/features/inventory/reports/queries/useWarehouseTransfersReportQuery';
import { buildWarehouseTransfersReport } from '@/features/inventory/reports/services/build-warehouse-transfers-report';
import { fiscalRange } from '@/features/ledger/public';
import { useReportFilters } from '@/shared/hooks/useReportFilters';
import { useReportPresentation } from '@/shared/hooks/useReportPresentation';
import type { ReportOptions } from '@/shared/types/reporting/ReportOptions';

export function useWarehouseTransfersReportView(options: ReportOptions) {

  const { state, branchId } = useWarehouseTransfersReportQuery();
  const range = fiscalRange(state);
  const filterState = useReportFilters({ ...range, warehouse: '', query: '', voucherKind: '' });
  const data = buildWarehouseTransfersReport(state, branchId, filterState.filters);
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
