import { test, expect } from '@playwright/test';
import { MENU_ITEMS, menuLeaves } from '@/core/config/menu';

import { installTestBackend } from '../support/backend';

test('validates the login form before submitting credentials', async ({ page }) => {
  const backend = await installTestBackend(page, false);
  await page.goto('/login');
  await page.getByRole('button', { name: 'تسجيل الدخول', exact: true }).click();
  await expect(page.getByRole('alert').filter({ hasText: 'اسم المستخدم إجباري' })).toBeVisible();
  await expect(page.getByRole('alert').filter({ hasText: 'كلمة المرور إجبارية' })).toBeVisible();
  expect(backend.calls.some((call) => call.path === '/auth/login')).toBe(false);
  await expect(page.getByText('تجربة النظام', { exact: true })).toHaveCount(0);
});

test('restores a server session on a direct protected URL and reload', async ({ page }) => {
  const backend = await installTestBackend(page);
  await page.goto('/dashboard');
  await expect(page.locator('.app-shell')).toBeVisible();
  await page.reload();
  await expect(page.locator('.app-shell')).toBeVisible();
  expect(backend.calls.filter((call) => call.path === '/auth/me')).toHaveLength(2);
  expect(
    await page.evaluate(() => Object.keys(sessionStorage).some((key) => key.includes('demo'))),
  ).toBe(false);
  expect(backend.calls.some((call) => call.path === '/dashboard')).toBe(true);
  expect(
    backend.calls.some(
      (call) =>
        call.path === '/workspace' ||
        call.path === '/inventory/items' ||
        call.path === '/accounting/journals',
    ),
  ).toBe(false);
});

test('creates a customer through feature services and HTTP and keeps it after reload', async ({
  page,
}) => {
  const backend = await installTestBackend(page);
  await page.goto('/customers/new');
  await page.getByRole('dialog').waitFor();
  await page.getByRole('textbox', { name: 'اسم العميل', exact: true }).fill('عميل اختبار معماري');
  await page.getByRole('button', { name: 'حفظ البيانات', exact: true }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  const row = () =>
    page
      .locator('.data-table > tbody:not(.print-all-rows)')
      .getByText('عميل اختبار معماري', { exact: true });
  await expect(row()).toBeVisible();
  await page.reload();
  await expect(row()).toBeVisible();
  await expect(page).toHaveURL(/\/customers$/);
  const save = backend.calls.find(
    (call) => call.method === 'POST' && call.path === '/parties/commands/party',
  );
  expect(save?.body).toMatchObject({
    type: 'party',
    data: { kind: 'customer', name: 'عميل اختبار معماري' },
  });
  expect(backend.getState().parties.some((party) => party.name === 'عميل اختبار معماري')).toBe(
    true,
  );
  expect(
    backend.calls.some((call) => call.path === '/workspace' || call.path.startsWith('/inventory/')),
  ).toBe(false);
});

test('creates a supplier through the same HTTP boundary with supplier rules', async ({ page }) => {
  const backend = await installTestBackend(page);
  await page.goto('/suppliers/new');
  await page.getByRole('dialog').waitFor();
  await page.getByRole('textbox', { name: 'اسم المورد', exact: true }).fill('مورد اختبار معماري');
  await page.getByRole('button', { name: 'حفظ البيانات', exact: true }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  expect(
    backend.calls.find((call) => call.method === 'POST' && call.path === '/parties/commands/party')
      ?.body,
  ).toMatchObject({ data: { kind: 'supplier', name: 'مورد اختبار معماري' } });
});

test('supports theme changes and remembers the selected theme', async ({ page }) => {
  await installTestBackend(page);
  await page.goto('/dashboard');
  const toggle = page.getByRole('button', { name: 'تغيير الثيم' });
  await toggle.click();
  await toggle.click();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.reload();
  await expect(page.locator('html')).toHaveClass(/dark/);
});

test('all 108 navigation destinations load without runtime exceptions', async ({ page }) => {
  test.setTimeout(240000);
  await installTestBackend(page);
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const modules = [
    'access',
    'settings',
    'employees',
    'customers',
    'suppliers',
    'inventory',
    'expenses',
    'purchases',
    'sales',
    'accounts',
    'financial',
  ];
  const targets = [
    ...new Set(
      modules.flatMap((module) =>
        menuLeaves(MENU_ITEMS[module] || []).map((entry) => entry.target!),
      ),
    ),
  ];
  expect(targets).toHaveLength(108);
  for (const target of targets) {
    await page.goto(target);
    await expect(page.locator('.app-shell'), target).toBeVisible();
    await expect(page.locator('.workspace-content'), target).not.toBeEmpty();
    await expect(page.locator('.app-loader'), target).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'تعذر عرض الصفحة' }), target).toHaveCount(0);
  }
  expect(errors).toEqual([]);
});

test('unknown child paths show 404 rather than a feature fallback', async ({ page }) => {
  await installTestBackend(page);
  await page.goto('/customers/not-a-screen');
  await expect(page.getByRole('heading', { name: 'الصفحة غير موجودة' })).toBeVisible();
});

test('canonical customer group route resolves while retired aliases show 404', async ({ page }) => {
  await installTestBackend(page);
  await page.goto('/customers/groups');
  await expect(page).toHaveURL(/\/customers\/groups$/);
  await expect(
    page.getByRole('heading', { name: 'مجموعات العملاء والموردين', exact: true }),
  ).toBeVisible();
  await page.goto('/users/users-add');
  await expect(page.getByRole('heading', { name: 'الصفحة غير موجودة' })).toBeVisible();
});

