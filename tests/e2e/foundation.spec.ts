import { test, expect } from '@playwright/test';
import { installTestBackend } from '../support/backend';

test('opens every foundation screen without unrelated ERP requests', async ({ page }) => {
  const backend = await installTestBackend(page);
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  for (const path of [
    '/dashboard',
    '/users',
    '/users/new',
    '/users/audit',
    '/users/matrix',
    '/users/password',
    '/users/sessions',
  ]) {
    await page.goto(path);
    await expect(page.locator('.app-shell')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'تعذر عرض الصفحة' })).toHaveCount(0);
  }
  expect(errors).toEqual([]);
  expect(
    backend.calls.some((call) =>
      /^\/(accounting|inventory|backups|settings|workspace|sales|purchases)/.test(call.path),
    ),
  ).toBe(false);
  const links = page.locator('.sidebar nav');
  await expect(links).not.toContainText('المبيعات');
  await expect(links).not.toContainText('الحسابات');
});
test('keeps excluded features and unknown routes unavailable', async ({ page }) => {
  await installTestBackend(page);
  for (const path of ['/sales', '/accounting', '/settings', '/inventory', '/dashboard/unknown']) {
    await page.goto(path);
    await expect(page.getByRole('heading', { name: 'الصفحة غير موجودة' })).toBeVisible();
  }
});
test('restores a session independently of organization data and supports logout', async ({
  page,
}) => {
  const backend = await installTestBackend(page);
  await page.goto('/dashboard');
  await expect(page.locator('.app-shell')).toBeVisible();
  await page.reload();
  await expect(page.locator('.app-shell')).toBeVisible();
  expect(backend.calls.filter((call) => call.path === '/auth/me')).toHaveLength(2);
  await page.getByRole('button', { name: 'الحساب وتسجيل الخروج', exact: true }).click();
  await page.getByRole('button', { name: 'تسجيل الخروج', exact: true }).click();
  await expect(page).toHaveURL(/\/login$/);
  expect(backend.calls.some((call) => call.path === '/auth/sign-out')).toBe(true);
});
test('uses shared pagination and resets the user page after filtering', async ({ page }) => {
  const backend = await installTestBackend(page);
  backend.seedUsers(21);
  await page.goto('/users');
  const pagination = page.getByRole('navigation', { name: 'ترقيم الصفحات' });
  await expect(pagination).toContainText('الصفحة 1');
  await expect(pagination.getByRole('button', { name: 'السابق', exact: true })).toBeDisabled();
  await pagination.getByRole('button', { name: 'اللاحق', exact: true }).click();
  await expect(pagination).toContainText('الصفحة 2');
  await expect(pagination.getByRole('button', { name: 'اللاحق', exact: true })).toBeDisabled();
  await page.getByRole('textbox', { name: 'البحث', exact: true }).fill('user1');
  await expect(pagination).toContainText('الصفحة 1');
});
test('preserves mobile login layout, theme persistence and keyboard navigation', async ({
  page,
}) => {
  await installTestBackend(page, false);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/login');
  await expect(page.locator('.login-card')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  await page.getByRole('textbox', { name: 'اسم المستخدم', exact: true }).fill('test');
  await page.getByLabel('كلمة المرور', { exact: true }).fill('valid-password');
  await page.getByRole('button', { name: 'تسجيل الدخول', exact: true }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
  const toggle = page.getByRole('button', { name: 'تغيير الثيم' });
  await toggle.click();
  await toggle.click();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.reload();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.keyboard.press('Control+k');
  await expect(page.getByRole('dialog', { name: 'البحث السريع' })).toBeVisible();
});
