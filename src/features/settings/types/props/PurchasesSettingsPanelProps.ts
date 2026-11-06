import type { useSystemSettingsController } from '@/features/settings/hooks/useSystemSettingsController';
import type { SettingsPanelHelpers } from '@/features/settings/types/SettingsPanelHelpers';

export type PurchasesSettingsPanelProps = Pick<
  NonNullable<ReturnType<typeof useSystemSettingsController>>,
  's' | 'draft' | 'change' | 'branchId'
> &
  Pick<SettingsPanelHelpers, 'renderInheritedCash'>;
