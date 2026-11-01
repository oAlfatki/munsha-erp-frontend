import type { ReportTable } from '@/core/types/ReportTable';
export interface ReportDocument {
  title: string;
  metadata: [string, string][];
  tables: ReportTable[];
  totals: [string, string][];
  words: string[];
  notes: string[];
  signatures?: string[];
}
