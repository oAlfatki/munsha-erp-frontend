import type { AuditLogItem } from '@/features/users/types/AuditLogItem';

export interface AuditLogsPage {
  items: AuditLogItem[];
  page: number;
  pageSize: number;
  totalCount: number;
}
