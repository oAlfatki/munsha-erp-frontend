import { ROUTES } from '@/core/config/navigation-paths';

import { useCatalogControllerQuery } from '@/features/inventory/queries/useCatalogControllerQuery';
import type { Product } from '@/features/stock/public/types/models/Product';
import { useEffect, useState } from 'react';
export function useCatalogController(isInitialCreate = false) {
  const { state: s, navigate } = useCatalogControllerQuery();
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Product | null | undefined>(undefined);
  useEffect(() => {
    if (isInitialCreate) setEditing(null);
  }, [isInitialCreate]);
  if (!s) return null;
  const items = s.products.filter((product) =>
    (product.name + product.code + product.units.map((u) => u.barcode).join(' ')).includes(search),
  );
  const close = () => {
    setEditing(undefined);
    if (isInitialCreate) navigate(ROUTES.INVENTORY_ITEMS);
  };
  return { s, search, setSearch, editing, setEditing, items, close };
}
