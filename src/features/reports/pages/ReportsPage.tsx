import { PageHead } from '@/core/components/shared/layout/PageHead';
import { Link } from 'react-router-dom';
const REPORT_LINKS = [
  { title: 'تقرير تكلفة المخزون', path: '/inventory/cost' },
  { title: 'أصناف بلغت حد الطلب', path: '/inventory/reorder' },
  { title: 'الأصناف الراكدة', path: '/inventory/stagnant' },
  { title: 'فواتير التحويل بين المخازن', path: '/inventory/transfers' },
  { title: 'تقرير أصناف بداية المدة', path: '/inventory/opening-stock-report' },
  { title: 'قائمة تسويات المخزون', path: '/inventory/adjustments' },
  { title: 'مراجعة تكلفة الصنف التاريخية', path: '/inventory/historical-cost' },
  { title: 'بحث سندات الصرف والقبض', path: '/accounting/vouchers' },
  { title: 'حركة الصندوق', path: '/accounting/cash-movement' },
  { title: 'تقرير الأرصدة الافتتاحية', path: '/accounting/opening-report' },
  { title: 'تقرير الأصول والإهلاك', path: '/accounting/asset-report' },
  { title: 'مراجعة أرصدة العملات', path: '/accounting/fx' },
  { title: 'تقرير الضرائب', path: '/accounting/tax-report' },
  { title: 'حركات المستخدمين', path: '/users/audit' },
  { title: 'تقرير رواتب الموظفين', path: '/employees/salary-report' },
  { title: 'تقرير مسحوبات الموظفين', path: '/employees/withdrawals' },
  { title: 'تقرير حسابات العملاء', path: '/customers/customer-balances' },
  { title: 'تقرير حسابات الموردين', path: '/suppliers/supplier-balances' },
  { title: 'تقرير المبيعات', path: '/sales/sales-report' },
  { title: 'الرسم البياني لحركة المبيعات', path: '/sales/sales-chart' },
  { title: 'قائمة المصروفات', path: '/expenses/expense-list' },
  { title: 'تقارير المصروفات', path: '/expenses/expense-report' },
  { title: 'تقرير المشتريات', path: '/purchases/purchase-report' },
  { title: 'الأرباح من العملاء', path: '/financial-statements/profit-customers' },
  { title: 'الأرباح من الأصناف', path: '/financial-statements/profit-items' },
  { title: 'ربط الحسابات بالقوائم المالية', path: '/financial-statements/mapping' },
  { title: 'قائمة الدخل', path: '/financial-statements/income' },
  { title: 'قائمة المركز المالي', path: '/financial-statements/balance-sheet' },
  { title: 'قائمة التدفقات النقدية', path: '/financial-statements/cash-flow' },
];
export default function ReportsPage() {
  return (
    <>
      <PageHead title="التقارير" description="قائمة التقارير والقوائم المالية المتاحة" />
      <section className="panel">
        <nav className="quick-grid">
          {REPORT_LINKS.map((link) => (
            <Link key={link.path} to={link.path}>
              {link.title}
            </Link>
          ))}
        </nav>
      </section>
    </>
  );
}
