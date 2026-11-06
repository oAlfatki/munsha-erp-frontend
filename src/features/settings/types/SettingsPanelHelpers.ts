import type { ReactNode } from 'react';

export interface SettingsPanelHelpers {
  renderNumberField: (
    label: string,
    value: number,
    onChange: (value: number) => void,
    max?: number,
  ) => ReactNode;
  renderInheritedCash: (kind: 'sale' | 'purchase' | 'expense' | 'receipt' | 'payment') => ReactNode;
}
