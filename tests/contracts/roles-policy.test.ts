import { expect, it } from 'vitest';
import { permissionCatalogSchema } from '@/features/users/validations/permission-catalog-schema';
import {
  permissionAssignmentSchema,
  userAuthorizationSchema,
} from '@/features/users/validations/roles-schema';
import { permissionMasksSchema } from '@/features/users/validations/permission-mask-schema';
import {
  effectivePermissions,
  assertAssignmentGrantable,
} from '@/features/users/services/permission-assignment';
import { canPerform } from '@/core/auth/permissions';
import type { Role } from '@/features/users/types/Role';

const actions = [
  { code: 'SALES_INVOICES_VIEW', bitValue: '1', nameAr: 'عرض', nameEn: 'View' },
  { code: 'SALES_INVOICES_CREATE', bitValue: '2', nameAr: 'إضافة', nameEn: 'Create' },
  { code: 'SALES_RETURNS_VIEW', bitValue: '4', nameAr: 'عرض المرتجعات', nameEn: 'View returns' },
];
const wire = {
  capabilities: { roles: true },
  modules: [
    {
      moduleCode: 'SALES',
      nameAr: 'المبيعات',
      nameEn: 'Sales',
      features: [
        {
          featureCode: 'INVOICES',
          nameAr: 'الفواتير',
          nameEn: 'Invoices',
          actions: actions.slice(0, 2),
        },
        {
          featureCode: 'RETURNS',
          nameAr: 'المرتجعات',
          nameEn: 'Returns',
          actions: actions.slice(2),
        },
      ],
    },
  ],
};
const catalog = permissionCatalogSchema.parse(wire);
const role: Role = {
  id: 1,
  name: 'دور مخصص',
  branchId: 1,
  permissions: [{ moduleCode: 'SALES', mask: '3' }],
  rowVersion: 'role-v1',
};

