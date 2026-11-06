export interface AuditLogItem {
  id: number;
  eventCode: string;
  actor?: { id: number; username: string; fullName?: string };
  targetType?: string;
  targetId?: string;
  branchId?: number;
  occurredAtUtc: string;
  outcome: 'Success' | 'Failure';
}
