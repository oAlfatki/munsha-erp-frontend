import { useProfitByCustomerReportQuery } from '@/features/financial/queries/useProfitByCustomerReportQuery';
import { buildProfitByCustomerReport } from '@/features/financial/services/reports/build-profit-by-customer-report';
import { fiscalRange } from '@/features/ledger/public';
import { useReportFilters } from '@/shared/hooks/useReportFilters';
import { useReportPresentation } from '@/shared/hooks/useReportPresentation';
import type { ReportOptions } from '@/shared/types/reporting/ReportOptions';

export function useProfitByCustomerReportView(options: ReportOptions) {

  const { state, branchId } = useProfitByCustomerReportQuery();
  const range = fiscalRange(state);
  const filterState = useReportFilters({ ...range, warehouse: '', query: '', voucherKind: '' });
  const data = buildProfitByCustomerReport(state, branchId, filterState.filters);
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
