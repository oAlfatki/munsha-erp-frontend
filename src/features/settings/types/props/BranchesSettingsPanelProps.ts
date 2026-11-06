import type { useSystemSettingsController } from '@/features/settings/hooks/useSystemSettingsController';

export type BranchesSettingsPanelProps = Pick<
  NonNullable<ReturnType<typeof useSystemSettingsController>>,
  'go' | 's' | 'draft' | 'branch' | 'isDirty' | 'setBranch' | 'setBranchData' | 'branchData'
>;
