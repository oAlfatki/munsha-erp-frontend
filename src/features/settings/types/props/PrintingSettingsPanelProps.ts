import type { useSystemSettingsController } from '@/features/settings/hooks/useSystemSettingsController';

export type PrintingSettingsPanelProps = Pick<
  NonNullable<ReturnType<typeof useSystemSettingsController>>,
  'device' | 'setDevice' | 'setPreview'
>;
