import type React from 'react';

export interface FieldProps {
  label: string;
  children: React.ReactNode;
  isFullWidth?: boolean;
}
