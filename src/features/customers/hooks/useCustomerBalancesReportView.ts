import { useCustomerBalancesReportQuery } from '@/features/customers/queries/useCustomerBalancesReportQuery';
import { buildCustomerBalancesReport } from '@/features/customers/services/reports/build-customer-balances-report';
import { fiscalRange } from '@/features/ledger/public/fiscal-range';
import { useReportFilters } from '@/shared/hooks/useReportFilters';
import { useReportPresentation } from '@/shared/hooks/useReportPresentation';
import type { ReportOptions } from '@/shared/types/reporting/ReportOptions';
export function useCustomerBalancesReportView(options: ReportOptions) {
  const { state, branchId } = useCustomerBalancesReportQuery();
  const range = fiscalRange(state);
  const filterState = useReportFilters({ ...range, warehouse: '', query: '', voucherKind: '' });
  const data = buildCustomerBalancesReport(state, branchId, filterState.filters);
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
