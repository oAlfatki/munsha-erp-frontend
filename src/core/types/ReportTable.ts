import type { ReportCell } from '@/core/types/ReportCell';
export interface ReportTable {
  title?: string;
  headers: string[];
  rows: ReportCell[][];
}
