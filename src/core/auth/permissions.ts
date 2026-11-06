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
/** Only verified contract bindings belong here. The v1.5 contract does not
 * specify permissions for legacy ERP commands. Unknown operations fail closed. */
const COMMAND_PERMISSIONS: Record<string, [string, string]> = {};
export function canRunCommand(
  access: AccessSnapshot | null | undefined,
  type: string,
  data?: unknown,
  branchId?: string,
) {
  const permission = COMMAND_PERMISSIONS[type];
  if (!permission || !canPerform(access, ...permission, branchId)) return false;
  const input = data && typeof data === 'object' ? (data as Record<string, unknown>) : {};
  return (
    input.branchId === undefined ||
    String(input.branchId) === branchId ||
    canPerform(access, ...permission, String(input.branchId))
  );
}
