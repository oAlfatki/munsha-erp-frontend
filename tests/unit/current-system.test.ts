import { afterEach, expect, it } from 'vitest';
import { axiosInstance } from '@/core/api/apiClient';
import { readAccess } from '@/app/services/access-service';
import { canPerform } from '@/core/auth/permissions';
import { assertGrantable } from '@/features/users/validation/permission-grants';
import type { Identity } from '@/core/types/Identity';
const original = axiosInstance.defaults.adapter;
afterEach(() => {
  axiosInstance.defaults.adapter = original;
});
const user: Identity = {
  userId: '1',
  username: 'test',
  displayName: 'اختبار',
  fullName: 'اختبار',
  email: '',
  branchId: '2',
  permissions: [{ moduleCode: 'USERS', mask: '9223372036854775809' }],
};
it('derives actual module/action grants from the server catalog using uint64 masks', async () => {
  axiosInstance.defaults.adapter = async (config) => ({
    config,
    status: 200,
    statusText: 'OK',
    headers: {},
    data: {
      modules: [
        {
          moduleCode: 'USERS',
          nameAr: 'المستخدمون',
          nameEn: 'Users',
          definitions: [
            { code: 'USERS_VIEW', bitValue: '1', nameAr: 'عرض', nameEn: 'View' },
            { code: 'USERS_CREATE', bitValue: '2', nameAr: 'إضافة', nameEn: 'Create' },
            {
              code: 'HIGH_TEST_BIT',
              bitValue: '9223372036854775808',
              nameAr: 'اختبار',
              nameEn: 'Test',
            },
          ],
        },
      ],
    },
  });
  const access = await readAccess(user);
  expect(canPerform(access, 'USERS', 'USERS_VIEW', '2')).toBe(true);
  expect(canPerform(access, 'USERS', 'USERS_CREATE', '2')).toBe(false);
  expect(canPerform(access, 'USERS', 'HIGH_TEST_BIT', '2')).toBe(true);
  expect(canPerform(access, 'USERS', 'USERS_VIEW', '3')).toBe(false);
});
it.each([null, undefined, { status: 'unsupported', grants: [] }, { status: 'ready', grants: [] }])(
  'denies permission without a ready grant %j',
  (access) => {
    expect(canPerform(access as any, 'USERS', 'USERS_VIEW', '2')).toBe(false);
  },
);
it('rejects grants beyond the acting user mask and accepts unchanged existing grants', () => {
  const own = [{ moduleCode: 'USERS', mask: '1' }];
  expect(() => assertGrantable([{ moduleCode: 'USERS', mask: '2' }], own)).toThrow('منح');
  expect(() =>
    assertGrantable([{ moduleCode: 'USERS', mask: '3' }], own, [
      { moduleCode: 'USERS', mask: '2' },
    ]),
  ).not.toThrow();
});
it('rejects duplicate and out-of-range permission masks', () => {
  expect(() =>
    assertGrantable(
      [
        { moduleCode: 'USERS', mask: '1' },
        { moduleCode: 'USERS', mask: '1' },
      ],
      [],
    ),
  ).toThrow();
  expect(() => assertGrantable([{ moduleCode: 'USERS', mask: String(1n << 64n) }], [])).toThrow();
});
it('always requests Arabic even if old browser state says English', async () => {
  axiosInstance.defaults.adapter = async (config) => {
    expect(config.headers.get('Accept-Language')).toBe('ar');
    return { config, status: 200, statusText: 'OK', headers: {}, data: {} };
  };
  await axiosInstance.get('/test');
});
