import { DASHBOARD_NAVIGATION } from '@/app/constants/dashboard-navigation';
import { useAuth } from '@/core/auth/AuthProvider';
import { MENU_ITEMS } from '@/app/constants/user-navigation';
import { ROUTES } from '@/core/config/navigation-paths';
import { menuLeaves } from '@/shared/lib/menu-leaves';
import {
  DEFAULT_DEVICE_SETTINGS,
  applyDeviceSettings,
  readDeviceSettings,
} from '@/core/services/device-settings';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useDashboardLayout() {

  const auth = useAuth();
  const client = useQueryClient();
  const navigate = useNavigate();
  const { pathname: view } = useLocation();
  const [isMobile, setMobile] = useState(false);
  const [isCommand, setCommand] = useState(false);
  const [query, setQuery] = useState('');
  const [device, setDevice] = useState(DEFAULT_DEVICE_SETTINGS);
  const area = view.startsWith('/users') ? 'access' : 'dashboard';
  // Retain the authenticated session heartbeat without loading any ERP feature data.
  useEffect(() => {
    if (!auth.user) return;
    const timer = setInterval(() => {
      void auth.refreshIdentity().catch(() => {});
    }, 60000);
    return () => clearInterval(timer);
  }, [auth.user?.userId, auth.refreshIdentity]);
  useEffect(() => {
    const sync = () => {

      const settings = readDeviceSettings();
      setDevice(settings);
      applyDeviceSettings(settings);
    };

    sync();
    window.addEventListener('erp-device-settings', sync);
    return () => window.removeEventListener('erp-device-settings', sync);
  }, []);
  useEffect(() => {
    document.title = 'منشأة | مساحة العمل';

    const onKeyDown = (event: KeyboardEvent) => {

      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        setCommand((isOpen) => !isOpen);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
  const navigation = DASHBOARD_NAVIGATION.filter(
    (item) => item.id === 'dashboard' || auth.can('USERS', 'USERS_VIEW'),
  );
  const quickLinks = menuLeaves(MENU_ITEMS.access).filter(
    (link) =>
      link.target === ROUTES.USERS_PASSWORD ||
      link.target === ROUTES.USERS_SESSIONS ||
      auth.can(
        'USERS',
        link.target === ROUTES.USERS_NEW
          ? 'USERS_CREATE'
          : link.target === ROUTES.USERS_AUDIT
            ? 'USERS_AUDIT_VIEW'
            : link.target === ROUTES.USERS_MATRIX
              ? 'USERS_PERMISSIONS_VIEW'
              : 'USERS_VIEW',
      ),
  );

  const go = (path: string) => {

    navigate(path);
    setMobile(false);
    setCommand(false);
  };

  const refresh = async () => {

    await Promise.all([
      client.invalidateQueries({ queryKey: ['access'] }),
      client.invalidateQueries({ queryKey: ['users'] }),
      client.invalidateQueries({ queryKey: ['erp', 'dashboard'] }),
    ]);
  };

  return {
    auth,
    view,
    area,
    isMobile,
    setMobile,
    isCommand,
    setCommand,
    query,
    setQuery,
    device,
    navigation,
    quickLinks,
    go,
    refresh,
  };
}
