import type { ReactNode } from 'react';

export interface PanelProps {
  title: ReactNode;
  description?: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}
