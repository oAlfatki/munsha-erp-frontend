import type { BookState } from '@/features/ledger/types/models/BookState';

export interface AnnualBook {
  id: string;
  name: string;
  year: number;
  status: 'current' | 'preparing' | 'closed';
  sourceId?: string;
  sourceVersion?: number;
  stockDone?: boolean;
  accountsDone?: boolean;
  state?: BookState;
}
