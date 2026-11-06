import type React from 'react';
export interface DataTableProps {
  headers: React.ReactNode[];
  rows: React.ReactNode[][];
  empty?: React.ReactNode;
  foot?: string;
}
