import type { ReactNode } from 'react';

export interface PaginationProps {
  page: number;
  hasNext: boolean;
  onPageChange: (page: number) => void;
  children?: ReactNode;
}
