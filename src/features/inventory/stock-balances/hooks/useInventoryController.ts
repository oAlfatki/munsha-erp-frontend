import { useValidatedForm } from '@/core/hooks/useValidatedForm';
import { useInventoryControllerQuery } from '@/features/inventory/stock-balances/queries/useInventoryControllerQuery';
import { buildStockBalanceView } from '@/features/inventory/stock-balances/services/build-stock-balance-view';
import { useTransfer } from '@/features/inventory/stock-documents/hooks/useTransfer';
import { systemSettings } from '@/features/organization/public';
import { transferSchema } from '@/features/stock/public';
import { useState } from 'react';
export function useInventoryController(initialTab: 'movements' | 'balances' = 'balances') {
  const { state: s, branchId, busy: isBusy, navigate } = useInventoryControllerQuery();
  const transferMutationRequest = useTransfer(),
    transferForm = useValidatedForm(transferSchema, transferMutationRequest.execute),
    transferMutation = { ...transferMutationRequest, execute: transferForm.submit };
  const [tab, setTab] = useState<string>(initialTab),
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
  const { warehouses, rows, moves } = buildStockBalanceView(
    s,
    branchId,
    searchQuery,
    wh,
    isExcludeZero,
  );
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
