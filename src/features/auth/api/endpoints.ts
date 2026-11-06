import { pathSegment } from '@/core/api/path-segment';

export const ENDPOINTS = {
  authRefresh: '/auth/refresh',
  fetchAccount: '/auth/me',
  authLogin: '/auth/sign-in',
  authLogout: '/auth/sign-out',
  authChangePassword: '/auth/change-password',

  authRevokeSession: (id: string) => '/auth/sessions/' + pathSegment(id),

  authRevokeAllSessions: '/auth/sessions/revoke-all',
  fetchAuthSessions: `/auth/sessions`,
} as const;
