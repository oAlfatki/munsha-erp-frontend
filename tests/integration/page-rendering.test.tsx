import baseline from '../fixtures/baseline-screen-text.json';
import previous from '../fixtures/pre-separation-routes.json';
import changes from '../fixtures/ROUTE_CHANGES.json';
import { APP_ROUTES } from '@/app/router/routes';

import { axiosInstance as apiClient } from '@/core/api/apiClient';
import type { ApplicationState } from '@/core/types/state/ApplicationState';
import type { QueryScope } from '@/core/types/api/QueryScope';
import { masterRecordsQuery } from '@/features/master-data/queries/useMasterScreenControllerQuery';
import { lookupQuery } from '@/features/master-data/queries/useLookupOptions';
import type { FieldDef } from '@/shared/types/forms/FieldDef';
import { beforeAll, afterAll, describe, it, expect, vi } from 'vitest';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createSeed } from '../reference/domain/engine';
import { readResponse } from '../support/read-responses';

const fixture = vi.hoisted(() => ({ ui: null as unknown as ApplicationState }));
vi.mock('@/core/state/ApplicationProvider', () => ({ useApplication: () => fixture.ui }));
vi.mock('@/core/auth/AuthProvider', () => ({
  useAuth: () => ({
    user: fixture.ui.user,

    can: () => true,

    // This historical screen fixture has no role-capable hierarchical catalog.
    canFeature: () => false,

    logout: async () => {},

    refreshIdentity: async () => {},

    clearSession: async () => {},
  }),
}));
const modules = import.meta.glob('../../src/features/**/*-query.ts', { eager: true }) as Record<
  string,
  Record<string, (scope: QueryScope) => Parameters<QueryClient['fetchQuery']>[0]>
>;
const adapter = apiClient.defaults.adapter;
const query = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity, retry: false, gcTime: Infinity } },
});
beforeAll(async () => {
  fixture.ui = {
    user: {
      userId: 'test-user',
      username: 'test',
      branchId: '1',
      permissions: [],
      displayName: 'Preview user',
      email: '',
      fullName: 'مستخدم اختبار',
    },
    branchId: 'b1',
    view: '/dashboard',
    busy: false,
    editingDocument: false,

    runCommand: async () => true,

    navigate: () => {},

    refresh: async () => {},

    setBranchId: () => {},

    setEditingDocument: () => {},

    allowed: () => true,
  };
  vi.stubGlobal('document', { documentElement: { lang: 'ar' } });
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2026-10-31T12:00:00Z'));
  const seed = createSeed();
  vi.useRealTimers();
  apiClient.defaults.adapter = async (config) => ({
    data: { isSuccess: true, data: readResponse(seed, config.url!, config.params || {}) },
    status: 200,
    statusText: 'OK',
    headers: {},
    config,
  });
  for (const bookId of ['', 'main']) {
    const scope = { userId: 'test-user', userKind: 'aspnet', bookId, branchId: 'b1', locale: 'ar' };
    for (const module of Object.values(modules))
      for (const [name, factory] of Object.entries(module))
        if (/Query$/.test(name) && !name.startsWith('use')) await query.query(factory(scope));
    for (const collection of [
      'accounts',
      'cash',
      'contacts',
      'assets',
      'units',
      'categories',
      'productGroups',
      'groups',
      'expenseTypes',
    ])
      await query.query(masterRecordsQuery(scope, collection));
    for (const screen of previous.screens)
      for (const field of screen.fields || [])
        await query.query(lookupQuery(scope, field as FieldDef));
  }
  query.setQueryData(
    ['erp', 'dashboard', 'summary', 'test-user', 'aspnet', 'main', 'b1', 'ar'],
    readResponse(seed, '/dashboard', { branchId: 'b1' }),
  );
  query.setQueryData(
    ['erp', 'users', 'directory', 'test-user', 'aspnet'],
    readResponse(seed, '/users'),
  );
  query.setQueryData(['auth', 'account', 'test-user', 'aspnet'], {
    user: fixture.ui.user,
    users: [],
    sessions: [],
  });
  query.setQueryData(['erp', 'settings', 'backups', 'test-user', 'aspnet'], { rows: [] });
});
afterAll(() => {
  apiClient.defaults.adapter = adapter;
  query.clear();
  vi.unstubAllGlobals();
});
const aliases = changes.aliasesRemoved as Record<string, string>;
describe('original screen content through owned queries and unchanged HTTP fixtures', () => {
  const targets = [
    ...new Set(
      Object.values(previous.menus).flatMap((entries) => {
        const leaves = (items: typeof entries): typeof entries =>
          items.flatMap((item) => (item.children ? leaves(item.children) : [item]));

        return leaves(entries).map((item) => item.target!);
      }),
    ),
  ];
  for (const target of targets)
    it(
      'preserves ' + target,
      async () => {
        const original = previous.routes.find((route) => route.view === target);
        expect(original, target).toBeDefined();
        const route = APP_ROUTES.find(
          (route) => route.path === (aliases[original!.path] || original!.path),
        );
        expect(route, target).toBeDefined();
        fixture.ui.view = route!.path!;
        vi.unstubAllGlobals();
        const loaded = typeof route!.lazy === 'function' ? await route!.lazy() : undefined;
        vi.stubGlobal('document', { documentElement: { lang: 'ar' } });
        const Page = loaded?.Component || (() => route!.element);
        const html = renderToString(
          createElement(
            MemoryRouter,
            { initialEntries: [fixture.ui.view] },
            createElement(QueryClientProvider, { client: query }, createElement(Page)),
          ),
        );
        const text = html
          .replace(/<[^>]*>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        // Auth/Users now follow v1.5, not the retired role-based screen snapshots.
        const currentScreens: Record<string, string> = {
          'access~users-add': 'إضافة مستخدم',
          'access~users': 'المستخدمون',
          'access~password': 'تغيير كلمة المرور',
          'access~matrix': 'صلاحيات المستخدم',
          'access~sessions': 'جلساتي',
          'access~audit': 'حركات المستخدمين',
        };
        if (currentScreens[target]) {
          expect(text).toContain(currentScreens[target]);
          expect(text).not.toContain('كلمة المرور المؤقتة');
          return;
        }
        const refreshToolbar = [
          'purchases-new',
          'purchases',
          'sales-new',
          'sales',
          'financial~income',
          'financial~balance-sheet',
        ].includes(target);
        let expected = refreshToolbar
          ? baseline[target as keyof typeof baseline].replace(' طباعة تصدير', ' عرض طباعة تصدير')
          : baseline[target as keyof typeof baseline];
        if (target === 'access~sessions')
          expected = expected.replace(
            'تحديث الجلسات المستخدم',
            'تحديث الجلسات إنهاء جلساتي الأخرى المستخدم',
          );
        expect(text).toBe(expected);
      },
      30000,
    );
});
