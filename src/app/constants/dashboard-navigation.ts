import { LayoutDashboard, ShieldCheck } from 'lucide-react';
import { ROUTES } from '@/core/config/navigation-paths';

export const DASHBOARD_NAVIGATION = [
  { id: 'dashboard', name: 'لوحة المتابعة', icon: LayoutDashboard, target: ROUTES.DASHBOARD },
  { id: 'access', name: 'المستخدمون والصلاحيات', icon: ShieldCheck, target: ROUTES.USERS },
];
