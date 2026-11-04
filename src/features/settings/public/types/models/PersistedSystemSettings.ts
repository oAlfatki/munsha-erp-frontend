import type { SystemSettings } from "@/features/settings/types/models/SystemSettings";
export type PersistedSystemSettings=Omit<SystemSettings,'accounting'>&{accounting:Omit<SystemSettings['accounting'],'taxEnabled'|'taxRate'>&Partial<Pick<SystemSettings['accounting'],'taxEnabled'|'taxRate'>>};
