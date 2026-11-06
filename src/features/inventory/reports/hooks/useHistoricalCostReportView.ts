import { useHistoricalCostReportQuery } from '@/features/inventory/reports/queries/useHistoricalCostReportQuery';
import { buildHistoricalCostReport } from '@/features/inventory/reports/services/build-historical-cost-report';
import { fiscalRange } from '@/features/ledger/public';
import { useReportFilters } from '@/shared/hooks/useReportFilters';
import { useReportPresentation } from '@/shared/hooks/useReportPresentation';
import type { ReportOptions } from '@/shared/types/reporting/ReportOptions';

export function useHistoricalCostReportView(options: ReportOptions) {

  const { state, branchId } = useHistoricalCostReportQuery();
  const range = fiscalRange(state);
  const filterState = useReportFilters({ ...range, warehouse: '', query: '', voucherKind: '' });
  const data = buildHistoricalCostReport(state, branchId, filterState.filters);
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
