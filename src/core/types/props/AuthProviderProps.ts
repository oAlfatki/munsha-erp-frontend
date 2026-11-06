import type { AccessSnapshot } from '@/core/types/access/AccessSnapshot';
import type { Identity } from '@/core/types/auth/Identity';
import type { ReactNode } from 'react';
export interface AuthProviderProps {
  children: ReactNode;
  initialUser?: Identity | null;
  readSession: (signal?: AbortSignal) => Promise<{ user: Identity }>;
  readAccess: (user: Identity, signal?: AbortSignal) => Promise<AccessSnapshot>;
  endSession: () => Promise<unknown>;
  beforeLogout?: (user: Identity, access: AccessSnapshot | null) => Promise<void>;
}
