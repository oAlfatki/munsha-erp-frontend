import { test, expect } from '@playwright/test';
import { installTestBackend } from '../support/backend';

test('creates and views a user, blocks unsafe edit, and resets a normal password', async ({
  page,
}) => {
  const backend = await installTestBackend(page);
  await page.goto('/users/new');
  await page.getByRole('textbox', { name: 'الاسم الكامل', exact: true }).fill('مستخدم معماري');
  await page.getByRole('textbox', { name: 'اسم المستخدم', exact: true }).fill('architect');
  await page.getByLabel('كلمة المرور', { exact: true }).fill('password-12345');
  await page.getByRole('button', { name: 'كل الصلاحيات المسموح بمنحها', exact: true }).click();
  await page.getByRole('button', { name: 'حفظ المستخدم', exact: true }).click();
  await expect(page).toHaveURL(/\/users$/);
  expect(backend.getUsers()[0].fullName).toBe('مستخدم معماري');
  const row = page.locator('tbody tr').filter({ hasText: 'architect' });
  await row.getByRole('button', { name: 'تعديل', exact: true }).click();
  await expect(page.getByText('لا يمكن الحفظ الآمن:', { exact: false })).toBeVisible();
  await expect(page.getByRole('button', { name: 'حفظ المستخدم', exact: true })).toBeDisabled();
  expect(backend.calls.some((c) => c.method === 'PUT' && c.path === '/users/2')).toBe(false);
  await page.goto('/users/2');
  await expect(page.getByRole('heading', { name: 'تفاصيل المستخدم' })).toBeVisible();
  await page.getByLabel('كلمة المرور الجديدة', { exact: true }).fill('replacement-12345');
  await page.getByRole('button', { name: 'تأكيد إعادة التعيين', exact: true }).click();
  await expect(page.getByText('تمت إعادة تعيين كلمة المرور.')).toBeVisible();
  expect(backend.calls.find((c) => c.path === '/users/2/reset-password')?.body).toEqual({
    newPassword: 'replacement-12345',
  });
});

test('shows rejected user mutations without navigating or pretending success', async ({ page }) => {
  const backend = await installTestBackend(page);
  await page.goto('/users/new');
  await page.getByRole('textbox', { name: 'الاسم الكامل', exact: true }).fill('مستخدم');
  await page.getByRole('textbox', { name: 'اسم المستخدم', exact: true }).fill('duplicate');
  await page.getByLabel('كلمة المرور', { exact: true }).fill('password-12345');
  await page.getByRole('button', { name: 'كل الصلاحيات المسموح بمنحها', exact: true }).click();
  backend.failNext('/users', 409, 'اسم الدخول مستخدم');
  await page.getByRole('button', { name: 'حفظ المستخدم', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('اسم الدخول مستخدم');
  await expect(page).toHaveURL(/\/users\/new$/);
  expect(backend.getUsers()).toHaveLength(0);
});

test('prevents user creation without its actual permission', async ({ page }) => {
  const backend = await installTestBackend(page, true, false);
  await page.goto('/users/new');
  await expect(page.getByText('لا تملك صلاحية إضافة المستخدمين.', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'حفظ المستخدم', exact: true })).toHaveCount(0);
  expect(backend.calls.filter((c) => c.method === 'POST' && c.path === '/users')).toHaveLength(0);
});

test('uses Arabic and RTL even when an obsolete language preference exists', async ({ page }) => {
  await installTestBackend(page);
  await page.addInitScript(() => localStorage.setItem('munsha-language', 'en'));
  await page.goto('/dashboard');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.getByRole('button', { name: 'تغيير اللغة', exact: true })).toHaveCount(0);
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
});

test('invalid user detail and edit URLs show 404 without requesting an invalid user', async ({
  page,
}) => {
  const backend = await installTestBackend(page);
  for (const path of ['/users/not-an-id', '/users/0', '/users/not-an-id/edit', '/users/0/edit']) {
    await page.goto(path);
    await expect(page.getByRole('heading', { name: 'الصفحة غير موجودة' })).toBeVisible();
    await expect(page).toHaveURL(new RegExp(path + '$'));
  }
  expect(backend.calls.filter((call) => call.path.startsWith('/users/'))).toEqual([]);
});
