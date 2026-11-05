import type { Identity } from './Identity';
import type { AccessSnapshot } from './AccessSnapshot';
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
