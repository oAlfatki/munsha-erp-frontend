import { fiscalRange } from "@/features/accounting/public/fiscal-range";
import { useUserAuditReportQuery } from '@/features/users/queries/useUserAuditReportQuery';
import { buildUserAuditReport } from '@/features/users/services/reports/build-user-audit-report';
import { useReportFilters } from '@/shared/hooks/useReportFilters';
import { useReportPresentation } from '@/shared/hooks/useReportPresentation';
import type { ReportOptions } from '@/shared/types/reporting/ReportOptions';
export function useUserAuditReportView(options:ReportOptions){const {state,branchId}=useUserAuditReportQuery();const range=fiscalRange(state);const filterState=useReportFilters({...range,warehouse:'',query:'',voucherKind:''});const data=buildUserAuditReport(state,branchId,filterState.filters);return useReportPresentation({...options,data,filterState,context:{organizationName:state.organization.name,branchName:state.branches.find(branch=>branch.id===branchId)?.name||'',warehouseOptions:[]}});}
