import { fiscalRange } from "@/features/accounting/public/fiscal-range";
import { useReorderReportQuery } from '@/features/inventory/queries/useReorderReportQuery';
import { buildReorderReport } from '@/features/inventory/services/reports/build-reorder-report';
import { useReportFilters } from '@/shared/hooks/useReportFilters';
import { useReportPresentation } from '@/shared/hooks/useReportPresentation';
import type { ReportOptions } from '@/shared/types/reporting/ReportOptions';
export function useReorderReportView(options:ReportOptions){const {state,branchId}=useReorderReportQuery();const range=fiscalRange(state);const filterState=useReportFilters({...range,warehouse:'',query:'',voucherKind:''});const data=buildReorderReport(state,branchId,filterState.filters);return useReportPresentation({...options,data,filterState,context:{organizationName:state.organization.name,branchName:state.branches.find(branch=>branch.id===branchId)?.name||'',warehouseOptions:state.warehouses.filter(warehouse=>warehouse.branchId===branchId).map(warehouse=>({id:warehouse.id,name:warehouse.name}))}});}
