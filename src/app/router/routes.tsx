import type { RouteObject } from 'react-router-dom';
import { ACCOUNTING_ROUTES } from './modules/accounting.routes';
import { AUTH_ROUTES } from './modules/auth.routes';
import { CUSTOMERS_ROUTES } from './modules/customers.routes';
import { DASHBOARD_ROUTES } from './modules/dashboard.routes';
import { EMPLOYEES_ROUTES } from './modules/employees.routes';
import { EXPENSES_ROUTES } from './modules/expenses.routes';
import { FINANCIAL_ROUTES } from './modules/financial.routes';
import { INVENTORY_ROUTES } from './modules/inventory.routes';
import { PURCHASES_ROUTES } from './modules/purchases.routes';
import { REPORTS_ROUTES } from './modules/reports.routes';
import { SALES_ROUTES } from './modules/sales.routes';
import { SETTINGS_ROUTES } from './modules/settings.routes';
import { SUPPLIERS_ROUTES } from './modules/suppliers.routes';
import { TRADE_ROUTES } from './modules/trade.routes';
import { USERS_ROUTES } from './modules/users.routes';
export const APP_ROUTES: RouteObject[] = [
  ...ACCOUNTING_ROUTES,
  ...AUTH_ROUTES,
  ...CUSTOMERS_ROUTES,
  ...DASHBOARD_ROUTES,
  ...EMPLOYEES_ROUTES,
  ...EXPENSES_ROUTES,
  ...FINANCIAL_ROUTES,
  ...INVENTORY_ROUTES,
  ...PURCHASES_ROUTES,
  ...REPORTS_ROUTES,
  ...SALES_ROUTES,
  ...SETTINGS_ROUTES,
  ...SUPPLIERS_ROUTES,
  ...TRADE_ROUTES,
  ...USERS_ROUTES,
];
