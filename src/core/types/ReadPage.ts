import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
export interface ReadPage<T> {
  items: T[];
  pagination: ReadPagination;
  scope: ReadScope;
}
