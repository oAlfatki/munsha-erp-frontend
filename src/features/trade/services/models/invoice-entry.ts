import type { ItemMatch } from '@/features/trade/types/models/ItemMatch';
import type { InvoiceItemMatchesContext } from '@/features/trade/types/read-models/InvoiceItemMatchesContext';

// Frontend display calculations; backend authority requires independent verification.
import type { InvoiceLine } from '@/features/trade/types/models/InvoiceLine';
export function invoiceItemMatches(
  workspace: InvoiceItemMatchesContext,
  query: string,
  kind: 'sale' | 'purchase',
): ItemMatch[] {
  const text = query.trim().toLocaleLowerCase();
  if (!text) return [];
  const active = workspace.products.filter((product) => product.active);
  const barcode = active.flatMap((product) =>
    product.units.flatMap((u, unit) =>
      u.barcode && u.barcode.toLocaleLowerCase() === text ? [{ product, unit, barcode: true }] : [],
    ),
  );
  if (barcode.length) return barcode;
  return active
    .filter((product) =>
      (product.name + ' ' + product.code + ' ' + product.units.map((u) => u.barcode).join(' '))
        .toLocaleLowerCase()
        .includes(text),
    )
    .slice(0, 8)
    .map((product) => ({
      product,
      unit: kind === 'sale' ? product.units.length - 1 : 0,
      barcode: false,
    }));
}
export function invoiceEntryLine(
  match: ItemMatch,
  kind: 'sale' | 'purchase',
  priceType: 'retail' | 'wholesale',
  rate: number,
): InvoiceLine {
  const u = match.product.units[match.unit];
  return {
    productId: match.product.id,
    unit: match.unit,
    qty: 1,
    free: 0,
    price: +((kind === 'sale' ? u[priceType] : u.purchase) / rate).toFixed(4),
    discount: 0,
    invoiceDiscount: 0,
    cost: 0,
  };
}
