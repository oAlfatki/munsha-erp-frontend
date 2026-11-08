import { test, expect } from '@playwright/test';
import { installRolesBackend } from '../support/roles-backend';
import { installTestBackend } from '../support/backend';

const fillUser = async (page: import('@playwright/test').Page, username = 'assigned-user') => {

  await page.getByRole('textbox', { name: 'الاسم الكامل', exact: true }).fill('مستخدم بأدوار');
  await page.getByRole('textbox', { name: 'اسم المستخدم', exact: true }).fill(username);
  await page.getByLabel('كلمة المرور', { exact: true }).fill('password-12345');
};

test('creates and edits reusable roles with Module/Feature/Actions controls', async ({ page }) => {
  const backend = await installRolesBackend(page);
  await page.goto('/users/roles/new');
  await page.getByRole('textbox', { name: 'اسم الدور', exact: true }).fill('دور المحاسبة');
  await expect(page.getByRole('group', { name: 'الحسابات', exact: true })).toBeVisible();
  await page.getByRole('checkbox', { name: 'عرض المستخدمين', exact: true }).check();
  await page.getByRole('button', { name: 'حفظ الدور', exact: true }).click();
  await expect(page).toHaveURL(/\/users\/roles$/);
  expect(backend.getRoles()[0].permissions).toEqual([{ moduleCode: 'USERS', mask: '1' }]);
  await page.getByRole('button', { name: 'تعديل الدور', exact: true }).click();
  await page.getByRole('textbox', { name: 'اسم الدور', exact: true }).fill('دور محدّث');
  await page.getByRole('checkbox', { name: 'إضافة المستخدمين', exact: true }).check();
  await page.getByRole('button', { name: 'حفظ الدور', exact: true }).click();
  await expect(page).toHaveURL(/\/users\/roles$/);
  expect(backend.getRoles()[0]).toMatchObject({
    name: 'دور محدّث',
    rowVersion: 'role-v2',
    permissions: [{ moduleCode: 'USERS', mask: '3' }],
  });
});
test('creates a user with a linked role, an additional grant and an explicit denial', async ({
  page,
}) => {
  const backend = await installRolesBackend(page);
  const id = backend.seedRole();
  await page.goto('/users/new');
  await fillUser(page);
  await page.getByRole('radio', { name: 'دور مع إضافات واستثناءات', exact: true }).check();
  await page.getByLabel('الدور', { exact: true }).selectOption(String(id));
  await page
    .getByLabel('استثناء المستخدمون / الحسابات / إضافة المستخدمين', { exact: true })
    .selectOption('deny');
  await page
    .getByLabel('استثناء المستخدمون / الأنشطة / عرض سجل الأنشطة', { exact: true })
    .selectOption('allow');
  await page.getByRole('button', { name: 'حفظ المستخدم', exact: true }).click();
  await expect(page).toHaveURL(/\/users$/);
  const call = backend.calls.find((call) => call.path === '/users' && call.method === 'POST')!;
  expect(call.body).toMatchObject({
    roleId: id,
    roleVersion: 'role-v1',
    additionalPermissions: [{ moduleCode: 'USERS', mask: '512' }],
    excludedPermissions: [{ moduleCode: 'USERS', mask: '2' }],
  });
  expect(call.body).not.toHaveProperty('permissions');
  expect(backend.getAuthorization(2).permissions).toEqual([{ moduleCode: 'USERS', mask: '513' }]);
});
test('preserves direct-permission user creation without role fields', async ({ page }) => {
  const backend = await installRolesBackend(page);
  await page.goto('/users/new');
  await fillUser(page, 'direct-user');
  await page.getByRole('checkbox', { name: 'عرض المستخدمين', exact: true }).check();
  await page.getByRole('button', { name: 'حفظ المستخدم', exact: true }).click();
  await expect(page).toHaveURL(/\/users$/);
  const call = backend.calls.find((call) => call.path === '/users' && call.method === 'POST')!;
  expect(call.body).toMatchObject({ permissions: [{ moduleCode: 'USERS', mask: '1' }] });
  expect(call.body).not.toHaveProperty('roleId');
});
test('supports per-user role exceptions without changing the shared role', async ({ page }) => {
  const backend = await installRolesBackend(page);
  const roleId = backend.seedRole();
  const userId = backend.seedUser('assigned', roleId);
  await page.goto('/users/matrix?userId=' + userId);
  await page
    .getByLabel('استثناء المستخدمون / الحسابات / إضافة المستخدمين', { exact: true })
    .selectOption('deny');
  await page.getByRole('button', { name: 'حفظ الصلاحيات', exact: true }).click();
  await expect(page.getByRole('button', { name: 'حفظ الصلاحيات', exact: true })).toBeDisabled();
  expect(backend.getAuthorization(userId).permissions).toEqual([
    { moduleCode: 'USERS', mask: '1' },
  ]);
  expect(backend.getRoles()[0].permissions).toEqual([{ moduleCode: 'USERS', mask: '3' }]);
  expect(
    backend.calls.find((call) => call.method === 'PUT' && call.path.endsWith('/authorization'))
      ?.body,
  ).toMatchObject({ permissionsVersion: 'user-v1' });
});
test('rejects stale role and user-assignment versions instead of overwriting concurrent edits', async ({
  page,
}) => {
  const backend = await installRolesBackend(page);
  const roleId = backend.seedRole();
  const userId = backend.seedUser('assigned', roleId);
  await page.goto('/users/roles/' + roleId + '/edit');
  await page.getByRole('textbox', { name: 'اسم الدور', exact: true }).fill('تعديل محلي');
  backend.concurrentRoleChange(roleId);
  await page.getByRole('button', { name: 'حفظ الدور', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('عدّل مستخدم آخر');
  expect(backend.getRoles()[0].name).toBe('تعديل آخر');
  await page.goto('/users/matrix?userId=' + userId);
  await page
    .getByLabel('استثناء المستخدمون / الحسابات / إضافة المستخدمين', { exact: true })
    .selectOption('deny');
  backend.concurrentUserChange(userId);
  await page.getByRole('button', { name: 'حفظ الصلاحيات', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('عدّل مستخدم آخر');
  expect(backend.getAuthorization(userId).permissions).toEqual([
    { moduleCode: 'USERS', mask: '3' },
  ]);
});
test('does not expose role operations or issue role requests without role grants', async ({
  page,
}) => {
  const backend = await installRolesBackend(page, false);
  await page.goto('/users/roles/new');
  await expect(page.getByText('لا تملك صلاحية إضافة الأدوار.', { exact: true })).toBeVisible();
  await page.goto('/users/new');
  await expect(
    page.getByRole('radio', { name: 'دور مع إضافات واستثناءات', exact: true }),
  ).toBeDisabled();
  expect(backend.calls.some((call) => call.path.startsWith('/roles'))).toBe(false);
});
test('keeps legacy servers on direct permissions with no speculative role requests', async ({
  page,
}) => {
  const backend = await installTestBackend(page);
  await page.goto('/users/new');
  await expect(
    page.getByRole('radio', { name: 'دور مع إضافات واستثناءات', exact: true }),
  ).toBeDisabled();
  await expect(
    page.getByText('إدارة الأدوار تتطلب تفعيل عقد الأدوار على الخادم؛ الصلاحيات المباشرة متاحة.', {
      exact: true,
    }),
  ).toBeVisible();
  expect(backend.calls.some((call) => call.path.startsWith('/roles'))).toBe(false);
});

test('role edits update inherited access while retaining per-user additions and denials', async ({
  page,
}) => {
  const backend = await installRolesBackend(page);
  const roleId = backend.seedRole();
  const userId = backend.seedUser('inherited-user', roleId);
  await page.goto('/users/matrix?userId=' + userId);
  await page
    .getByLabel('استثناء المستخدمون / الحسابات / إضافة المستخدمين', { exact: true })
    .selectOption('deny');
  await page
    .getByLabel('استثناء المستخدمون / الأنشطة / عرض سجل الأنشطة', { exact: true })
    .selectOption('allow');
  await page.getByRole('button', { name: 'حفظ الصلاحيات', exact: true }).click();
  await expect(page.getByRole('button', { name: 'حفظ الصلاحيات', exact: true })).toBeDisabled();
  await page.goto('/users/roles/' + roleId + '/edit');
  await page.getByRole('checkbox', { name: 'عرض المستخدمين', exact: true }).uncheck();
  await page.getByRole('checkbox', { name: 'تعديل المستخدمين', exact: true }).check();
  await page.getByRole('button', { name: 'حفظ الدور', exact: true }).click();
  await expect(page).toHaveURL(/\/users\/roles$/);
  expect(backend.getAuthorization(userId).permissions).toEqual([
    { moduleCode: 'USERS', mask: '516' },
  ]);
  await page.getByRole('button', { name: 'الحساب وتسجيل الخروج', exact: true }).click();
  await page.getByRole('button', { name: 'تسجيل الخروج', exact: true }).click();
  await expect(page).toHaveURL(/\/login$/);
  await page.getByRole('textbox', { name: 'اسم المستخدم', exact: true }).fill('inherited-user');
  await page.getByLabel('كلمة المرور', { exact: true }).fill('password-12345');
  await page.getByRole('button', { name: 'تسجيل الدخول', exact: true }).click();
  await expect(page).not.toHaveURL(/\/login$/);
  await page.goto('/users/new');
  await expect(page.getByText('لا تملك صلاحية إضافة المستخدمين.', { exact: true })).toBeVisible();
  await page.goto('/users/audit');
  await expect(page.getByRole('heading', { name: 'حركات المستخدمين', exact: true })).toBeVisible();
  await expect(page.getByText('لا تملك صلاحية عرض الأنشطة.', { exact: true })).toHaveCount(0);
});

test('keeps hierarchical role exceptions usable on an Arabic phone viewport', async ({
  page,
}, testInfo) => {
  const backend = await installRolesBackend(page);
  const roleId = backend.seedRole();
  const userId = backend.seedUser('mobile-role-user', roleId);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/users/matrix?userId=' + userId);
  await expect(page.getByRole('heading', { name: 'صلاحيات المستخدم', exact: true })).toBeVisible();
  await expect(page.locator('.access-overrides')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  await page.screenshot({
    path: testInfo.outputPath('role-exceptions-mobile.png'),
    fullPage: true,
  });
});
