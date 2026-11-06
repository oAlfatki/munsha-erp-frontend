import type { useSystemSettingsController } from '@/features/settings/hooks/useSystemSettingsController';
import type { SettingsPanelHelpers } from '@/features/settings/types/SettingsPanelHelpers';

export type SalesSettingsPanelProps = Pick<
  NonNullable<ReturnType<typeof useSystemSettingsController>>,
  'draft' | 'change'
> &
  Pick<SettingsPanelHelpers, 'renderNumberField' | 'renderInheritedCash'>;
