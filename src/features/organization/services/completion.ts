import type { GeneralSettings } from '@/features/organization/types/models/GeneralSettings';
import type { GeneralSettingsContext } from '@/features/organization/types/read-models/GeneralSettingsContext';

// Frontend display calculations; backend authority requires independent verification.
import { systemSettings } from '@/features/organization/services/system-settings';
export const generalSettings = (workspace: GeneralSettingsContext): GeneralSettings => {
  const v = systemSettings(workspace);
  return {
    profit: v.inventory.profit,
    discount: v.inventory.discount,
    price: v.sales.defaultPrice,
  };
};
