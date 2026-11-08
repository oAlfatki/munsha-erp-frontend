import { permissionMasksSchema } from '@/features/users/validations/permission-mask-schema';
import { z } from 'zod';

export const roleIdSchema = z.number().int().positive().max(Number.MAX_SAFE_INTEGER);
export const roleSchema = z.object({
  id: roleIdSchema,
  name: z.string().trim().min(1).max(200),
  branchId: roleIdSchema,
  permissions: permissionMasksSchema,
  rowVersion: z.string().min(1),
});
export const rolesPageSchema = z.object({
  items: z.array(roleSchema),
  page: z.number().int().positive(),
  pageSize: z.number().int().positive().max(100),
  totalCount: z.number().int().nonnegative(),
});
export const roleFormSchema = z.object({
  name: z.string().trim().min(1, 'اسم الدور مطلوب').max(200, 'اسم الدور يتجاوز 200 حرف'),
  branchId: roleIdSchema,
  permissions: permissionMasksSchema,
  rowVersion: z.string().min(1, 'رمز نسخة الدور مطلوب').optional(),
});
export const roleUpdateSchema = roleFormSchema.extend({
  rowVersion: z.string().min(1, 'رمز نسخة الدور مطلوب'),
});
export const roleFiltersSchema = z.object({
  page: z.number().int().positive(),
  pageSize: z.number().int().positive().max(100),
  branchId: roleIdSchema,
  search: z.string().max(200).optional(),
  assignableOnly: z.boolean().optional(),
});
export const directAssignmentSchema = z.object({
  mode: z.literal('direct'),
  permissions: permissionMasksSchema,
});
export const roleAssignmentSchema = z
  .object({
    mode: z.literal('role'),
    role: roleSchema,
    additionalPermissions: permissionMasksSchema,
    excludedPermissions: permissionMasksSchema,
  })
  .superRefine((assignment, context) => {
    if (
      !permissionMasksSchema.safeParse(assignment.additionalPermissions).success ||
      !permissionMasksSchema.safeParse(assignment.excludedPermissions).success
    )
      return;
    for (const extra of assignment.additionalPermissions) {
      const denied = BigInt(
        assignment.excludedPermissions.find((item) => item.moduleCode === extra.moduleCode)?.mask ||
          '0',
      );
      if ((BigInt(extra.mask) & denied) !== 0n)
        context.addIssue({
          code: 'custom',
          path: ['excludedPermissions'],
          message: 'لا يمكن السماح بالعملية ومنعها في الاستثناءات نفسها.',
        });
    }
  });
export const permissionAssignmentSchema = z.discriminatedUnion('mode', [
  directAssignmentSchema,
  roleAssignmentSchema,
]);
export const userAuthorizationSchema = z
  .object({
    userId: roleIdSchema,
    branchId: roleIdSchema,
    permissions: permissionMasksSchema,
    permissionsVersion: z.string().min(1),
    assignment: permissionAssignmentSchema,
  })
  .superRefine((value, context) => {
    if (value.assignment.mode === 'role' && value.assignment.role.branchId !== value.branchId)
      context.addIssue({
        code: 'custom',
        path: ['assignment'],
        message: 'الدور خارج نطاق فرع المستخدم.',
      });
  });

export const roleAssignmentRequestSchema = z
  .object({
    roleId: roleIdSchema,
    roleVersion: z.string().min(1),
    additionalPermissions: permissionMasksSchema,
    excludedPermissions: permissionMasksSchema,
  })
  .superRefine((value, context) => {
    if (
      !permissionMasksSchema.safeParse(value.additionalPermissions).success ||
      !permissionMasksSchema.safeParse(value.excludedPermissions).success
    )
      return;
    for (const item of value.additionalPermissions) {
      const excluded = BigInt(
        value.excludedPermissions.find((entry) => entry.moduleCode === item.moduleCode)?.mask ||
          '0',
      );
      if ((BigInt(item.mask) & excluded) !== 0n)
        context.addIssue({
          code: 'custom',
          path: ['excludedPermissions'],
          message: 'لا يمكن السماح بالعملية ومنعها في الاستثناءات نفسها.',
        });
    }
  });
export const createRoleUserSchema = roleAssignmentRequestSchema.safeExtend({
  fullName: z.string().trim().min(1).max(200),
  username: z.string().trim().min(1).max(100),
  password: z.string().min(1),
  branchId: roleIdSchema,
});
export const saveUserAuthorizationSchema = z.object({
  permissionsVersion: z.string().min(1),
  assignment: z.discriminatedUnion('mode', [
    directAssignmentSchema,
    roleAssignmentRequestSchema.safeExtend({ mode: z.literal('role') }),
  ]),
});

export const roleUserResponseSchema = z.object({
  id: roleIdSchema,
  fullName: z.string(),
  username: z.string(),
  branchId: roleIdSchema,
  branchName: z.string(),
  isActive: z.boolean(),
  createdAtUtc: z.string(),
  rowVersion: z.string().min(1),
});
