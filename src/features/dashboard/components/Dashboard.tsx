import { ROUTES } from '@/core/config/navigation-paths';
import { fmt } from '@/core/utils/formatters';
import { useDashboardController } from '@/features/dashboard/hooks/useDashboardController';
import { LoadingState } from '@/shared/ui/feedback/LoadingState';
import {
  ArrowLeft,
  ArrowUpLeft,
  Banknote,
  FilePlus2,
  Package,
  ReceiptText,
  ShoppingCart,
  TriangleAlert,
  Truck,
  Undo2,
  UserPlus,
} from 'lucide-react';
export function Dashboard() {
  const model = useDashboardController();
  if (!model) return null;
  const { navigate, low, isLoading, error } = model;
  if (isLoading) return <LoadingState />;
  if (error)
    return (
      <p role="alert" className="field-error">
        {error}
      </p>
    );
  return (
    <>
      <div className="welcome">
        <div>
          <div className="eyebrow">
            <span className="live-dot" />
            مساحة العمل
          </div>
          <h1>
            أهلًا بك <span>☀</span>
          </h1>
          <p>وصول سريع إلى أعمالك اليومية والتنبيهات التي تحتاج إلى متابعة.</p>
        </div>
      </div>
      <div className="dashboard-middle">
        <section className="panel quick-panel">
          <div className="panel-heading">
            <div>
              <h2>ابدأ إجراءً جديدًا</h2>
              <p>وصول أسرع لأعمالك اليومية</p>
            </div>
          </div>
          <div className="quick-grid">
            {[
              { label: 'فاتورة بيع', icon: FilePlus2, to: ROUTES.SALES_NEW, color: 'teal' },
              { label: 'فاتورة شراء', icon: ShoppingCart, to: ROUTES.PURCHASES_NEW, color: 'sand' },
              { label: 'إضافة صنف', icon: Package, to: ROUTES.INVENTORY_ITEMS_NEW, color: 'blue' },
              { label: 'تسجيل مصروف', icon: ReceiptText, to: ROUTES.EXPENSES_ADD, color: 'purple' },
              { label: 'إضافة مورد', icon: Truck, to: ROUTES.SUPPLIERS_NEW, color: 'sand' },
              { label: 'إضافة عميل', icon: UserPlus, to: ROUTES.CUSTOMERS_NEW, color: 'teal' },
              { label: 'مرتجع مبيعات', icon: Undo2, to: ROUTES.SALES_SALES_RETURNS, color: 'blue' },
              {
                label: 'مرتجع مشتريات',
                icon: Undo2,
                to: ROUTES.PURCHASES_PURCHASE_RETURNS,
                color: 'purple',
              },
              {
                label: 'سند قبض',
                icon: ReceiptText,
                to: ROUTES.ACCOUNTING_VOUCHERS_RECEIPT_NEW,
                color: 'teal',
              },
              {
                label: 'سند صرف',
                icon: Banknote,
                to: ROUTES.ACCOUNTING_VOUCHERS_PAYMENT_NEW,
                color: 'sand',
              },
            ].map(({ label, icon: Icon, to, color }) => (
              <button key={to} onClick={() => navigate(to)}>
                <span className={'stat-icon ' + color}>
                  <Icon size={23} />
                </span>
                <b>{label}</b>
                <ArrowUpLeft size={14} />
              </button>
            ))}
          </div>
          <div className="quick-note">
            <span className="live-dot" />
            <div>
              <strong>بياناتك متزامنة</strong>
              <p>التغييرات تُحفظ مباشرة على السحابة.</p>
            </div>
          </div>
        </section>{' '}
        <section className="panel stock-alert">
          <div className="panel-heading">
            <div>
              <h2>
                تنبيهات المخزون <span className="count-badge">{low.length}</span>
              </h2>
              <p>أصناف تحتاج إلى متابعة</p>
            </div>
            <TriangleAlert size={19} className="text-amber-600" />
          </div>
          {low.slice(0, 3).map((p) => (
            <div className="alert-row" key={p.productId}>
              <span className="product-avatar">{p.name.slice(0, 1)}</span>
              <div>
                <strong>{p.name}</strong>
                <small>
                  حد الطلب {fmt(p.reorderLevel)} {p.unit}
                </small>
              </div>
              <b>
                {fmt(p.availableQty)}
                <small>متاح</small>
              </b>
            </div>
          ))}
          {!low.length && (
            <div className="healthy">
              <Package size={30} />
              <strong>مخزونك في وضع جيد</strong>
              <p>لا توجد أصناف دون حد الطلب.</p>
            </div>
          )}
          <button className="stock-link" onClick={() => navigate(ROUTES.INVENTORY)}>
            مراجعة المخزون <ArrowLeft size={15} />
          </button>
        </section>
      </div>
    </>
  );
}
