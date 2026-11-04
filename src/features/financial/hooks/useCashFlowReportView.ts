import { fiscalRange } from "@/features/accounting/public/fiscal-range";
import { useCashFlowReportQuery } from '@/features/financial/queries/useCashFlowReportQuery';
import { buildCashFlowReport } from '@/features/financial/services/reports/build-cash-flow-report';
import { useReportFilters } from '@/shared/hooks/useReportFilters';
import { useReportPresentation } from '@/shared/hooks/useReportPresentation';
import type { ReportOptions } from '@/shared/types/reporting/ReportOptions';
export function useCashFlowReportView(options:ReportOptions){const {state,branchId}=useCashFlowReportQuery();const range=fiscalRange(state);const filterState=useReportFilters({...range,warehouse:'',query:'',voucherKind:''});const data=buildCashFlowReport(state,branchId,filterState.filters);return useReportPresentation({...options,data,filterState,context:{organizationName:state.organization.name,branchName:state.branches.find(branch=>branch.id===branchId)?.name||'',warehouseOptions:[]}});}
