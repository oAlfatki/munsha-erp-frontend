import { ROUTES } from '@/core/config/navigation-paths';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { Link } from 'react-router-dom';

const REPORT_LINKS = [
  { title: 'تقرير تكلفة المخزون', path: ROUTES.INVENTORY_COST },
  { title: 'أصناف بلغت حد الطلب', path: ROUTES.INVENTORY_REORDER },
  { title: 'الأصناف الراكدة', path: ROUTES.INVENTORY_STAGNANT },
  { title: 'فواتير التحويل بين المخازن', path: ROUTES.INVENTORY_TRANSFERS },
  { title: 'تقرير أصناف بداية المدة', path: ROUTES.INVENTORY_OPENING_STOCK_REPORT },
  { title: 'قائمة تسويات المخزون', path: ROUTES.INVENTORY_ADJUSTMENTS },
  { title: 'مراجعة تكلفة الصنف التاريخية', path: ROUTES.INVENTORY_HISTORICAL_COST },
  { title: 'بحث سندات الصرف والقبض', path: ROUTES.ACCOUNTING_VOUCHERS },
  { title: 'حركة الصندوق', path: ROUTES.ACCOUNTING_CASH_MOVEMENT },
  { title: 'تقرير الأرصدة الافتتاحية', path: ROUTES.ACCOUNTING_OPENING_REPORT },
  { title: 'تقرير الأصول والإهلاك', path: ROUTES.ACCOUNTING_ASSET_REPORT },
  { title: 'مراجعة أرصدة العملات', path: ROUTES.ACCOUNTING_FX },
  { title: 'تقرير الضرائب', path: ROUTES.ACCOUNTING_TAX_REPORT },
  { title: 'حركات المستخدمين', path: ROUTES.USERS_AUDIT },
  { title: 'تقرير رواتب الموظفين', path: ROUTES.EMPLOYEES_SALARY_REPORT },
  { title: 'تقرير مسحوبات الموظفين', path: ROUTES.EMPLOYEES_WITHDRAWALS },
  { title: 'تقرير حسابات العملاء', path: ROUTES.CUSTOMERS_CUSTOMER_BALANCES },
  { title: 'تقرير حسابات الموردين', path: ROUTES.SUPPLIERS_SUPPLIER_BALANCES },
  { title: 'تقرير المبيعات', path: ROUTES.SALES_SALES_REPORT },
  { title: 'الرسم البياني لحركة المبيعات', path: ROUTES.SALES_SALES_CHART },
  { title: 'قائمة المصروفات', path: ROUTES.EXPENSES_EXPENSE_LIST },
  { title: 'تقارير المصروفات', path: ROUTES.EXPENSES_EXPENSE_REPORT },
  { title: 'تقرير المشتريات', path: ROUTES.PURCHASES_PURCHASE_REPORT },
  { title: 'الأرباح من العملاء', path: ROUTES.FINANCIAL_STATEMENTS_PROFIT_CUSTOMERS },
  { title: 'الأرباح من الأصناف', path: ROUTES.FINANCIAL_STATEMENTS_PROFIT_ITEMS },
  { title: 'ربط الحسابات بالقوائم المالية', path: ROUTES.FINANCIAL_STATEMENTS_MAPPING },
  { title: 'قائمة الدخل', path: ROUTES.FINANCIAL_STATEMENTS_INCOME },
  { title: 'قائمة المركز المالي', path: ROUTES.FINANCIAL_STATEMENTS_BALANCE_SHEET },
  { title: 'قائمة التدفقات النقدية', path: ROUTES.FINANCIAL_STATEMENTS_CASH_FLOW },
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
