import { useDashboardLayout } from '@/app/hooks/useDashboardLayout';
import { ROUTES } from '@/core/config/navigation-paths';
import { SessionMenu } from '@/features/auth/public';
import { ThemeToggle } from '@/shared/ui/actions/ThemeToggle';
import { Modal } from '@/shared/ui/dialogs/Modal';
import { SectionNavigation } from '@/shared/ui/navigation/SectionNavigation';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { Boxes, ChevronLeft, Menu, Search, RefreshCw, ShieldCheck } from 'lucide-react';
import { Outlet } from 'react-router-dom';

export function DashboardLayout() {

  const {
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
  } = useDashboardLayout();
  const activeName = area === 'access' ? 'المستخدمون والصلاحيات' : 'لوحة المتابعة';
  return (
    <div className="app-shell">
      <aside className={'sidebar ' + (isMobile ? 'open' : '')}>
        <button className="brand" onClick={() => go(ROUTES.DASHBOARD)}>
          <span className="brand-icon">
            <Boxes />
          </span>
          <span>
            <strong>منشأة</strong>
            <small>إدارة أعمالك في مكان واحد</small>
          </span>
          <span className="version-tag">ERP</span>
        </button>
        <div className="sidebar-workspace">
          <ShieldCheck size={19} />
          <div>
            <b>{auth.user?.displayName}</b>
            <small>الفرع {auth.user?.branchId}</small>
          </div>
        </div>
        <div className="nav-label">مساحة العمل</div>
        <nav>
          {navigation.map((item) => (
            <div key={item.id}>
              <button
                className={'nav-item ' + (area === item.id ? 'active' : '')}
                aria-current={area === item.id ? 'page' : undefined}
                onClick={() => go(item.target)}
              >
                <item.icon size={19} />
                <span>{item.name}</span>
                <ChevronLeft size={13} />
              </button>
              {area === item.id && item.id === 'access' && (
                <SectionNavigation entries={quickLinks} view={view} go={go} />
              )}
            </div>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="owner">
            <span className="avatar">{auth.user?.displayName.slice(0, 2)}</span>
            <div>
              <strong>{auth.user?.displayName}</strong>
              <small>صلاحيات الحساب المعتمدة</small>
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
          </div>
          <div className="topbar-end">
            <ThemeToggle />
            <SessionMenu editing={false} />
            <button className="global-search" onClick={() => setCommand(true)}>
              <Search size={16} />
              <span>ابحث عن شاشة…</span>
              <kbd>⌘ K</kbd>
            </button>
            <span className="avatar small">{auth.user?.displayName.slice(0, 2)}</span>
          </div>
        </header>
        <div className="workspace-content">
          {auth.isAccessLoading && <p role="status">جارٍ تحميل صلاحيات الحساب…</p>}
          {auth.accessError && (
            <div role="alert">
              <p>تعذر تحميل صلاحيات الحساب. لم تُمنح صلاحيات افتراضية.</p>
              <Button onClick={refresh}>إعادة المحاولة</Button>
            </div>
          )}
          <Outlet />
          <div className="device-print-footer">{device.footer}</div>
        </div>
        <footer className="global-footer">
          <span>جلسة مستخدم موثّقة · الفرع {auth.user?.branchId}</span>
          <button onClick={refresh}>
            <RefreshCw size={12} />
            تحديث البيانات
          </button>
        </footer>
      </main>
      <Modal
        isOpen={isCommand}
        title="البحث السريع"
        description="انتقل إلى شاشة ضمن مساحة العمل."
        onClose={() => setCommand(false)}
      >
        <Input
          autoFocus
          placeholder="ابحث هنا…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="command-results">
          {navigation
            .filter((item) => item.name.includes(query))
            .map((item) => (
              <button key={item.id} onClick={() => go(item.target)}>
                <item.icon size={17} />
                <span>{item.name}</span>
              </button>
            ))}
          {quickLinks
            .filter((link) => query && link.label.includes(query))
            .map((link) => (
              <button key={link.id} onClick={() => go(link.target!)}>
                <Search size={17} />
                <span>{link.label}</span>
              </button>
            ))}
        </div>
      </Modal>
    </div>
  );
}
