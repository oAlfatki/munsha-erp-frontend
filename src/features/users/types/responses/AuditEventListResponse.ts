import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { AuditEventResponse } from "@/features/users/public/types/responses/AuditEventResponse";
export type AuditEventListResponse = {
  items: Array<AuditEventResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
