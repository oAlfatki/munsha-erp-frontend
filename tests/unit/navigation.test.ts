import { describe, it, expect } from 'vitest';
import { APP_ROUTES } from '@/app/router/routes';
import { MENU_ITEMS, menuLeaves } from '@/core/config/menu';
import previous from '../fixtures/pre-separation-routes.json';
import changes from '../fixtures/ROUTE_CHANGES.json';
describe('central routes preserve original destinations', () => {
  it('migrates every original screen to its canonical route and keeps edit deep links', () => {
    const aliases = changes.aliasesRemoved as Record<string, string>;
    const expected = [
      ...new Set(previous.routes.map((route) => aliases[route.path] || route.path)),
      '/users/:id/edit',
      '/users/:id',
    ].sort();
    expect(APP_ROUTES.map((route) => route.path).sort()).toEqual(expected);
    for (const alias of Object.keys(aliases))
      expect(APP_ROUTES.some((route) => route.path === alias)).toBe(false);
  });
  it('preserves all 111 menu links and 108 destinations', () => {
    const paths = Object.values(MENU_ITEMS)
      .flatMap(menuLeaves)
      .map((item) => item.target!);
    expect(paths).toHaveLength(111);
    expect(new Set(paths).size).toBe(108);
    for (const path of paths)
      expect(
        APP_ROUTES.some((route) => route.path === path),
        path,
      ).toBe(true);
  });
  it('has no duplicate route patterns', () =>
    expect(new Set(APP_ROUTES.map((route) => route.path)).size).toBe(APP_ROUTES.length));
});
