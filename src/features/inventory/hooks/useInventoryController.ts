import { ROUTES } from '@/core/config/navigation-paths';





import { useValidatedForm } from '@/core/hooks/useValidatedForm';
import { useTransfer } from '@/features/inventory/hooks/useTransfer';
import { useInventoryControllerQuery } from '@/features/inventory/queries/useInventoryControllerQuery';
import { transferSchema } from "@/features/inventory/public/inventory-schema";
import { systemSettings } from "@/features/settings/public/system-settings";
import { useState } from 'react';
export function useInventoryController() {
  const { state: s, branchId, busy: isBusy, navigate, view } = useInventoryControllerQuery();
  const transferMutationRequest = useTransfer(),
    transferForm = useValidatedForm(transferSchema, transferMutationRequest.execute),
    transferMutation = { ...transferMutationRequest, execute: transferForm.submit };
  const [tab, setTab] = useState(view === ROUTES.INVENTORY_MOVEMENTS ? 'movements' : 'balances'),
    [searchQuery, setQ] = useState(''),
    [wh, setWh] = useState('all'),
    [isShowUnits, setShowUnits] = useState(false),
    [isExcludeZero, setExcludeZero] = useState(s ? !systemSettings(s).inventory.showZero : false),
    [isTransfer, setTransfer] = useState(false),
    [p, setP] = useState(''),
    [from, setFrom] = useState('w1'),
    [to, setTo] = useState('w2'),
    [qty, setQty] = useState(1);
  if (!s) return null;
  const warehouses = s.warehouses.filter((warehouse) => warehouse.branchId === branchId);
  const rows = s.products
    .filter((product) => product.name.includes(searchQuery))
    .map((product) => {
      const st = s.stocks.filter(
        (x) =>
          x.productId === product.id &&
          warehouses.some((warehouse) => warehouse.id === x.warehouseId) &&
          (wh === 'all' || x.warehouseId === wh),
      );
      return {
        p: product,
        qty: st.reduce((n, x) => n + x.qty, 0),
        value: st.reduce((n, x) => n + x.value, 0),
      };
    })
    .filter((r) => !isExcludeZero || Math.abs(r.qty) > 0.0000001 || Math.abs(r.value) > 0.005);
  const moves = s.movements
    .filter(
      (m) =>
        warehouses.some((warehouse) => warehouse.id === m.warehouseId) &&
        (wh === 'all' || m.warehouseId === wh) &&
        (s.products.find((product) => product.id === m.productId)?.name || '').includes(
          searchQuery,
        ),
    )
    .slice()
    .reverse();
  return {
    s,
    branchId,
    isBusy,
    navigate,
    transferMutation,
    tab,
    setTab,
    searchQuery,
    setQ,
    wh,
    setWh,
    isShowUnits,
    setShowUnits,
    isExcludeZero,
    setExcludeZero,
    isTransfer,
    setTransfer,
    p,
    setP,
    from,
    setFrom,
    to,
    setTo,
    qty,
    setQty,
    warehouses,
    rows,
    moves,
  };
}
