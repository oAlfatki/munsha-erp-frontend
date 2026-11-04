import { useVouchersReportQuery } from '@/features/accounting/queries/useVouchersReportQuery';
import { fiscalRange } from "@/features/accounting/public/fiscal-range";
import { buildVouchersReport } from '@/features/accounting/services/reports/build-vouchers-report';
import { useReportFilters } from '@/shared/hooks/useReportFilters';
import { useReportPresentation } from '@/shared/hooks/useReportPresentation';
import type { ReportOptions } from '@/shared/types/reporting/ReportOptions';
export function useVouchersReportView(options:ReportOptions){const {state,branchId}=useVouchersReportQuery();const range=fiscalRange(state);const filterState=useReportFilters({...range,warehouse:'',query:'',voucherKind:''});const data=buildVouchersReport(state,branchId,filterState.filters);return useReportPresentation({...options,data,filterState,context:{organizationName:state.organization.name,branchName:state.branches.find(branch=>branch.id===branchId)?.name||'',warehouseOptions:[]}});}
