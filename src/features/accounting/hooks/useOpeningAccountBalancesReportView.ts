import { useOpeningAccountBalancesReportQuery } from '@/features/accounting/queries/useOpeningAccountBalancesReportQuery';
import { fiscalRange } from "@/features/accounting/public/fiscal-range";
import { buildOpeningAccountBalancesReport } from '@/features/accounting/services/reports/build-opening-account-balances-report';
import { useReportFilters } from '@/shared/hooks/useReportFilters';
import { useReportPresentation } from '@/shared/hooks/useReportPresentation';
import type { ReportOptions } from '@/shared/types/reporting/ReportOptions';
export function useOpeningAccountBalancesReportView(options:ReportOptions){const {state,branchId}=useOpeningAccountBalancesReportQuery();const range=fiscalRange(state);const filterState=useReportFilters({...range,warehouse:'',query:'',voucherKind:''});const data=buildOpeningAccountBalancesReport(state,branchId,filterState.filters);return useReportPresentation({...options,data,filterState,context:{organizationName:state.organization.name,branchName:state.branches.find(branch=>branch.id===branchId)?.name||'',warehouseOptions:[]}});}
