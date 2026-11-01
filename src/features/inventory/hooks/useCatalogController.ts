import { useErpContext } from '@/core/hooks/useErpContext';
import type { Product } from '@/features/inventory/types/models/Product';
import { useEffect, useState } from 'react';
export function useCatalogController() {
  const { state: s, view, navigate } = useErpContext();
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Product | null | undefined>(undefined);
  useEffect(() => {
    if (view === '/inventory/items/new') setEditing(null);
  }, [view]);
  if (!s) return null;
  const items = s.products.filter((product) =>
    (product.name + product.code + product.units.map((u) => u.barcode).join(' ')).includes(search),
  );
  const close = () => {
    setEditing(undefined);
    if (view === '/inventory/items/new') navigate('/inventory/items');
  };
  return { s, search, setSearch, editing, setEditing, items, close };
}
