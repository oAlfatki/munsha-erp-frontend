import { useCurrencyDocumentsReportQuery } from '@/features/accounting/queries/useCurrencyDocumentsReportQuery';
import { buildCurrencyDocumentsReport } from '@/features/accounting/services/reports/build-currency-documents-report';
import { fiscalRange } from '@/features/ledger/public/fiscal-range';
import { useReportFilters } from '@/shared/hooks/useReportFilters';
import { useReportPresentation } from '@/shared/hooks/useReportPresentation';
import type { ReportOptions } from '@/shared/types/reporting/ReportOptions';
export function useCurrencyDocumentsReportView(options: ReportOptions) {
  const { state, branchId } = useCurrencyDocumentsReportQuery();
  const range = fiscalRange(state);
  const filterState = useReportFilters({ ...range, warehouse: '', query: '', voucherKind: '' });
  const data = buildCurrencyDocumentsReport(state, branchId, filterState.filters);
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
