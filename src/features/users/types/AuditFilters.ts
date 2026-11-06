export interface AuditFilters {
  page: number;
  pageSize: number;
  search?: string;
  actorUserId?: number;
  branchId?: number;
  eventCode?: string;
  fromUtc?: string;
  toUtc?: string;
  sortDirection?: 'asc' | 'desc';
}
