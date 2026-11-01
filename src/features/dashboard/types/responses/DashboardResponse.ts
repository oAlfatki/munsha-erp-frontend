import type { ReadScope } from '@/core/types/ReadScope';
import type { AuditEventResponse } from '@/features/users/types/responses/AuditEventResponse';
export type DashboardResponse = {
  lowStock: Array<{
    productId: string;
    name: string;
    availableQty: number;
    reorderLevel: number;
    unit: string;
  }>;
  recentAudit: Array<AuditEventResponse>;
  scope: ReadScope;
};
