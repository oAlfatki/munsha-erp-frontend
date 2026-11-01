import type React from 'react';
export interface PageHeadProps {
  title: string;
  description: string;
  onAction?: () => void;
  label?: string;
  extra?: React.ReactNode;
}
