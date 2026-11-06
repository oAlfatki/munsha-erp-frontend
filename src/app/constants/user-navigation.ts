import { ROUTES } from '@/core/config/navigation-paths';
import type { MenuItem } from '@/shared/types/navigation/MenuItem';

export const MENU_ITEMS: Record<string, MenuItem[]> = {
  dashboard: [],
  access: [
    {
      id: ROUTES.USERS_NEW,
      label: 'إضافة مستخدم',
      target: ROUTES.USERS_NEW,
    },
    {
      id: ROUTES.USERS,
      label: 'قائمة المستخدمين',
      target: ROUTES.USERS,
    },
    {
      id: ROUTES.USERS_PASSWORD,
      label: 'تغيير كلمة مرور مستخدم',
      target: ROUTES.USERS_PASSWORD,
    },
    {
      id: ROUTES.USERS_MATRIX,
      label: 'صلاحيات العمليات والنطاقات',
      target: ROUTES.USERS_MATRIX,
    },
    {
      id: ROUTES.USERS_AUDIT,
      label: 'حركات المستخدمين',
      target: ROUTES.USERS_AUDIT,
    },
    {
      id: ROUTES.USERS_SESSIONS,
      label: 'الجلسات النشطة وقفل الجلسة',
      target: ROUTES.USERS_SESSIONS,
    },
  ],
};
