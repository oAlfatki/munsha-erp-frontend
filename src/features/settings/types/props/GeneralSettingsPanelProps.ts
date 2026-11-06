import type { useSystemSettingsController } from '@/features/settings/hooks/useSystemSettingsController';

export type GeneralSettingsPanelProps = Pick<
  NonNullable<ReturnType<typeof useSystemSettingsController>>,
  'navigate' | 'device' | 'setDevice'
>;
