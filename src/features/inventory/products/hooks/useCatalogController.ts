import { ROUTES } from '@/core/config/navigation-paths';

import { useCatalogControllerQuery } from '@/features/inventory/products/queries/useCatalogControllerQuery';
import type { Product } from '@/features/stock/public';
import { useEffect, useState } from 'react';

export function useCatalogController(isInitialCreate = false) {

  const { state, navigate } = useCatalogControllerQuery();
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Product | null | undefined>(undefined);
  useEffect(() => {
    if (isInitialCreate) setEditing(null);
  }, [isInitialCreate]);
  if (!state) return null;
  const items = state.products.filter((product) =>
    (product.name + product.code + product.units.map((u) => u.barcode).join(' ')).includes(search),
  );

  const close = () => {

    setEditing(undefined);
    if (isInitialCreate) navigate(ROUTES.INVENTORY_ITEMS);
  };

  return { s: state, search, setSearch, editing, setEditing, items, close };
}
