import { useTaxReportQuery } from '@/features/accounting/queries/useTaxReportQuery';
import { fiscalRange } from "@/features/accounting/public/fiscal-range";
import { buildTaxReport } from '@/features/accounting/services/reports/build-tax-report';
import { useReportFilters } from '@/shared/hooks/useReportFilters';
import { useReportPresentation } from '@/shared/hooks/useReportPresentation';
import type { ReportOptions } from '@/shared/types/reporting/ReportOptions';
export function useTaxReportView(options:ReportOptions){const {state,branchId}=useTaxReportQuery();const range=fiscalRange(state);const filterState=useReportFilters({...range,warehouse:'',query:'',voucherKind:''});const data=buildTaxReport(state,branchId,filterState.filters);return useReportPresentation({...options,data,filterState,context:{organizationName:state.organization.name,branchName:state.branches.find(branch=>branch.id===branchId)?.name||'',warehouseOptions:[]}});}
