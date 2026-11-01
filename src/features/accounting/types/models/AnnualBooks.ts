import type { AnnualBook } from '@/features/accounting/types/models/AnnualBook';
export interface AnnualBooks {
  activeId: string;
  books: AnnualBook[];
}
