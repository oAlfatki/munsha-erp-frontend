import type { ReportCell } from '@/core/types/reports/ReportCell';

export interface ReportTable {
  title?: string;
  headers: string[];
  rows: ReportCell[][];
}
