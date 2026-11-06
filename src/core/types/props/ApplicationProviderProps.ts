import type React from 'react';

export interface ApplicationProviderProps {
  children: React.ReactNode;
  checkSession: () => Promise<unknown>;
}
