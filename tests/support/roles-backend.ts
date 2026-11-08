import type { Page } from '@playwright/test';
import { installTestBackend } from './backend';
import type { Role } from '@/features/users/types/Role';
import type { PermissionMask } from '@/features/users/types/PermissionMask';
import type { SaveUserAuthorizationRequest } from '@/features/users/types/SaveUserAuthorizationRequest';
import type { UserDetails } from '@/features/users/types/UserDetails';

/** Independent contract fixture; no production role storage or authorization authority. */
export async function installRolesBackend(page: Page, hasRolePermissions = true) {

  await installTestBackend(page);
  const calls: { path: string; method: string; body: Record<string, unknown> | null }[] = [];
  const codes = [
    'USERS_VIEW',
    'USERS_CREATE',
    'USERS_UPDATE',
    'USERS_STATUS_MANAGE',
    'USERS_PASSWORD_RESET',
    'USERS_PERMISSIONS_VIEW',
    'USERS_PERMISSIONS_MANAGE',
    'USERS_SESSIONS_VIEW',
    'USERS_SESSIONS_REVOKE',
    'USERS_AUDIT_VIEW',
    'USERS_AUDIT_PRINT',
    'USERS_AUDIT_EXPORT',
    'USERS_ROLES_VIEW',
    'USERS_ROLES_CREATE',
    'USERS_ROLES_UPDATE',
    'USERS_ROLES_ASSIGN',
  ];
  const names: Record<string, string> = {
    USERS_VIEW: 'عرض المستخدمين',
    USERS_CREATE: 'إضافة المستخدمين',
    USERS_UPDATE: 'تعديل المستخدمين',
    USERS_AUDIT_VIEW: 'عرض سجل الأنشطة',
    USERS_ROLES_VIEW: 'عرض الأدوار',
    USERS_ROLES_CREATE: 'إنشاء الأدوار',
    USERS_ROLES_UPDATE: 'تعديل الأدوار',
    USERS_ROLES_ASSIGN: 'إسناد الأدوار',
  };
  const features = [
    { featureCode: 'ACCOUNTS', nameAr: 'الحسابات', nameEn: 'Accounts', codes: codes.slice(0, 5) },
    {
      featureCode: 'PERMISSIONS',
      nameAr: 'الصلاحيات',
      nameEn: 'Permissions',
      codes: codes.slice(5, 7),
    },
    { featureCode: 'SESSIONS', nameAr: 'الجلسات', nameEn: 'Sessions', codes: codes.slice(7, 9) },
    { featureCode: 'AUDIT', nameAr: 'الأنشطة', nameEn: 'Audit', codes: codes.slice(9, 12) },
    { featureCode: 'ROLES', nameAr: 'الأدوار', nameEn: 'Roles', codes: codes.slice(12) },
  ];
  let roles: Role[] = [];
  let users: UserDetails[] = [];
  const assignments = new Map<number, SaveUserAuthorizationRequest['assignment']>();
  const versions = new Map<number, number>();
  let currentId: number | null = 1;
  const adminMask = (1n << BigInt(hasRolePermissions ? codes.length : 12)) - 1n;
  const admin = {
    id: 1,
    fullName: 'مدير اختبار',
    username: 'test',
    branchId: 1,
    isActive: true,
    permissions: [{ moduleCode: 'USERS', mask: String(adminMask) }],
  };

  const mask = (items: PermissionMask[] | undefined) =>
    BigInt(items?.find((item) => item.moduleCode === 'USERS')?.mask || '0');

  const resolved = (id: number) => {

    const assignment = assignments.get(id) || { mode: 'direct' as const, permissions: [] };
    if (assignment.mode === 'direct') return assignment.permissions;
    const role = roles.find((role) => role.id === assignment.roleId);
    if (!role) throw Error('Missing fixture role');
    const bits =
      (mask(role.permissions) | mask(assignment.additionalPermissions)) &
      ~mask(assignment.excludedPermissions);
    return bits ? [{ moduleCode: 'USERS', mask: String(bits) }] : [];
  };

  const identity = () =>
    currentId === 1
      ? admin
      : currentId
        ? { ...users.find((user) => user.id === currentId)!, permissions: resolved(currentId) }
        : null;

  const can = (code: string) => {

    const index = codes.indexOf(code);
    return index >= 0 && (mask(identity()?.permissions) & (1n << BigInt(index))) !== 0n;
  };

  const authorization = (id: number) => {

    const stored = assignments.get(id) || { mode: 'direct' as const, permissions: [] };
    return {
      userId: id,
      branchId: 1,
      permissions: resolved(id),
      permissionsVersion: 'user-v' + (versions.get(id) || 1),
      assignment:
        stored.mode === 'direct'
          ? stored
          : {
              mode: 'role',
              role: roles.find((role) => role.id === stored.roleId),
              additionalPermissions: stored.additionalPermissions,
              excludedPermissions: stored.excludedPermissions,
            },
    };
  };

  const seedRole = (
    name = 'محاسب مخصص',
    permissions: PermissionMask[] = [{ moduleCode: 'USERS', mask: '3' }],
  ) => {

    const role: Role = {
      id: roles.length + 1,
      name,
      branchId: 1,
      permissions,
      rowVersion: 'role-v1',
    };
    roles.push(role);
    return role.id;
  };

  const seedUser = (username = 'role-user', roleId?: number) => {

    const id = users.length + 2;
    users.push({
      id,
      fullName: 'مستخدم الدور',
      username,
      branchId: 1,
      branchName: 'الفرع الرئيسي',
      isActive: true,
      createdAtUtc: '2026-11-01T00:00:00Z',
      updatedAtUtc: null,
    });
    assignments.set(
      id,
      roleId
        ? {
            mode: 'role',
            roleId,
            roleVersion: roles.find((role) => role.id === roleId)!.rowVersion,
            additionalPermissions: [],
            excludedPermissions: [],
          }
        : { mode: 'direct', permissions: [{ moduleCode: 'USERS', mask: '1' }] },
    );
    versions.set(id, 1);
    return id;
  };

  await page.route('**/api/v1/**', async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    const path = url.pathname.replace('/api/v1', '');
    const method = request.method();
    const body = request.postDataJSON() as Record<string, unknown> | null;
    calls.push({ path, method, body });

    const raw = (data: unknown, status = 200) =>
      route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(data) });

    const fail = (status: number, detail: string) =>
      route.fulfill({
        status,
        contentType: 'application/problem+json',
        body: JSON.stringify({
          status,
          detail,
          code: status === 409 ? 'CONCURRENCY_CONFLICT' : undefined,
        }),
      });

    if (path === '/auth/sign-in') {
      const row = users.find((user) => user.username === body?.username);
      currentId = row?.id || 1;
      return raw({
        user: identity(),
        session: { id: 'c28739a9-6190-4879-a066-4884ef04a00c' },
        expiresAtUtc: '2027-01-01T00:00:00Z',
      });
    }
    if (path === '/auth/me') return currentId ? raw(identity()) : fail(401, 'يلزم تسجيل الدخول');
    if (path === '/auth/sign-out') {
      currentId = null;
      return route.fulfill({ status: 204 });
    }
    if (path === '/permissions/catalog')
      return raw({
        capabilities: { roles: true },
        modules: [
          {
            moduleCode: 'USERS',
            nameAr: 'المستخدمون',
            nameEn: 'Users',
            features: features.map((feature) => ({
              ...feature,
              codes: undefined,
              actions: feature.codes.map((code) => ({
                code,
                bitValue: String(1n << BigInt(codes.indexOf(code))),
                nameAr: names[code] || code,
                nameEn: code,
              })),
            })),
          },
        ],
      });
    if (path === '/roles' || path.startsWith('/roles/')) {
      if (!currentId) return fail(401, 'يلزم تسجيل الدخول');
      const id = Number(path.split('/')[2]);
      const role = roles.find((role) => role.id === id);
      if (method === 'GET' && path === '/roles') {
        const assignable = url.searchParams.get('assignableOnly') === 'true';
        if (!can(assignable ? 'USERS_ROLES_ASSIGN' : 'USERS_ROLES_VIEW'))
          return fail(403, 'لا تملك الصلاحية');
        if (url.searchParams.get('branchId') !== '1') return fail(403, 'الفرع غير مسموح');
        const pageNumber = Number(url.searchParams.get('page') || 1),
          pageSize = Number(url.searchParams.get('pageSize') || 20);
        const items = roles.filter(
          (role) =>
            (!url.searchParams.get('search') ||
              role.name.includes(url.searchParams.get('search')!)) &&
            (!assignable || (mask(role.permissions) & ~mask(identity()?.permissions)) === 0n),
        );
        return raw({
          items: items.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
          page: pageNumber,
          pageSize,
          totalCount: items.length,
        });
      }
      if (method === 'POST' && path === '/roles') {
        if (!can('USERS_ROLES_CREATE')) return fail(403, 'لا تملك الصلاحية');
        if (body?.branchId !== 1 || !body.name) return fail(422, 'بيانات الدور غير صحيحة');
        const permissions = body.permissions as PermissionMask[];
        if ((mask(permissions) & ~mask(identity()?.permissions)) !== 0n)
          return fail(403, 'لا يمكنك منح صلاحيات إضافية');
        const created = seedRole(String(body.name), permissions);
        return raw(
          roles.find((role) => role.id === created),
          201,
        );
      }
      if (!role) return fail(404, 'الدور غير موجود');
      if (method === 'GET')
        return can('USERS_ROLES_VIEW') || can('USERS_ROLES_ASSIGN')
          ? raw(role)
          : fail(403, 'لا تملك الصلاحية');
      if (method === 'PUT') {
        if (!can('USERS_ROLES_UPDATE')) return fail(403, 'لا تملك الصلاحية');
        if (body?.rowVersion !== role.rowVersion) return fail(409, 'تغير الدور على الخادم');
        if (body.branchId !== 1) return fail(403, 'الفرع غير مسموح');
        const permissions = body.permissions as PermissionMask[];
        if ((mask(permissions) & ~mask(role.permissions) & ~mask(identity()?.permissions)) !== 0n)
          return fail(403, 'لا يمكنك منح صلاحيات إضافية');
        role.name = String(body.name);
        role.permissions = permissions;
        role.rowVersion = 'role-v' + (Number(role.rowVersion.split('v')[1]) + 1);
        for (const [userId, assignment] of assignments)
          if (assignment.mode === 'role' && assignment.roleId === role.id)
            versions.set(userId, (versions.get(userId) || 1) + 1);
        return raw(role);
      }
    }
    if (path === '/users' || path.startsWith('/users/')) {
      if (!currentId) return fail(401, 'يلزم تسجيل الدخول');
      const id = Number(path.split('/')[2]);
      const row = users.find((user) => user.id === id);
      if (path === '/users' && method === 'POST') {
        if (!can('USERS_CREATE')) return fail(403, 'لا تملك الصلاحية');
        if (!body?.fullName || !body.username || !body.password || body.branchId !== 1)
          return fail(422, 'راجع بيانات المستخدم');
        let assignment: SaveUserAuthorizationRequest['assignment'];
        if (body.roleId) {
          if (!can('USERS_ROLES_ASSIGN')) return fail(403, 'لا تملك صلاحية إسناد الأدوار');
          const role = roles.find((role) => role.id === body.roleId);
          if (!role || role.rowVersion !== body.roleVersion) return fail(409, 'تغير الدور');
          if ('permissions' in body) return fail(422, 'مصدر صلاحيات متعارض');
          assignment = {
            mode: 'role',
            roleId: role.id,
            roleVersion: role.rowVersion,
            additionalPermissions: body.additionalPermissions as PermissionMask[],
            excludedPermissions: body.excludedPermissions as PermissionMask[],
          };
        } else assignment = { mode: 'direct', permissions: body.permissions as PermissionMask[] };
        const newId = seedUser(String(body.username));
        const created = users.find((user) => user.id === newId)!;
        created.fullName = String(body.fullName);
        assignments.set(newId, assignment);
        return raw({ ...created, rowVersion: 'user-row-v1' }, 201);
      }
      if (path === '/users' && method === 'GET') {
        if (!can('USERS_VIEW')) return fail(403, 'لا تملك الصلاحية');
        const pageNumber = Number(url.searchParams.get('page') || 1),
          pageSize = Number(url.searchParams.get('pageSize') || 20);
        const items = users.filter(
          (user) =>
            !url.searchParams.get('search') ||
            (user.fullName + user.username).includes(url.searchParams.get('search')!),
        );
        return raw({
          items: items.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
          page: pageNumber,
          pageSize,
          totalCount: items.length,
        });
      }
      if (!row) return fail(404, 'المستخدم غير موجود');
      if (path.endsWith('/authorization')) {
        if (method === 'GET')
          return can('USERS_PERMISSIONS_VIEW')
            ? raw(authorization(id))
            : fail(403, 'لا تملك الصلاحية');
        if (method === 'PUT') {
          if (!can('USERS_PERMISSIONS_MANAGE')) return fail(403, 'لا تملك الصلاحية');
          if (body?.permissionsVersion !== 'user-v' + (versions.get(id) || 1))
            return fail(409, 'تغيرت صلاحيات المستخدم');
          const assignment = body.assignment as SaveUserAuthorizationRequest['assignment'];
          const previous = assignments.get(id);
          if (
            (assignment.mode !== previous?.mode ||
              (assignment.mode === 'role' &&
                previous?.mode === 'role' &&
                assignment.roleId !== previous.roleId)) &&
            !can('USERS_ROLES_ASSIGN')
          )
            return fail(403, 'لا تملك صلاحية إسناد الدور');
          if (
            assignment.mode === 'role' &&
            roles.find((role) => role.id === assignment.roleId)?.rowVersion !==
              assignment.roleVersion
          )
            return fail(409, 'تغير الدور');
          assignments.set(id, assignment);
          versions.set(id, (versions.get(id) || 1) + 1);
          return raw(authorization(id));
        }
      }
      if (method === 'GET') return can('USERS_VIEW') ? raw(row) : fail(403, 'لا تملك الصلاحية');
    }
    return route.fallback();
  });
  return {
    calls,
    codes,
    seedRole,
    seedUser,

    getRoles: () => structuredClone(roles),

    getUsers: () => structuredClone(users),

    getAuthorization: (id: number) => structuredClone(authorization(id)),

    concurrentRoleChange: (id: number) => {

      const role = roles.find((role) => role.id === id)!;
      role.name = 'تعديل آخر';
      role.rowVersion = 'role-v99';
    },

    concurrentUserChange: (id: number) => versions.set(id, (versions.get(id) || 1) + 1),
  };
}
