import type { useSystemSettingsController } from '@/features/settings/hooks/useSystemSettingsController';
import type { SettingsPanelHelpers } from '@/features/settings/types/SettingsPanelHelpers';

export type AccountingSettingsPanelProps = Pick<
  NonNullable<ReturnType<typeof useSystemSettingsController>>,
  'go' | 'navigate' | 's' | 'draft' | 'change' | 'chart' | 'isBusy' | 'organizationMutation'
> &
  Pick<SettingsPanelHelpers, 'renderNumberField'>;