it('normalizes server-declared Module/Feature/Actions without changing bit positions or codes', () => {
  expect(catalog.modules[0].features.map((feature) => feature.featureCode)).toEqual([
    'INVOICES',
    'RETURNS',
  ]);
  expect(
    catalog.modules[0].definitions.map((definition) => [
      definition.code,
      definition.bitValue,
      definition.featureCode,
    ]),
  ).toEqual([
    ['SALES_INVOICES_VIEW', '1', 'INVOICES'],
    ['SALES_INVOICES_CREATE', '2', 'INVOICES'],
    ['SALES_RETURNS_VIEW', '4', 'RETURNS'],
  ]);
});
it('retains the legacy catalog and does not invent role capability or grants', () => {
  const legacy = permissionCatalogSchema.parse({
    modules: [{ moduleCode: 'SALES', nameAr: 'المبيعات', nameEn: 'Sales', definitions: actions }],
  });
  expect(legacy.capabilities.roles).toBe(false);
  expect(legacy.modules[0].definitions.map((definition) => definition.bitValue)).toEqual([
    '1',
    '2',
    '4',
  ]);
});
it('rejects ambiguous catalogs, duplicated features/codes/bits and non-power-of-two bits', () => {
  expect(
    permissionCatalogSchema.safeParse({ modules: [{ ...wire.modules[0], definitions: actions }] })
      .success,
  ).toBe(false);
  expect(
    permissionCatalogSchema.safeParse({
      modules: [
        {
          ...wire.modules[0],
          features: [wire.modules[0].features[0], wire.modules[0].features[0]],
        },
      ],
    }).success,
  ).toBe(false);
  for (const invalid of ['0', '3', 'bad', String(1n << 64n)])
    expect(
      permissionCatalogSchema.safeParse({
        modules: [
          {
            moduleCode: 'X',
            nameAr: 'X',
            nameEn: 'X',
            definitions: [{ ...actions[0], bitValue: invalid }],
          },
        ],
      }).success,
    ).toBe(false);
});
it('inherits a role and applies per-user additions and exclusions without mutating the role', () => {
  const assignment = {
    mode: 'role' as const,
    role,
    additionalPermissions: [{ moduleCode: 'SALES', mask: '4' }],
    excludedPermissions: [{ moduleCode: 'SALES', mask: '2' }],
  };
  expect(effectivePermissions(assignment)).toEqual([{ moduleCode: 'SALES', mask: '5' }]);
  expect(role.permissions).toEqual([{ moduleCode: 'SALES', mask: '3' }]);
  expect(
    effectivePermissions({ mode: 'direct', permissions: [{ moduleCode: 'SALES', mask: '1' }] }),
  ).toEqual([{ moduleCode: 'SALES', mask: '1' }]);
});
it('rejects conflicting overrides, malformed masks and unsigned overflow without raw BigInt errors', () => {
  expect(
    permissionAssignmentSchema.safeParse({
      mode: 'role',
      role,
      additionalPermissions: [{ moduleCode: 'SALES', mask: '1' }],
      excludedPermissions: [{ moduleCode: 'SALES', mask: '1' }],
    }).success,
  ).toBe(false);
  for (const mask of ['-1', 'abc', '', String(1n << 64n)]) {
    expect(permissionMasksSchema.safeParse([{ moduleCode: 'SALES', mask }]).success).toBe(false);
    expect(
      permissionAssignmentSchema.safeParse({
        mode: 'role',
        role,
        additionalPermissions: [{ moduleCode: 'SALES', mask }],
        excludedPermissions: [],
      }).success,
    ).toBe(false);
  }
});
it('blocks out-of-branch roles, unknown operations and delegated privilege escalation', () => {
  const assignment = {
    mode: 'role' as const,
    role,
    additionalPermissions: [],
    excludedPermissions: [],
  };
  expect(() =>
    assertAssignmentGrantable(assignment, [{ moduleCode: 'SALES', mask: '7' }], 2, catalog),
  ).toThrow('الفرع');
  expect(() =>
    assertAssignmentGrantable(assignment, [{ moduleCode: 'SALES', mask: '1' }], 1, catalog),
  ).toThrow('منح');
  expect(() =>
    assertAssignmentGrantable(
      { ...assignment, additionalPermissions: [{ moduleCode: 'SALES', mask: '8' }] },
      [{ moduleCode: 'SALES', mask: '15' }],
      1,
      catalog,
    ),
  ).toThrow('الدليل');
  expect(() =>
    assertAssignmentGrantable(assignment, [{ moduleCode: 'SALES', mask: '7' }], 1, catalog),
  ).not.toThrow();
});
it('requires explicit assignment metadata and rejects a foreign role in the v2 user response', () => {
  expect(
    userAuthorizationSchema.safeParse({
      userId: 2,
      branchId: 2,
      permissions: [],
      permissionsVersion: 'v1',
      assignment: { mode: 'role', role, additionalPermissions: [], excludedPermissions: [] },
    }).success,
  ).toBe(false);
  expect(
    userAuthorizationSchema.safeParse({
      userId: 2,
      branchId: 1,
      permissions: [],
      permissionsVersion: 'v1',
    }).success,
  ).toBe(false);
});
it('checks the exact feature when requested while preserving legacy operation-code checks', () => {
  const access = {
    status: 'ready' as const,
    grants: [
      { module: 'SALES', feature: 'INVOICES', action: 'SALES_INVOICES_VIEW', branchIds: ['1'] },
    ],
  };
  expect(canPerform(access, 'SALES', 'SALES_INVOICES_VIEW', '1', 'INVOICES')).toBe(true);
  expect(canPerform(access, 'SALES', 'SALES_INVOICES_VIEW', '1', 'RETURNS')).toBe(false);
  expect(canPerform(access, 'SALES', 'SALES_INVOICES_VIEW', '2', 'INVOICES')).toBe(false);
  expect(canPerform(access, 'SALES', 'SALES_INVOICES_VIEW', '1')).toBe(true);
});
