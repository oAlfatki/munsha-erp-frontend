import { fiscalRange } from "@/features/accounting/public/fiscal-range";
import { usePayrollReportQuery } from '@/features/employees/queries/usePayrollReportQuery';
import { buildPayrollReport } from '@/features/employees/services/reports/build-payroll-report';
import { useReportFilters } from '@/shared/hooks/useReportFilters';
import { useReportPresentation } from '@/shared/hooks/useReportPresentation';
import type { ReportOptions } from '@/shared/types/reporting/ReportOptions';
export function usePayrollReportView(options:ReportOptions){const {state,branchId}=usePayrollReportQuery();const range=fiscalRange(state);const filterState=useReportFilters({...range,warehouse:'',query:'',voucherKind:''});const data=buildPayrollReport(state,branchId,filterState.filters);return useReportPresentation({...options,data,filterState,context:{organizationName:state.organization.name,branchName:state.branches.find(branch=>branch.id===branchId)?.name||'',warehouseOptions:[]}});}
