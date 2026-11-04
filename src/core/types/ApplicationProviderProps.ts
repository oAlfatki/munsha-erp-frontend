import type React from 'react';
export interface ApplicationProviderProps {
  children: React.ReactNode;
  heartbeat: () => Promise<unknown>;
  checkSession: () => Promise<unknown>;
}
