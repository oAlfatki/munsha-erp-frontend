/** Routes available in the Auth/Users/Dashboard foundation. */
export const ROUTES = {
  USERS_ID: '/users/:id',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  USERS: '/users',
  USERS_AUDIT: '/users/audit',
  USERS_MATRIX: '/users/matrix',
  USERS_PASSWORD: '/users/password',
  USERS_SESSIONS: '/users/sessions',
  USERS_NEW: '/users/new',
  USERS_ID_EDIT: '/users/:id/edit',
} as const;
