import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { APP_ROUTES } from '@/app/router/routes';
import { MENU_ITEMS, menuLeaves } from '@/core/config/menu';

import provenance from '../fixtures/reference-domain-provenance.json';

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

describe('Refactor safety boundaries', () => {
  it('registers all routes centrally and every menu link reaches a page', () => {
    for (const item of Object.values(MENU_ITEMS).flatMap(menuLeaves))
      expect(
        APP_ROUTES.some((route) => route.path === item.target),
        item.target,
      ).toBe(true);
    expect(APP_ROUTES.some((route) => route.path === '/login')).toBe(true);
  });
  it('contains no production reference engine, demo state or secondary page dispatcher', () => {
    for (const file of walk('src').filter((file) => /\.tsx?$/.test(file))) {
      const text = readFileSync(file, 'utf8');
      expect(text, file).not.toMatch(
        /@demo|erp-demo|createSeed|applyCommand|ROUTE_VIEWS|executeFeatureCommand|getScreen\(/,
      );
      expect(text, file).not.toMatch(/from ['"][^'"]*(?:tests\/reference|mocks\/domain)/);
    }
  });
  for (const entry of provenance)
    it('preserves original domain reference bytes: ' + entry.file, () =>
      expect(createHash('sha256').update(readFileSync(entry.file)).digest('hex')).toBe(
        entry.sha256,
      ),
    );
  it('keeps application shared components independent of feature domain and workspace providers', () => {
    for (const file of [...walk('src/core'), ...walk('src/shared')].filter((file) =>
      /\.tsx?$/.test(file),
    )) {
      expect(readFileSync(file, 'utf8'), file).not.toMatch(/from ['"][^'"]*(?:features\/|app\/)/);
    }
  });
  it('keeps canonical domain types independent from service implementations', () => {
    for (const file of walk('src').filter(
      (file) => file.includes('/types/') && /\.tsx?$/.test(file),
    )) {
      expect(readFileSync(file, 'utf8'), file).not.toMatch(
        /(?:from\s+|import\()['"][^'"]*services\//,
      );
    }
  });
});
