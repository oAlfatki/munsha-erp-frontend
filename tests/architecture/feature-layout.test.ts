import { describe, expect, it } from 'vitest';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { inspectArchitecture } from '../../scripts/check-architecture.mjs';

describe('Feature ownership after extraction', () => {
  it('enforces official feature entry points and rejects dependency cycles', () => {
    expect(inspectArchitecture().errors).toEqual([]);
  });
  it('keeps functional areas and their implementation owners explicit', () => {
    const areas = {
      accounting: [
        'accounts',
        'journals',
        'vouchers',
        'currencies',
        'assets',
        'fiscal-periods',
        'reports',
        'contacts',
        'overview',
      ],
      inventory: [
        'products',
        'warehouses',
        'units',
        'item-groups',
        'stock-balances',
        'stock-documents',
        'closing-stock',
        'reports',
      ],
      sales: ['invoices', 'returns', 'pricing', 'targets', 'reports'],
      purchases: ['invoices', 'returns', 'reports'],
    };
    for (const [feature, domains] of Object.entries(areas)) {
      for (const domain of domains)
        expect(existsSync(`src/features/${feature}/${domain}`), `${feature}/${domain}`).toBe(true);
    }
    for (const feature of [
      'accounting',
      'ledger',
      'inventory',
      'stock',
      'sales',
      'purchases',
      'trade',
      'personnel',
      'master-data',
    ]) {
      expect(readdirSync(`src/features/${feature}/public`), feature).toEqual(['index.ts']);
    }
  });
  it('shares invoice list presentation while retaining separate controllers and editors', () => {
    for (const [feature, name] of [
      ['sales', 'Sales'],
      ['purchases', 'Purchase'],
    ]) {
      const source = readFileSync(
        `src/features/${feature}/invoices/components/${name}Invoices.tsx`,
        'utf8',
      );
      expect(source).toContain('<InvoiceListSummary list={list} />');
      expect(source).toContain(`use${name}InvoicesController`);
      expect(
        existsSync(`src/features/${feature}/invoices/components/${name}InvoiceEditor.tsx`),
      ).toBe(true);
    }
  });
});
