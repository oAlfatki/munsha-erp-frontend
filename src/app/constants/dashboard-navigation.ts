import {
  Boxes,
  ChartNoAxesCombined,
  ContactRound,
  Landmark,
  LayoutDashboard,
  ReceiptText,
  Settings2,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Truck,
  Users,
} from 'lucide-react';

export const DASHBOARD_NAVIGATION = [
  { id: 'dashboard', name: 'لوحة المتابعة', icon: LayoutDashboard },
  { id: 'access', name: 'المستخدمون والصلاحيات', icon: ShieldCheck },
  { id: 'settings', name: 'الإعدادات', icon: Settings2 },
  { id: 'employees', name: 'الموظفون', icon: ContactRound },
  { id: 'customers', name: 'العملاء', icon: Users },
  { id: 'suppliers', name: 'الموردون', icon: Truck },
  { id: 'inventory', name: 'المخازن والأصناف', icon: Boxes },
  { id: 'expenses', name: 'المصروفات', icon: ReceiptText },
  { id: 'purchases', name: 'المشتريات', icon: ShoppingCart },
  { id: 'sales', name: 'المبيعات', icon: ShoppingBag },
  { id: 'accounts', name: 'الحسابات', icon: Landmark },
  { id: 'financial', name: 'القوائم المالية', icon: ChartNoAxesCombined },
];
