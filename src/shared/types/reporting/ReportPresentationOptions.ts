import type { ReportData } from '@/core/types/reports/ReportData';
import type { useReportFilters } from '@/shared/hooks/useReportFilters';
import type { ReportOptions } from './ReportOptions';

export interface ReportPresentationOptions extends ReportOptions {
  data: ReportData;
  filterState: ReturnType<typeof useReportFilters>;
  context: {
    organizationName: string;
    branchName: string;
    warehouseOptions: { id: string; name: string }[];
  };
}
