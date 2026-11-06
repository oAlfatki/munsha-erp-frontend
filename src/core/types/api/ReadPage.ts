import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';

export interface ReadPage<T> {
  items: T[];
  pagination: ReadPagination;
  scope: ReadScope;
}