test('opens the RTL print preview and downloads a real customer PDF on a phone viewport', async ({
  page,
}) => {
  test.setTimeout(60000);
  await installTestBackend(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/customers');
  await expect(page.locator('.app-loader')).toHaveCount(0);
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await page.getByRole('button', { name: 'طباعة', exact: true }).click();
  const preview = page.getByRole('dialog').filter({ hasText: 'معاينة الطباعة' });
  await expect(preview).toBeVisible();
  await expect(
    page.frameLocator('iframe[title="معاينة المستند الموحد"]').locator('body'),
  ).toContainText('العملاء');
  await preview.getByRole('button', { name: 'إغلاق المعاينة', exact: true }).click();
  await page.getByRole('button', { name: 'تصدير', exact: true }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'تأكيد التصدير', exact: true }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/\.pdf$/);
  const stream = await download.createReadStream();
  expect(stream).not.toBeNull();
  const chunks: Buffer[] = [];
  for await (const chunk of stream!) chunks.push(Buffer.from(chunk));
  const data = Buffer.concat(chunks);
  expect(data.subarray(0, 5).toString()).toBe('%PDF-');
  expect(data.length).toBeGreaterThan(1000);
});

test('creates, edits and resets a user with observable persisted state', async ({ page }) => {
  const backend = await installTestBackend(page);
  await page.goto('/users/new');
  await page.getByRole('button', { name: 'حفظ المستخدم', exact: true }).click();
  await expect(
    page.getByRole('alert').filter({ hasText: 'اسم المستخدم الكامل إجباري' }),
  ).toBeVisible();
  expect(backend.calls.filter((c) => c.method === 'POST' && c.path === '/users')).toHaveLength(0);
  await page.getByRole('textbox', { name: 'الاسم الكامل', exact: true }).fill('  مستخدم معماري  ');
  await page.getByRole('textbox', { name: 'اسم الدخول', exact: true }).fill('architect');
  await page.getByLabel('كلمة المرور المؤقتة', { exact: true }).fill('password-12345');
  await page.getByRole('button', { name: 'حفظ المستخدم', exact: true }).click();
  await expect(page).toHaveURL(/\/users$/);
  expect(backend.getUsers()[0].name).toBe('مستخدم معماري');
  const row = page
    .locator('.data-table > tbody:not(.print-all-rows) tr')
    .filter({ hasText: 'architect' });
  await expect(row).toContainText('مستخدم معماري');
  await row.getByRole('button', { name: 'عرض وتعديل', exact: true }).click();
  await expect(page).toHaveURL(/\/users\/user-1\/edit$/);
  await page.getByRole('textbox', { name: 'الاسم الكامل', exact: true }).fill('مستخدم معدل');
  await page.getByRole('button', { name: 'حفظ المستخدم', exact: true }).click();
  await expect(page).toHaveURL(/\/users$/);
  await expect(row).toContainText('مستخدم معدل');
  expect(backend.getUsers()[0].name).toBe('مستخدم معدل');
  await row.getByRole('button', { name: 'إعادة تعيين كلمة المرور', exact: true }).click();
  await page.getByLabel('كلمة المرور المؤقتة الجديدة', { exact: true }).fill('replacement-12345');
  await page.getByRole('button', { name: 'تأكيد إعادة التعيين', exact: true }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  expect(
    backend.calls.find((c) => c.method === 'PUT' && c.path === '/users/user-1/password')?.body,
  ).toMatchObject({ action: 'resetPassword', id: 'user-1', password: 'replacement-12345' });
  await page.reload();
  await expect(row).toContainText('مستخدم معدل');
});

test('shows rejected user mutations without navigating or pretending success', async ({ page }) => {
  const backend = await installTestBackend(page);
  await page.goto('/users/new');
  await page.getByRole('textbox', { name: 'الاسم الكامل', exact: true }).fill('مستخدم');
  await page.getByRole('textbox', { name: 'اسم الدخول', exact: true }).fill('duplicate');
  await page.getByLabel('كلمة المرور المؤقتة', { exact: true }).fill('password-12345');
  backend.failNext('/users', 409, 'اسم الدخول مستخدم');
  await page.getByRole('button', { name: 'حفظ المستخدم', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('اسم الدخول مستخدم');
  await expect(page).toHaveURL(/\/users\/new$/);
  expect(backend.getUsers()).toHaveLength(0);
});

test('prevents non-admin user creation before any write request', async ({ page }) => {
  const backend = await installTestBackend(page, true, 'staff');
  await page.goto('/users/new');
  await expect(
    page.getByText('إدارة حسابات المستخدمين متاحة لمسؤول النظام.', { exact: true }),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: 'حفظ المستخدم', exact: true })).toHaveCount(0);
  expect(backend.calls.filter((c) => c.method === 'POST' && c.path === '/users')).toHaveLength(0);
});

test('persists language and direction across reloads', async ({ page }) => {
  await installTestBackend(page);
  await page.goto('/dashboard');
  await page.getByRole('button', { name: 'تغيير اللغة', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  await expect(page.getByRole('button', { name: 'Customers', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Change language', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
});

test('preserves settings columns and stock document spacing after splitting styles', async ({
  page,
}) => {
  await installTestBackend(page);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/settings/system-company');
  await expect(page.locator('.system-settings-layout')).toHaveCSS('display', 'grid');
  await expect(page.locator('.system-settings-layout')).toHaveCSS('column-gap', '22px');
  await page.goto('/inventory/opening-stock');
  await expect(page.locator('.stock-item-search')).toBeVisible();
  await expect(page.locator('.stock-item-search')).toHaveCSS('margin-top', '20px');
  await expect(page.locator('.stock-item-search > input')).toHaveCSS('max-width', '550px');
});
