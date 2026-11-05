import type { AccessGrant } from './AccessGrant';
export interface AccessSnapshot {
  status: 'ready' | 'unsupported';
  grants: AccessGrant[];
  reason?: string;
}
