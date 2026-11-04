import { ROUTES } from '@/core/config/navigation-paths';





import { useCatalogControllerQuery } from '@/features/inventory/queries/useCatalogControllerQuery';
import type { Product } from "@/features/inventory/public/types/models/Product";
import { useEffect,useState } from 'react';
export function useCatalogController() {
  const { state: s, view, navigate } = useCatalogControllerQuery();
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Product | null | undefined>(undefined);
  useEffect(() => {
    if (view === ROUTES.INVENTORY_ITEMS_NEW) setEditing(null);
  }, [view]);
  if (!s) return null;
  const items = s.products.filter((product) =>
    (product.name + product.code + product.units.map((u) => u.barcode).join(' ')).includes(search),
  );
  const close = () => {
    setEditing(undefined);
    if (view === ROUTES.INVENTORY_ITEMS_NEW) navigate(ROUTES.INVENTORY_ITEMS);
  };
  return { s, search, setSearch, editing, setEditing, items, close };
}
