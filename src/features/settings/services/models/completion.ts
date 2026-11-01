import type {GeneralSettingsContext} from '@/features/settings/types/read-models/GeneralSettingsContext';
import type { GeneralSettings } from '@/features/settings/types/models/GeneralSettings';

// Frontend read models and display helpers. Authoritative mutations live in server/core.
import type { ErpReadModel } from '@/core/types/ErpReadModel';
import { systemSettings } from '@/features/settings/services/models/system-settings';
export const generalSettings = (workspace: GeneralSettingsContext): GeneralSettings => {
  const v = systemSettings(workspace);
  return {
    profit: v.inventory.profit,
    discount: v.inventory.discount,
    price: v.sales.defaultPrice,
  };
};
