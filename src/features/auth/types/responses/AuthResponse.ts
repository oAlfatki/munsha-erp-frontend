import type { Identity } from '@/core/types/Identity';
import type { AuthSession } from '@/features/auth/types/responses/AuthSession';
import type { AuthUser } from '@/features/auth/types/responses/AuthUser';
export interface AuthResponse {
  user: Identity;
  users: AuthUser[];
  sessions: AuthSession[];
}
