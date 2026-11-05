import { ROUTES } from '@/core/config/navigation-paths';
import type { RouteObject } from 'react-router-dom';
export const USERS_ROUTES: RouteObject[] = [
  {
    path: ROUTES.USERS_ID,
    lazy: async () => ({
      Component: (await import('@/features/users/pages/ViewUserPage')).default,
    }),
    handle: { module: 'users', title: 'تفاصيل المستخدم', navModule: 'access' },
  },
  {
    path: ROUTES.USERS,
    lazy: async () => ({
      Component: (await import('@/features/users/pages/UserListPage')).default,
    }),
    handle: { module: 'users', title: '' },
  },
  {
    path: ROUTES.USERS_AUDIT,
    lazy: async () => ({
      Component: (await import('@/features/users/pages/UserAuditPage')).default,
    }),
    handle: {
      module: 'users',
      title: 'حركات المستخدمين',
      navModule: 'access',
    },
  },
  {
    path: ROUTES.USERS_MATRIX,
    lazy: async () => ({
      Component: (await import('@/features/users/pages/UserPermissionsPage')).default,
    }),
    handle: {
      module: 'users',
      title: 'صلاحيات العمليات والنطاقات',
      navModule: 'access',
    },
  },
  {
    path: ROUTES.USERS_PASSWORD,
    lazy: async () => ({
      Component: (await import('@/features/users/pages/ChangePasswordPage')).default,
    }),
    handle: {
      module: 'users',
      title: 'تغيير كلمة مرور مستخدم',
      navModule: 'access',
    },
  },
  {
    path: ROUTES.USERS_SESSIONS,
    lazy: async () => ({
      Component: (await import('@/features/users/pages/UserSessionsPage')).default,
    }),
    handle: {
      module: 'users',
      title: 'الجلسات النشطة وقفل الجلسة',
      navModule: 'access',
    },
  },
  {
    path: ROUTES.USERS_NEW,
    lazy: async () => ({
      Component: (await import('@/features/users/pages/CreateUserPage')).default,
    }),
    handle: {
      module: 'users',
      title: 'إضافة مستخدم',
      navModule: 'access',
    },
  },
  {
    path: ROUTES.USERS_ID_EDIT,
    lazy: async () => ({
      Component: (await import('@/features/users/pages/EditUserPage')).default,
    }),
    handle: { module: 'users', title: 'تعديل المستخدم', navModule: 'access' },
  },
];
