import type { PermissionCatalog } from '@/features/users/types/PermissionCatalog';
import type { PermissionMask } from '@/features/users/types/PermissionMask';

export interface PermissionMatrixProps {
  catalog: PermissionCatalog;
  value: PermissionMask[];
  allowed: PermissionMask[];
  onChange: (value: PermissionMask[]) => void;
  isReadOnly?: boolean;
}
