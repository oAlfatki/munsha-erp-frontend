import type { ReadScope } from '@/core/types/api/ReadScope';
import type { AuditEventResponse } from '@/features/users/public';
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
