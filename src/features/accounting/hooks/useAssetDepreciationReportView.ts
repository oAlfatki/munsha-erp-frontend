import { useAssetDepreciationReportQuery } from '@/features/accounting/queries/useAssetDepreciationReportQuery';
import { buildAssetDepreciationReport } from '@/features/accounting/services/reports/build-asset-depreciation-report';
import { fiscalRange } from '@/features/ledger/public/fiscal-range';
import { useReportFilters } from '@/shared/hooks/useReportFilters';
import { useReportPresentation } from '@/shared/hooks/useReportPresentation';
import type { ReportOptions } from '@/shared/types/reporting/ReportOptions';
export function useAssetDepreciationReportView(options: ReportOptions) {
  const { state, branchId } = useAssetDepreciationReportQuery();
  const range = fiscalRange(state);
  const filterState = useReportFilters({ ...range, warehouse: '', query: '', voucherKind: '' });
  const data = buildAssetDepreciationReport(state, branchId, filterState.filters);
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
