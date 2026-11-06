import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { EmployeeResponse } from '@/features/personnel/types/responses/EmployeeResponse';
export type EmployeeListResponse = {
  items: Array<EmployeeResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
