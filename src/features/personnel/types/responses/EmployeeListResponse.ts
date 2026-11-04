import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { EmployeeResponse } from '@/features/personnel/types/responses/EmployeeResponse';
export type EmployeeListResponse = {
  items: Array<EmployeeResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
