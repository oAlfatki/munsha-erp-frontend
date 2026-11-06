import type { AccessSnapshot } from '@/core/types/access/AccessSnapshot';
import type { Identity } from '@/core/types/auth/Identity';

export interface AuthContextValue {
  user: Identity | null;
  loading: boolean;
  error: Error | null;
  access: AccessSnapshot | null;
  accessError: Error | null;
  isAccessLoading: boolean;
  prepareLogin: () => Promise<number>;
  establishSession: (user: Identity, generation: number) => Promise<void>;
  clearSession: () => Promise<void>;
  logout: () => Promise<void>;
  refreshIdentity: () => Promise<void>;
  retry: () => void;
  can: (module: string, code: string, branchId?: string) => boolean;
}
