import type { useSystemSettingsController } from '@/features/settings/hooks/useSystemSettingsController';

export type DocumentsSettingsPanelProps = Pick<
  NonNullable<ReturnType<typeof useSystemSettingsController>>,
  'branchName' | 'draft' | 'change' | 'setDraft'
>;
