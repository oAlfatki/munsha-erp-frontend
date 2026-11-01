import type { UserRole } from '@/core/types/UserRole';
export interface Identity {
  userId: string;
  displayName: string;
  fullName: string | null;
  email: string;
  kind: 'owner' | 'local';
  role: UserRole;
  mustChange: boolean;
  sessionId?: string;
}
