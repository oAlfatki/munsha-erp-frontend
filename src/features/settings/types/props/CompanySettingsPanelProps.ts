import type { useSystemSettingsController } from '@/features/settings/hooks/useSystemSettingsController';

export type CompanySettingsPanelProps = Pick<
  NonNullable<ReturnType<typeof useSystemSettingsController>>,
  'navigate' | 'company' | 'setCompany' | 's'
>;
