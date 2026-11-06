import type { AccessSnapshot } from '@/core/types/access/AccessSnapshot';

export function canPerform(
  access: AccessSnapshot | null | undefined,
  module: string,
  action: string,
  branchId?: string,
) {

  return (
    access?.status === 'ready' &&
    access.grants.some(
      (grant) =>
        grant.module === module &&
        grant.action === action &&
        grant.branchIds.length > 0 &&
        (!branchId || grant.branchIds.includes(branchId)),
    )
  );
}
