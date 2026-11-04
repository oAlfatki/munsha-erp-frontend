import { fiscalRange } from "@/features/accounting/public/fiscal-range";
import { useSupplierBalancesReportQuery } from '@/features/suppliers/queries/useSupplierBalancesReportQuery';
import { buildSupplierBalancesReport } from '@/features/suppliers/services/reports/build-supplier-balances-report';
import { useReportFilters } from '@/shared/hooks/useReportFilters';
import { useReportPresentation } from '@/shared/hooks/useReportPresentation';
import type { ReportOptions } from '@/shared/types/reporting/ReportOptions';
export function useSupplierBalancesReportView(options:ReportOptions){const {state,branchId}=useSupplierBalancesReportQuery();const range=fiscalRange(state);const filterState=useReportFilters({...range,warehouse:'',query:'',voucherKind:''});const data=buildSupplierBalancesReport(state,branchId,filterState.filters);return useReportPresentation({...options,data,filterState,context:{organizationName:state.organization.name,branchName:state.branches.find(branch=>branch.id===branchId)?.name||'',warehouseOptions:[]}});}
