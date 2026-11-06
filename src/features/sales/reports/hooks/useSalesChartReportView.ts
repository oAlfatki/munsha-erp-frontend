import { fiscalRange } from '@/features/ledger/public';
import { useSalesChartReportQuery } from '@/features/sales/reports/queries/useSalesChartReportQuery';
import { buildSalesChartReport } from '@/features/sales/reports/services/build-sales-chart-report';
import { useReportFilters } from '@/shared/hooks/useReportFilters';
import { useReportPresentation } from '@/shared/hooks/useReportPresentation';
import type { ReportOptions } from '@/shared/types/reporting/ReportOptions';
export function useSalesChartReportView(options: ReportOptions) {
  const { state, branchId } = useSalesChartReportQuery();
  const range = fiscalRange(state);
  const filterState = useReportFilters({ ...range, warehouse: '', query: '', voucherKind: '' });
  const data = buildSalesChartReport(state, branchId, filterState.filters);
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
