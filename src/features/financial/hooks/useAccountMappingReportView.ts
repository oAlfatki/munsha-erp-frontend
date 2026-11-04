import { useAccountMappingReportQuery } from '@/features/financial/queries/useAccountMappingReportQuery';
import { buildAccountMappingReport } from '@/features/financial/services/reports/build-account-mapping-report';
import { fiscalRange } from '@/features/ledger/public/fiscal-range';
import { useReportFilters } from '@/shared/hooks/useReportFilters';
import { useReportPresentation } from '@/shared/hooks/useReportPresentation';
import type { ReportOptions } from '@/shared/types/reporting/ReportOptions';
export function useAccountMappingReportView(options: ReportOptions) {
  const { state, branchId } = useAccountMappingReportQuery();
  const range = fiscalRange(state);
  const filterState = useReportFilters({ ...range, warehouse: '', query: '', voucherKind: '' });
  const data = buildAccountMappingReport(state, branchId, filterState.filters);
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
