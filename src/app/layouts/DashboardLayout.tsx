import { useCompanyData } from '@/app/providers/CompanyProvider';
import { useAuth } from '@/core/auth/AuthProvider';
import { MENU_ITEMS,menuLeaves } from '@/core/config/menu';
import { ROUTES } from '@/core/config/navigation-paths';
import { setReportIdentity } from '@/core/reporting/formatting';
import { ModuleLinks } from '@/core/router/ModuleLinks';
import { SectionNavigation } from '@/core/router/SectionNavigation';
import {
applyDeviceSettings,
DEFAULT_DEVICE_SETTINGS,
readDeviceSettings,
} from '@/core/services/device-settings';
import { useApplication } from '@/core/state/ApplicationProvider';
import { ThemeToggle } from '@/core/theme/ThemeToggle';
import { isArchived } from "@/features/accounting/public/annual-books";
import { SessionMenu } from '@/features/auth/components/SessionMenu';
import { fetchSearchItems } from "@/features/inventory/public/read-api";
import { AutomaticBackups } from '@/features/settings/components/AutomaticBackups';
import { fetchAuditEvents } from '@/features/users/api/read-api';
import { Modal } from '@/shared/ui/dialogs/Modal';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { useQuery } from '@tanstack/react-query';
import {
ArrowUpLeft,
Bell,
Boxes,
Building2,
ChartNoAxesCombined,
ChevronDown,
ChevronLeft,
CloudCheck,
ContactRound,
Landmark,
LayoutDashboard,
LoaderCircle,
Menu,
Package,
ReceiptText,
RefreshCw,
Search,
Settings2,
ShieldCheck,
ShoppingBag,
ShoppingCart,
Truck,
Users,
} from 'lucide-react';
import { useEffect,useState } from 'react';
import { Outlet,useMatches } from 'react-router-dom';
const NAV = [
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
export function DashboardLayout() {
  const { user } = useAuth();
  const session = { user, signInHref: ROUTES.LOGIN, signOutHref: ROUTES.LOGIN };
  const {
    state: s,
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
    if (s)
      setReportIdentity({
        name: s.branding?.name || s.organization.name,
        legalName: s.organization.name,
        address: s.organization.address,
        phone: s.organization.phone,
        email: s.organization.email || '',
        taxNumber: s.organization.taxNumber || '',
        registrationNumber: s.organization.registrationNumber || '',
        logo: s.branding?.logo || '',
        branch: s.branches.find((branch) => branch.id === branchId)?.name || '',
        year: s.organization.year,
        user: session.user?.displayName || 'مستخدم النظام',
      });
  }, [s, branchId, session.user?.displayName]);
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
  const bookId = s?.annualBooks?.activeId;
  const productSearch = useQuery({
    queryKey: ['erp', 'inventory', 'search', user?.userId, user?.kind, bookId, branchId, query],
    queryFn: () => fetchSearchItems({ q: query, page: 1, pageSize: 10, bookId }),
    enabled: isCommand && !!query.trim(),
  });
  const notifications = useQuery({
    queryKey: ['erp', 'users', 'notifications', user?.userId, user?.kind, bookId],
    queryFn: () => fetchAuditEvents({ page: 1, pageSize: 8, bookId }),
    enabled: isNotifications,
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
    if (s) {
      document.title = (s.branding?.name || s.organization.name) + ' | الإدارة والمحاسبة';
      document.documentElement.style.setProperty('--brand-primary', s.branding?.color || '#17685b');
    }
  }, [s?.branding, s?.organization.name]);
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
  if (isLoading)
    return (
      <div className="app-loader">
        <div className="brand-icon">
          <Boxes />
        </div>
        <h2>إدارة الأعمال</h2>
        <LoaderCircle className="animate-spin" />
        <p>جارٍ تحميل مساحة العمل…</p>
      </div>
    );
  if (!s)
    return (
      <div className="app-loader">
        <CloudCheck size={45} />
        <h2>تعذر تحميل بيانات السحابة</h2>
        <p>{error}</p>
        <Button onClick={refresh}>إعادة المحاولة</Button>
      </div>
    );
  const activeName =
    NAV.find((n) => n.id === area)?.name || (base === 'products' ? 'دليل الأصناف' : 'مساحة العمل');
  return (
    <div className="app-shell">
      <aside className={'sidebar ' + (isMobile ? 'open' : '')}>
        <button className="brand" onClick={() => go(ROUTES.DASHBOARD)}>
          <span className="brand-icon">
            {s.branding?.logo ? (
              <img src={s.branding.logo} alt="شعار المنصة" />
            ) : (
              <svg width="27" height="29" viewBox="0 0 27 29" fill="none">
                <path
                  d="M2 9L13.5 2 25 9V22L13.5 28 2 22V9Z"
                  stroke="currentColor"
                  strokeWidth="2.2"
                />
                <path
                  d="M2 9L13.5 16 25 9M13.5 16V28M8 5.5L20 12.3"
                  stroke="currentColor"
                  strokeWidth="2.2"
                />
              </svg>
            )}
          </span>
          <span>
            <strong>{s.branding?.name || s.organization.name}</strong>
            <small>{s.branding?.tagline || 'إدارة أعمالك في مكان واحد'}</small>
          </span>
          <span className="version-tag">ERP</span>
        </button>
        <div className="sidebar-workspace">
          <div className="workspace-symbol">
            <Building2 size={19} />
          </div>
          <div>
            <b>{s.organization.name}</b>
            <small>مساحة العمل</small>
          </div>
          <ChevronDown size={14} />
        </div>
        <div className="nav-label">مساحة العمل</div>
        <nav>
          {NAV.map((n, i) => {
            if (
              n.id !== 'access' &&
              !allowed(n.id) &&
              !(n.id === 'inventory' && allowed('products'))
            )
              return null;
            return (
              <div key={n.id}>
                {i === 1 && <div className="nav-divider" />}
                <button
                  className={'nav-item ' + (area === n.id ? 'active' : '')}
                  onClick={() =>
                    go(
                      n.id === 'access'
                        ? '/access'
                        : n.id === 'accounts'
                          ? ROUTES.ACCOUNTING
                          : '/' + n.id,
                    )
                  }
                >
                  <n.icon size={19} />
                  <span>{n.name}</span>
                  {n.id === 'dashboard' ? (
                    <span className="nav-badge">نظرة عامة</span>
                  ) : (
                    <ChevronLeft size={13} className="nav-chevron" />
                  )}
                </button>
                {area === n.id && n.id !== 'dashboard' && (
                  <SectionNavigation module={n.id} view={view} go={go} />
                )}
              </div>
            );
          })}
        </nav>
        <div className="sidebar-bottom">
          <div className="cloud-state">
            <CloudCheck size={18} />
            <div>
              <b>{'متصل بالخادم'}</b>
              <small>مساحة عمل · الإصدار 1.0</small>
            </div>
            <span className="live-dot" />
          </div>
          <div className="owner">
            <span className="avatar">{s.organization.name.slice(0, 2)}</span>
            <div>
              <strong>{session.user?.displayName}</strong>
              <small>
                {session.user?.role === 'admin'
                  ? 'مسؤول النظام'
                  : session.user?.role === 'staff'
                    ? 'مستخدم عمليات'
                    : 'مشاهدة فقط'}
              </small>
            </div>
            <ShieldCheck size={16} />
          </div>
        </div>
      </aside>
      {isMobile && (
        <button
          className="mobile-scrim"
          onClick={() => setMobile(false)}
          aria-label="إغلاق القائمة"
        />
      )}
      <main className="app-main">
        <header className="topbar">
          <div className="topbar-start">
            <Button
              className="mobile-menu"
              aria-label="القائمة"
              variant="ghost"
              size="icon"
              onClick={() => setMobile(true)}
            >
              <Menu />
            </Button>
            <span className="desktop-home">الرئيسية</span>
            <ChevronLeft size={13} />
            <strong>{activeName}</strong>
            <span className="topbar-divider" />
            <div className="branch-switch">
              <Building2 size={15} />
              <select
                aria-label="تحديد الفرع"
                disabled={isEditingDocument}
                value={branchId}
                onChange={(e) => {
                  setBranchId(e.target.value);
                  if (view.endsWith('/new'))
                    go(view === ROUTES.ACCOUNTING_JOURNAL_NEW ? ROUTES.ACCOUNTING : view.slice(0, -4));
                }}
              >
                {s.branches
                  .filter((branch) => branch.active)
                  .map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="topbar-end">
            <ThemeToggle />
            <AutomaticBackups isEnabled={session.user?.role === 'admin'} />
            <SessionMenu {...session} editing={isEditingDocument} />
            <button className="global-search" onClick={() => setCommand(true)}>
              <Search size={16} />
              <span>ابحث عن أي شيء…</span>
              <kbd>⌘ K</kbd>
            </button>
            <button
              className="notification-button"
              aria-label="الإشعارات"
              onClick={() => setNotifications(true)}
            >
              <Bell size={19} />
              <i />
            </button>
            <span className="topbar-divider" />
            <span className="date-display">
              {new Intl.DateTimeFormat('ar-YE', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              }).format(new Date())}
            </span>
            <span className="avatar small">{s.organization.name.slice(0, 2)}</span>
          </div>
        </header>
        <div className="workspace-content">
          <div className="white-label-print-header">
            {s.branding?.logo && <img src={s.branding.logo} alt="الشعار" />}
            <h2>{s.branding?.name || s.organization.name}</h2>
            <p>
              {s.organization.name} · {s.organization.address} · {s.organization.phone}
            </p>
          </div>
          {error && (
            <div className="error-banner">
              {error}
              <Button variant="outline" onClick={refresh}>
                إعادة الاتصال
              </Button>
            </div>
          )}
          <ModuleLinks module={area} />
          {
            <div className={'annual-period-banner ' + (isArchived(s) ? 'archived' : '')}>
              <span>
                السنة المالية {s.organization.year} ·{' '}
                {isArchived(s) ? 'مؤرشفة — للعرض فقط' : 'مفتوحة'}
              </span>
              <button onClick={() => go(ROUTES.SETTINGS_ANNUAL_BOOKS)}>
                الفترات والترحيل
                <ChevronLeft size={14} />
              </button>
            </div>
          }
          {session.user?.role === 'viewer' && (
            <div className="info-note">حساب مشاهدة فقط — لا يمكنك حفظ العمليات.</div>
          )}
          <Outlet />
          <div className="device-print-footer">{device.footer}</div>
        </div>
        <footer className="global-footer">
          <span>
            <span className="live-dot" />
            {isBusy ? 'جارٍ الحفظ…' : 'آخر نسخة محفوظة'} <b>#{revision}</b>
          </span>
          <button onClick={refresh}>
            <RefreshCw size={12} />
            تحديث البيانات
          </button>
          <div>
            <span>{'جلسة مستخدم موثّقة'}</span>
          </div>
        </footer>
      </main>
      <Modal
        isOpen={isCommand}
        title="البحث السريع"
        description="انتقل إلى قسم، أو ابحث عن صنف أو طرف."
        onClose={() => setCommand(false)}
      >
        <Input
          autoFocus
          placeholder="ابحث هنا…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="command-results">
          {NAV.filter((n) => n.name.includes(query)).map((n) => (
            <button
              key={n.id}
              onClick={() =>
                go(n.id === 'access' ? '/access' : n.id === 'accounts' ? ROUTES.ACCOUNTING : '/' + n.id)
              }
            >
              <n.icon size={17} />
              <span>{n.name}</span>
              <ArrowUpLeft size={15} />
            </button>
          ))}
          {quickLinks
            .filter((link) => query && link.label.includes(query))
            .map((link) => (
              <button key={link.target} onClick={() => go(link.target!)}>
                <Search size={17} />
                <span>{link.label}</span>
                <small>شاشة</small>
              </button>
            ))}
          {productSearch.data?.items.map((product) => (
            <button key={product.id} onClick={() => go(ROUTES.INVENTORY_ITEMS)}>
              <Package size={17} />
              <span>{product.label}</span>
              <small>صنف</small>
            </button>
          ))}
          {productSearch.isFetching && <p>جارٍ البحث…</p>}
          {productSearch.error && <p role="alert">{productSearch.error.message}</p>}
        </div>
      </Modal>
      <Modal
        isOpen={isNotifications}
        title="تنبيهات مساحة العمل"
        description="المستجدات والعمليات الأخيرة"
        onClose={() => setNotifications(false)}
      >
        <div className="notification-list">
          {(notifications.data?.items || []).map((a) => (
            <div key={a.id}>
              <span className="mini-icon teal">
                <CloudCheck size={17} />
              </span>
              <div>
                <strong>{a.action}</strong>
                <small>
                  {a.reference} · {new Date(a.date).toLocaleDateString('ar-YE')}
                </small>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
