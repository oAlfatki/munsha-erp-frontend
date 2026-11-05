import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
test.beforeEach(async ({ page }) => {
  if (process.env.PLAYWRIGHT_OFFLINE_DIST === '1')
    await page.route('http://munsha.test/**', async (route) => {
      const path = new URL(route.request().url()).pathname;
      const file = path.startsWith('/assets/')
        ? resolve('dist', '.' + path)
        : resolve('dist/index.html');
      const types: Record<string, string> = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.woff2': 'font/woff2',
      };
      try {
        await route.fulfill({
          body: await readFile(file),
          contentType: types[extname(file)] || 'application/octet-stream',
        });
      } catch {
        await route.fulfill({ status: 404, body: '' });
      }
    });
});
async function prepare(page: any) {
  await page.route('**/api/v1/**', async (route: any) => {
    const path = new URL(route.request().url()).pathname;
    await route.fulfill({
      status: path.startsWith('/api/v1/auth/') ? 401 : 404,
      contentType: 'application/problem+json',
      body: JSON.stringify({ title: 'Unauthorized' }),
    });
  });
  await page.goto('/login');
}
test('validates empty credentials without an HTTP sign-in', async ({ page }) => {
  await prepare(page);
  let calls = 0;
  page.on('request', (r) => {
    if (r.url().endsWith('/auth/sign-in')) calls++;
  });
  await page.getByRole('button', { name: 'تسجيل الدخول' }).click();
  await expect(page.getByText('اسم المستخدم إجباري', { exact: true })).toBeVisible();
  await expect(page.getByText('كلمة المرور إجبارية', { exact: true })).toBeVisible();
  expect(calls).toBe(0);
});
test('reports invalid credentials in Arabic and clears the password', async ({ page }) => {
  await prepare(page);
  await page.getByRole('textbox', { name: 'اسم المستخدم' }).fill('test');
  await page.getByLabel('كلمة المرور', { exact: true }).fill('wrong');
  await page.getByRole('button', { name: 'تسجيل الدخول' }).click();
  await expect(page.getByRole('alert')).toHaveText(
    'اسم المستخدم أو كلمة المرور غير صحيحة، أو الحساب غير متاح.',
  );
  await expect(page.getByLabel('كلمة المرور', { exact: true })).toHaveValue('');
  await expect(page).toHaveURL(/\/login$/);
});
test('disables duplicate submission and navigates after the documented response', async ({
  page,
}) => {
  await prepare(page);
  let calls = 0;
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route('**/api/v1/auth/sign-in', async (route) => {
    calls++;
    expect(route.request().postDataJSON()).toEqual({
      username: 'test',
      password: 'valid-password',
    });
    await gate;
    await route.fulfill({
      json: {
        user: {
          id: 7,
          fullName: 'مستخدم',
          username: 'test',
          branchId: 2,
          isActive: true,
          permissions: [],
        },
        session: { id: 'c28739a9-6190-4879-a066-4884ef04a00c' },
        expiresAtUtc: '2027-01-01T00:00:00Z',
      },
    });
  });
  await page.getByRole('textbox', { name: 'اسم المستخدم' }).fill('test');
  await page.getByLabel('كلمة المرور', { exact: true }).fill('valid-password');
  await page.getByRole('button', { name: 'تسجيل الدخول' }).click();
  await expect(page.getByRole('button', { name: 'جارٍ الدخول…' })).toBeDisabled();
  expect(calls).toBe(1);
  release();
  await expect(page).not.toHaveURL(/\/login$/);
});
test('shows a connection error without exposing server details', async ({ page }) => {
  await prepare(page);
  await page.route('**/api/v1/auth/sign-in', (route) => route.abort('failed'));
  await page.getByRole('textbox', { name: 'اسم المستخدم' }).fill('test');
  await page.getByLabel('كلمة المرور', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'تسجيل الدخول' }).click();
  await expect(page.getByRole('alert')).toHaveText(
    'تعذر الاتصال بالخادم؛ تحقق من الاتصال ثم أعد المحاولة.',
  );
  await expect(page.getByRole('button', { name: 'تسجيل الدخول' })).toBeEnabled();
});
