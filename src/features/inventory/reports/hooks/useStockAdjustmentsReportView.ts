import { useStockAdjustmentsReportQuery } from '@/features/inventory/reports/queries/useStockAdjustmentsReportQuery';
import { buildStockAdjustmentsReport } from '@/features/inventory/reports/services/build-stock-adjustments-report';
import { fiscalRange } from '@/features/ledger/public';
import { useReportFilters } from '@/shared/hooks/useReportFilters';
import { useReportPresentation } from '@/shared/hooks/useReportPresentation';
import type { ReportOptions } from '@/shared/types/reporting/ReportOptions';

export function useStockAdjustmentsReportView(options: ReportOptions) {

  const { state, branchId } = useStockAdjustmentsReportQuery();
  const range = fiscalRange(state);
  const filterState = useReportFilters({ ...range, warehouse: '', query: '', voucherKind: '' });
  const data = buildStockAdjustmentsReport(state, branchId, filterState.filters);
  return useReportPresentation({
    ...options,
    data,
    filterState,
    context: {
      organizationName: state.organization.name,
      branchName: state.branches.find((branch) => branch.id === branchId)?.name || '',
      warehouseOptions: [],
    },
  });
}
