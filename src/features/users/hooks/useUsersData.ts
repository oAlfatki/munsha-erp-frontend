import { useFeatureResources } from '@/core/hooks/useFeatureResources';
import { AUDIT_RESOURCE } from '@/features/users/services/data-resources';
export const DATA_RESOURCES = [AUDIT_RESOURCE];
export function useUsersData() {
  return useFeatureResources(DATA_RESOURCES);
}
