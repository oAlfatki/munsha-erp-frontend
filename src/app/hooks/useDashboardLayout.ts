import { useCompanyData } from '@/app/providers/CompanyProvider';
import { useAuth } from '@/core/auth/AuthProvider';
import { MENU_ITEMS, menuLeaves } from '@/core/config/menu';
import { ROUTES } from '@/core/config/navigation-paths';
import { setReportIdentity } from '@/core/reporting/formatting';
import {
  applyDeviceSettings,
  DEFAULT_DEVICE_SETTINGS,
  readDeviceSettings,
} from '@/core/services/device-settings';
import { useApplication } from '@/core/state/ApplicationProvider';
import { fetchSearchItems } from '@/features/stock/public';
import { userActivityApi } from '@/features/users/public';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useMatches } from 'react-router-dom';

export function useDashboardLayout() {

  const { user, can, accessError, isAccessLoading } = useAuth();
  const session = { user, signInHref: ROUTES.LOGIN, signOutHref: ROUTES.LOGIN };
  const {
    state,
    loading: isLoading,
    error,
    refresh,
    busy: isBusy,
    view,
    navigate,
    branchId,
    setBranchId,
    allowed,
    revision,
    editingDocument: isEditingDocument,
  } = { ...useApplication(), ...useCompanyData() };
  useEffect(() => {
    if (state)
      setReportIdentity({
        name: state.branding?.name || state.organization.name,
        legalName: state.organization.name,
        address: state.organization.address,
        phone: state.organization.phone,
        email: state.organization.email || '',
        taxNumber: state.organization.taxNumber || '',
        registrationNumber: state.organization.registrationNumber || '',
        logo: state.branding?.logo || '',
        branch: state.branches.find((branch) => branch.id === branchId)?.name || '',
        year: state.organization.year,
        user: session.user?.displayName || 'مستخدم النظام',
      });
  }, [state, branchId, session.user?.displayName]);
  const [device, setDevice] = useState(DEFAULT_DEVICE_SETTINGS);
  useEffect(() => {
    const sync = () => {

      const v = readDeviceSettings();
      setDevice(v);
      applyDeviceSettings(v);
    };

    sync();
    window.addEventListener('erp-device-settings', sync);
    return () => window.removeEventListener('erp-device-settings', sync);
  }, []);
  const [isMobile, setMobile] = useState(false),
    [isCommand, setCommand] = useState(false),
    [query, setQuery] = useState(''),
    [isNotifications, setNotifications] = useState(false);
  const bookId = state?.annualBooks?.activeId;
  const productSearch = useQuery({
    queryKey: ['erp', 'inventory', 'search', user?.userId, 'aspnet', bookId, branchId, query],

    queryFn: () => fetchSearchItems({ q: query, page: 1, pageSize: 10, bookId }),

    enabled: isCommand && !!query.trim(),
  });
  const notifications = useQuery({
    queryKey: ['erp', 'users', 'notifications', user?.userId, 'aspnet', bookId],

    queryFn: () =>
      userActivityApi.audit({ page: 1, pageSize: 8, branchId: Number(user?.branchId) }),

    enabled: isNotifications && can('USERS', 'USERS_AUDIT_VIEW'),
  });
  const matches = useMatches();
  const routeHandle = matches.findLast((match) => match.handle)?.handle as
    | { module?: string; navModule?: string }
    | undefined;
  const routeModule = routeHandle?.navModule || routeHandle?.module || '';
  const area =
    routeModule === 'users' ? 'access' : routeModule === 'accounting' ? 'accounts' : routeModule;
  const base = view.split('/')[1];
  const quickLinks = Object.values(MENU_ITEMS).flatMap(menuLeaves);
  useEffect(() => {
    if (state) {
      document.title = (state.branding?.name || state.organization.name) + ' | الإدارة والمحاسبة';
      document.documentElement.style.setProperty(
        '--brand-primary',
        state.branding?.color || '#17685b',
      );
    }
  }, [state?.branding, state?.organization.name]);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {

      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommand((isV) => !isV);
      }
    };

    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, []);

  const go = (v: string) => {

    navigate(v);
    setMobile(false);
    setCommand(false);
  };

  return {
    user,
    accessError,
    isAccessLoading,
    session,
    s: state,
    isLoading,
    error,
    refresh,
    isBusy,
    view,
    branchId,
    setBranchId,
    allowed,
    revision,
    isEditingDocument,
    device,
    isMobile,
    setMobile,
    isCommand,
    setCommand,
    query,
    setQuery,
    isNotifications,
    setNotifications,
    productSearch,
    notifications,
    area,
    base,
    quickLinks,
    go,
  };
}
