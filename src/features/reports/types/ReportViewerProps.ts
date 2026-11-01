import type { ErpReadModel } from '@/core/types/ErpReadModel';
import type { Filters } from '@/core/types/Filters';
import type { ReportData } from '@/core/types/ReportData';
import type { ReportDocument } from '@/core/types/ReportDocument';
import type { ReactNode } from 'react';
export interface ReportViewerProps {
  title: string;
  buildData: (state: ErpReadModel, branch: string, filters: Filters) => ReportData;
  summaryColumns?: number[];
  shouldShowFrom?: boolean;
  isAsOf?: boolean;
  shouldShowWarehouse?: boolean;
  extraFilters?: (filters: Filters, setFilters: (next: Filters) => void) => ReactNode;
  renderDetails?: (row: (string | number)[]) => ReactNode;
  rowDocument?: (row: (string | number)[]) => ReportDocument | undefined;
  getAmount?: (rows: (string | number)[][]) => number;
  extraTotals?: (rows: (string | number)[][]) => [string, string][];
  renderVisualization?: (data: ReportData) => ReactNode;
}
