import { collection } from '@/core/query/resources';
import type { ErpReadModel } from '@/core/types/ErpReadModel';
import { fetchAuditEvents } from '@/features/users/api/read-api';
export const AUDIT_RESOURCE = collection(
  'users',
  'audit',
  fetchAuditEvents,
  (items) => ({ audit: items }) as Partial<ErpReadModel>,
);
