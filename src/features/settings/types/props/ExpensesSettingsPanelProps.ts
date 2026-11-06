import type { useSystemSettingsController } from '@/features/settings/hooks/useSystemSettingsController';
import type { SettingsPanelHelpers } from '@/features/settings/types/SettingsPanelHelpers';

export type ExpensesSettingsPanelProps = Pick<
  NonNullable<ReturnType<typeof useSystemSettingsController>>,
  's' | 'draft' | 'change'
> &
  Pick<SettingsPanelHelpers, 'renderNumberField' | 'renderInheritedCash'>;
