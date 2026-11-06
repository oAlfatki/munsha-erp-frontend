import { expect, it } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { inspectArchitecture } from '../../scripts/check-architecture.mjs';
import { inspectReachability } from '../../scripts/check-reachability.mjs';
import { APP_ROUTES } from '@/app/router/routes';
import { MENU_ITEMS } from '@/app/constants/user-navigation';
import { menuLeaves } from '@/shared/lib/menu-leaves';

it('ships exactly the three approved features with no orphan implementations', () => {
  expect(readdirSync('src/features').sort()).toEqual(['auth', 'dashboard', 'users']);
  expect(inspectReachability()).toEqual({ unreachable: [], dynamicImports: [] });
  expect(inspectArchitecture().errors).toEqual([]);
});
it('registers only Auth/Users/Dashboard routes and connects every menu leaf', () => {
  const paths = APP_ROUTES.map((route) => route.path);
  expect(paths).toHaveLength(10);
  expect(
    paths.every((path) => path === '/login' || path === '/dashboard' || path?.startsWith('/users')),
  ).toBe(true);
  for (const leaf of menuLeaves(MENU_ITEMS.access)) expect(paths).toContain(leaf.target);
});
it('keeps generic guest layout independent of Auth and feature-specific text in Auth', () => {
  const shared = readFileSync('src/shared/ui/layout/GuestLayout.tsx', 'utf8');
  expect(shared).not.toContain('@/features/');
  expect(shared).not.toContain('useAuth');
  expect(readFileSync('src/features/auth/layouts/AuthLayout.tsx', 'utf8')).toContain('GuestLayout');
});
