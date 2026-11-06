import { extras } from '@/features/ledger/services/extensions';
import { systemSettings } from '@/features/organization/services/system-settings';
import { bookCatalog } from '@/features/ledger/services/annual-books';
import { expenseViews } from '@/features/expenses/services/models/expenses';

/** Test-only translation of the frozen fixture into the existing granular HTTP DTOs. */

export function readResponse(
  state: ReturnType<typeof import('../reference/domain/engine').createSeed>,
  path: string,
  params: Record<string, unknown> = {},
  revision = 0,
): unknown {

  const catalog = bookCatalog(state),
    x = extras(state);
  const scope = {
    bookId: catalog.activeId,
    branchId: String(params.branchId || ''),
    baseCurrency: state.organization.currency,
    revision,
  };
  if (path === '/dashboard') {
    const stocks = state.stocks.filter(
      (stock) =>
        state.warehouses.find((warehouse) => warehouse.id === stock.warehouseId)?.branchId ===
        params.branchId,
    );
    const lowStock = state.products
      .filter(
        (product) =>
          product.active &&
          systemSettings(state).inventory.alert &&
          product.alert &&
          stocks
            .filter((stock) => stock.productId === product.id)
            .reduce((sum, stock) => sum + stock.qty, 0) <= product.min,
      )
      .map((product) => ({
        productId: product.id,
        name: product.name,
        availableQty: stocks
          .filter((stock) => stock.productId === product.id)
          .reduce((sum, stock) => sum + stock.qty, 0),
        reorderLevel: product.min,
        unit: product.units.at(-1)?.name || '',
      }));
    return { lowStock, recentAudit: state.audit.slice(0, 8), scope };
  }
  const objects: Record<string, unknown> = {
    '/settings/company': state.organization,
    '/settings/branding': state.branding || {
      name: state.organization.name,
      tagline: '',
      color: '#17685b',
      logo: '',
    },
    '/settings/system': systemSettings(state),
    '/settings/backup-policy': state.backupSettings || {
      mode: 'off',
      hours: 4,
      time: '20:00',
      folder: 'نسخ المنشأة',
      retention: 20,
    },
  };
  if (path in objects) return objects[path];
  if (path.startsWith('/ui-drafts/')) {
    const key = decodeURIComponent(path.slice('/ui-drafts/'.length));
    return { key, values: key === 'setup' ? x.preferences : x.drafts[key] || {} };
  }

  const operation = (...kinds: string[]) =>
    x.operations.filter((item) => kinds.includes(item.kind));

  const collections: Record<string, unknown[]> = {
    '/branches': state.branches,
    '/accounting/financial-books': catalog.books,
    '/accounting/currencies': state.currencies,
    '/accounting/accounts': x.records.accounts || [],
    '/accounting/cash-accounts': x.records.cash || [],
    '/accounting/assets': x.records.assets || [],
    '/accounting/contacts': x.records.contacts || [],
    '/accounting/journals': state.entries,
    '/accounting/vouchers': state.vouchers || [],
    '/accounting/asset-acquisitions': operation('assetPurchase'),
    '/accounting/depreciation': operation('depreciation'),
    '/customers': state.parties.filter((item) => item.kind === 'customer'),
    '/suppliers': state.parties.filter((item) => item.kind === 'supplier'),
    '/parties/groups': x.records.groups || [],
    '/inventory/items': state.products,
    '/inventory/warehouses': state.warehouses,
    '/inventory/balances': state.stocks,
    '/inventory/movements': state.movements,
    '/inventory/stock-documents': state.stockDocuments || [],
    '/inventory/units': x.records.units || [],
    '/inventory/unit-categories': x.records.categories || [],
    '/inventory/item-groups': x.records.groups || [],
    '/inventory/stock-counts': operation('count', 'adjustment'),
    '/employees': state.employees,
    '/employees/payroll-accruals': operation('payroll'),
    '/employees/salary-payments': operation('salaryPayment'),
    '/employees/advances': operation('advance'),
    '/expenses/types': x.records.expenseTypes || [],
    '/expenses/documents': expenseViews(state),
    '/sales/targets': x.records.salesTargets || [],
    '/sales/invoices': state.invoices.filter((item) => item.kind === 'sale'),
    '/sales/returns': (state.invoiceReturns || []).filter((item) => item.kind === 'sale'),
    '/purchases/invoices': state.invoices.filter((item) => item.kind === 'purchase'),
    '/purchases/returns': (state.invoiceReturns || []).filter((item) => item.kind === 'purchase'),
    '/audit/events': state.audit,
    '/users': [],
    '/auth/sessions': [],
  };
  if (!(path in collections)) throw Error('Unknown fixture HTTP resource: ' + path);
  let items = collections[path];
  if (params.q) {
    const q = String(params.q);
    items = items.filter((item) => JSON.stringify(item).includes(q));
  }
  if (params.groupId)
    items = items.filter((item) => (item as { groupId?: string }).groupId === params.groupId);
  const page = Number(params.page || 1),
    pageSize = Number(params.pageSize || 200),
    totalItems = items.length;
  return {
    items: items.slice((page - 1) * pageSize, page * pageSize),
    pagination: {
      page,
      pageSize,
      totalItems,
      totalPages: Math.max(1, Math.ceil(totalItems / pageSize)),
      hasNextPage: page * pageSize < totalItems,
    },
    scope,
  };
}
