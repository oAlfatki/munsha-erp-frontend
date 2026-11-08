import type { PermissionCatalog } from '@/features/users/types/PermissionCatalog';
import type { PermissionMask } from '@/features/users/types/PermissionMask';

export interface PermissionOverridesMatrixProps {
  catalog: PermissionCatalog;
  additionalPermissions: PermissionMask[];
  excludedPermissions: PermissionMask[];
  inheritedPermissions: PermissionMask[];
  allowed: PermissionMask[];
  onChange: (additional: PermissionMask[], excluded: PermissionMask[]) => void;
  isReadOnly?: boolean;
}
