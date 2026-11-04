import type { PriceFilters } from "@/features/inventory/public/types/models/PriceFilters";
import type { PriceRowsContext } from "@/features/inventory/types/read-models/PriceRowsContext";

// Frontend read models and display helpers. Authoritative mutations live in server/core.
export function priceRows(workspace: PriceRowsContext, f: PriceFilters) {
  return workspace.products
    .filter(
      (p) => p.active && (!f.group || p.groupId === f.group) && (!f.product || p.id === f.product),
    )
    .flatMap((product) =>
      product.units.map((u, unit) => ({
        key: product.id + ':' + unit,
        productId: product.id,
        code: product.code,
        name: product.name,
        unit,
        unitName: u.name,
        factor: u.factor,
        purchase: u.purchase,
        price: u[f.priceType],
        discount: product.maxDiscount,
      })),
    );
}
