import type { AccessGrant } from '@/core/types/access/AccessGrant';

export interface AccessSnapshot {
  status: 'ready' | 'unsupported';
  grants: AccessGrant[];
  reason?: string;
}
