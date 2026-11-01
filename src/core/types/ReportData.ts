export interface ReportData {
  headers: string[];
  rows: (string | number)[][];
  total?: number;
  note?: string;
}
