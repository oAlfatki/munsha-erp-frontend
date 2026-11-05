import type { Identity } from './Identity';
import type { AccessSnapshot } from './AccessSnapshot';
import type { ReactNode } from 'react';
export interface AuthProviderProps {
  children: ReactNode;
  initialUser?: Identity | null;
  readSession: (signal?: AbortSignal) => Promise<{ user: Identity }>;
  readAccess: (user: Identity, signal?: AbortSignal) => Promise<AccessSnapshot>;
  endSession: () => Promise<unknown>;
  beforeLogout?: (user: Identity, access: AccessSnapshot | null) => Promise<void>;
}
