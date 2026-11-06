import { DASHBOARD_NAVIGATION } from '@/app/constants/dashboard-navigation';
import { useDashboardLayout } from '@/app/hooks/useDashboardLayout';
import { ROUTES } from '@/core/config/navigation-paths';
import { SessionMenu } from '@/features/auth/public';
import { isArchived } from '@/features/ledger/public';
import { AutomaticBackups } from '@/features/settings/public';
import { ThemeToggle } from '@/shared/ui/actions/ThemeToggle';
import { Modal } from '@/shared/ui/dialogs/Modal';
import { ModuleLinks } from '@/shared/ui/navigation/ModuleLinks';
import { SectionNavigation } from '@/shared/ui/navigation/SectionNavigation';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import {
  ArrowUpLeft,
  Bell,
  Boxes,
  Building2,
  ChevronDown,
  ChevronLeft,
  CloudCheck,
  LoaderCircle,
  Menu,
  Package,
  RefreshCw,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { Outlet } from 'react-router-dom';

export function DashboardLayout() {

  const model = useDashboardLayout();
  const {
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
  } = model;
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
  if (!state)
    return (
      <div className="app-loader">
        <CloudCheck size={45} />
        <h2>تعذر تحميل بيانات السحابة</h2>
        <p>{error}</p>
        <Button onClick={refresh}>إعادة المحاولة</Button>
      </div>
    );
  const activeName =
    DASHBOARD_NAVIGATION.find((n) => n.id === area)?.name ||
    (base === 'products' ? 'دليل الأصناف' : 'مساحة العمل');
  return (
    <div className="app-shell">
      <aside className={'sidebar ' + (isMobile ? 'open' : '')}>
        <button className="brand" onClick={() => go(ROUTES.DASHBOARD)}>
          <span className="brand-icon">
            {state.branding?.logo ? (
              <img src={state.branding.logo} alt="شعار المنصة" />
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
            <strong>{state.branding?.name || state.organization.name}</strong>
            <small>{state.branding?.tagline || 'إدارة أعمالك في مكان واحد'}</small>
          </span>
          <span className="version-tag">ERP</span>
        </button>
        <div className="sidebar-workspace">
          <div className="workspace-symbol">
            <Building2 size={19} />
          </div>
          <div>
            <b>{state.organization.name}</b>
            <small>مساحة العمل</small>
          </div>
          <ChevronDown size={14} />
        </div>
        <div className="nav-label">مساحة العمل</div>
        <nav>
          {DASHBOARD_NAVIGATION.map((n, i) => {
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
                        ? ROUTES.USERS
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
            <span className="avatar">{state.organization.name.slice(0, 2)}</span>
            <div>
              <strong>{session.user?.displayName}</strong>
              <small>{'صلاحيات الحساب المعتمدة'}</small>
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
                    go(
                      view === ROUTES.ACCOUNTING_JOURNAL_NEW
                        ? ROUTES.ACCOUNTING
                        : view.slice(0, -4),
                    );
                }}
              >
                {state.branches
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
            <AutomaticBackups isEnabled={!!user} />
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
            <span className="avatar small">{state.organization.name.slice(0, 2)}</span>
          </div>
        </header>
        <div className="workspace-content">
          <div className="white-label-print-header">
            {state.branding?.logo && <img src={state.branding.logo} alt="الشعار" />}
            <h2>{state.branding?.name || state.organization.name}</h2>
            <p>
              {state.organization.name} · {state.organization.address} · {state.organization.phone}
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
          {isAccessLoading && <p role="status">جارٍ تحميل صلاحيات الحساب…</p>}
          {accessError && (
            <div role="alert">
              <p>
                تعذر تحميل صلاحيات الحساب. لم تُمنح صلاحيات افتراضية؛ قد يتطلب عقد دليل الصلاحيات
                مراجعة مع Backend.
              </p>
              <Button onClick={refresh}>إعادة المحاولة</Button>
            </div>
          )}
          <ModuleLinks module={area} />
          {
            <div className={'annual-period-banner ' + (isArchived(state) ? 'archived' : '')}>
              <span>
                السنة المالية {state.organization.year} ·{' '}
                {isArchived(state) ? 'مؤرشفة — للعرض فقط' : 'مفتوحة'}
              </span>
              <button onClick={() => go(ROUTES.SETTINGS_ANNUAL_BOOKS)}>
                الفترات والترحيل
                <ChevronLeft size={14} />
              </button>
            </div>
          }

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
          {DASHBOARD_NAVIGATION.filter((n) => n.name.includes(query)).map((n) => (
            <button
              key={n.id}
              onClick={() =>
                go(
                  n.id === 'access'
                    ? ROUTES.USERS
                    : n.id === 'accounts'
                      ? ROUTES.ACCOUNTING
                      : '/' + n.id,
                )
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
                <strong>{a.eventCode}</strong>
                <small>
                  {a.targetId || 'غير متوفر'} ·{' '}
                  {new Date(a.occurredAtUtc).toLocaleDateString('ar-YE')}
                </small>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
