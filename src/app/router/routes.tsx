import type { RouteObject } from 'react-router-dom';
import { AUTH_ROUTES } from './modules/auth.routes';
import { DASHBOARD_ROUTES } from './modules/dashboard.routes';
import { USERS_ROUTES } from './modules/users.routes';

export const APP_ROUTES: RouteObject[] = [...AUTH_ROUTES, ...DASHBOARD_ROUTES, ...USERS_ROUTES];
