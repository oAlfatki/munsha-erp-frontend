import { ROUTES } from '@/core/config/navigation-paths';
import { fmt } from '@/core/utils/formatters';
import { useDashboardController } from '@/features/dashboard/hooks/useDashboardController';
import { LoadingState } from '@/shared/ui/feedback/LoadingState';
import { Panel } from '@/shared/ui/layout/Panel';
import { Button } from '@/shared/ui/primitives/button';
import { Package, TriangleAlert, UserPlus, Users, KeyRound, Monitor } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {

  const { can, low, isLoading, error } = useDashboardController();
  const navigate = useNavigate();
  const actions = [
    {
      label: 'إضافة مستخدم',
      to: ROUTES.USERS_NEW,
      icon: UserPlus,
      visible: can('USERS', 'USERS_CREATE'),
    },
    {
      label: 'قائمة المستخدمين',
      to: ROUTES.USERS,
      icon: Users,
      visible: can('USERS', 'USERS_VIEW'),
    },
    { label: 'تغيير كلمة المرور', to: ROUTES.USERS_PASSWORD, icon: KeyRound, visible: true },
    { label: 'جلساتي', to: ROUTES.USERS_SESSIONS, icon: Monitor, visible: true },
  ];
  return (
    <>
      <div className="welcome">
        <div>
          <div className="eyebrow">مساحة العمل</div>
          <h1>
            أهلًا بك <span>☀</span>
          </h1>
          <p>إدارة الحساب والجلسات والمستخدمين من مكان واحد.</p>
        </div>
      </div>
      <div className="dashboard-middle">
        <Panel className="quick-panel" title="الوصول السريع" description="الإجراءات المتاحة لحسابك">
          <div className="quick-grid">
            {actions
              .filter((action) => action.visible)
              .map(({ label, to, icon: Icon }) => (
                <button key={to} onClick={() => navigate(to)}>
                  <span className="stat-icon teal">
                    <Icon size={23} />
                  </span>
                  <b>{label}</b>
                </button>
              ))}
          </div>
        </Panel>
        <Panel
          className="stock-alert"
          title={
            <>
              تنبيهات المخزون <span className="count-badge">{low.length}</span>
            </>
          }
          description="ملخص للقراءة من الخادم"
          action={<TriangleAlert size={19} />}
        >
          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <div role="alert" className="field-error">
              {error}
            </div>
          ) : (
            <>
              {low.slice(0, 3).map((product) => (
                <div className="alert-row" key={product.productId}>
                  <span className="product-avatar">{product.name.slice(0, 1)}</span>
                  <div>
                    <strong>{product.name}</strong>
                    <small>
                      حد الطلب {fmt(product.reorderLevel)} {product.unit}
                    </small>
                  </div>
                  <b>
                    {fmt(product.availableQty)}
                    <small>متاح</small>
                  </b>
                </div>
              ))}
              {!low.length && (
                <div className="healthy">
                  <Package size={30} />
                  <strong>لا توجد تنبيهات مخزون.</strong>
                </div>
              )}
            </>
          )}
        </Panel>
      </div>
      {!can('USERS', 'USERS_VIEW') && (
        <Panel title="الحساب والجلسات" description="صلاحياتك يحددها الخادم">
          <p>تتوفر إدارة الحساب الشخصي دون منح صلاحيات إدارة مستخدمين.</p>
          <Button onClick={() => navigate(ROUTES.USERS_SESSIONS)}>جلساتي</Button>
        </Panel>
      )}
    </>
  );
}
