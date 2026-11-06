import type { AnnualBook } from '@/features/ledger/types/models/AnnualBook';

export interface AnnualBooks {
  activeId: string;
  books: AnnualBook[];
}
