import type { PermissionAssignment } from '@/features/users/types/PermissionAssignment';
import type { PermissionCatalog } from '@/features/users/types/PermissionCatalog';
import type { PermissionMask } from '@/features/users/types/PermissionMask';
import type { RoleAssignmentRequest } from '@/features/users/types/RoleAssignmentRequest';
import { assertGrantable } from '@/features/users/validations/permission-grants';
import { permissionAssignmentSchema } from '@/features/users/validations/roles-schema';

/** Preview only. Authentication always uses effective masks returned by the server. */
export function effectivePermissions(assignment: PermissionAssignment): PermissionMask[] {

  assignment = permissionAssignmentSchema.parse(assignment);
  const base = assignment.mode === 'direct' ? assignment.permissions : assignment.role.permissions;
  const additions = assignment.mode === 'role' ? assignment.additionalPermissions : [];
  const exclusions = assignment.mode === 'role' ? assignment.excludedPermissions : [];
  const modules = new Set([...base, ...additions, ...exclusions].map((item) => item.moduleCode));
  return [...modules].flatMap((moduleCode) => {
    const mask = (items: PermissionMask[]) =>
      BigInt(items.find((item) => item.moduleCode === moduleCode)?.mask || '0');

    const value = (mask(base) | mask(additions)) & ~mask(exclusions);
    return value ? [{ moduleCode, mask: String(value) }] : [];
  });
}

export function assertKnownPermissions(items: PermissionMask[], catalog: PermissionCatalog) {

  for (const item of items) {
    const module = catalog.modules.find((module) => module.moduleCode === item.moduleCode);
    if (!module) throw Error('قسم الصلاحيات غير موجود في الدليل.');
    const known = module.definitions.reduce(
      (value, definition) => value | BigInt(definition.bitValue),
      0n,
    );
    if ((BigInt(item.mask) & ~known) !== 0n)
      throw Error('تتضمن الصلاحيات عمليات غير موجودة في الدليل.');
  }
}

export function assertAssignmentGrantable(
  assignment: PermissionAssignment,
  own: PermissionMask[],
  branchId: number,
  catalog: PermissionCatalog,
  previous?: PermissionAssignment,
) {

  permissionAssignmentSchema.parse(assignment);
  if (assignment.mode === 'role') {
    if (assignment.role.branchId !== branchId) throw Error('الدور خارج نطاق الفرع المسموح.');
    assertKnownPermissions(assignment.role.permissions, catalog);
    assertKnownPermissions(assignment.additionalPermissions, catalog);
    assertKnownPermissions(assignment.excludedPermissions, catalog);
    const previousRole =
      previous?.mode === 'role' && previous.role.id === assignment.role.id
        ? previous.role.permissions
        : [];
    assertGrantable(assignment.role.permissions, own, previousRole);
  }
  const next = effectivePermissions(assignment);
  assertKnownPermissions(next, catalog);
  assertGrantable(next, own, previous ? effectivePermissions(previous) : []);
}

export function roleAssignmentRequest(
  assignment: Extract<PermissionAssignment, { mode: 'role' }>,
): RoleAssignmentRequest {

  return {
    roleId: assignment.role.id,
    roleVersion: assignment.role.rowVersion,
    additionalPermissions: assignment.additionalPermissions,
    excludedPermissions: assignment.excludedPermissions,
  };
}
