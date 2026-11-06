import type { useSystemSettingsController } from '@/features/settings/hooks/useSystemSettingsController';
import type { SettingsPanelHelpers } from '@/features/settings/types/SettingsPanelHelpers';

export type InventorySettingsPanelProps = Pick<
  NonNullable<ReturnType<typeof useSystemSettingsController>>,
  'draft' | 'change'
> &
  Pick<SettingsPanelHelpers, 'renderNumberField'>;
