import { useProduct } from '@/features/inventory/products/hooks/useProduct';
import { useProductEditorControllerQuery } from '@/features/inventory/products/queries/useProductEditorControllerQuery';
import type { ProductEditorProps } from '@/features/inventory/products/types/props/ProductEditorProps';
import { generalSettings, systemSettings } from '@/features/organization/public';
import type { Unit } from '@/features/stock/public';
import { productSchema } from '@/features/stock/public';
import { useValidatedForm } from '@/shared/hooks/useValidatedForm';
import { useState } from 'react';

const BLANK: Unit = { name: 'حبة', factor: 1, purchase: 0, retail: 0, wholesale: 0, barcode: '' };

export function useProductEditorController({ product, onClose: close }: ProductEditorProps) {

  const { busy: isBusy, state: workspace } = useProductEditorControllerQuery();
  const productMutationRequest = useProduct(),
    productForm = useValidatedForm(productSchema, productMutationRequest.execute),
    productMutation = { ...productMutationRequest, execute: productForm.submit };
  const [name, setName] = useState(product?.name || ''),
    [groupId, setGroupId] = useState(product?.groupId || ''),
    [category, setCategory] = useState<1 | 2 | 3>(product?.category || 1),
    [units, setUnits] = useState<Unit[]>(product?.units || [{ ...BLANK }]),
    [ratios, setRatios] = useState<number[]>(
      product?.units.map((u, i, a) => (i < a.length - 1 ? u.factor / a[i + 1].factor : 1)) || [1],
    ),
    [isActive, setActive] = useState(product?.active ?? true),
    [min, setMin] = useState(
      product?.min ?? (workspace ? systemSettings(workspace).inventory.reorder : 0),
    ),
    [isAlert, setAlert] = useState(
      product?.alert ?? (workspace ? systemSettings(workspace).inventory.alert : true),
    ),
    [discount, setDiscount] = useState(
      product?.maxDiscount ?? (workspace ? generalSettings(workspace).discount : 0),
    ),
    [profit, setProfit] = useState(workspace ? generalSettings(workspace).profit : 10),
    [isAuto, setAuto] = useState(true);

  function changeCategory(n: 1 | 2 | 3) {

    setCategory(n);
    setUnits(
      Array.from({ length: n }, (unusedValue, i) => ({
        ...BLANK,
        name: n === 1 ? 'حبة' : i === 0 ? 'كرتون' : i === n - 1 ? 'حبة' : 'درزن',
      })),
    );
    setRatios(Array.from({ length: n }, (unusedValue, i) => (i === n - 1 ? 1 : 12)));
  }

  const factors = units.map((unusedValue, i) =>
    ratios.slice(i, -1).reduce((a, b) => a * (b || 1), 1),
  );

  function price(i: number, key: 'purchase' | 'retail' | 'wholesale', value: number) {

    const next = units.map((u) => ({ ...u }));
    next[i][key] = value;
    if (isAuto) {
      for (let j = i + 1; j < next.length; j++)
        next[j][key] = +(next[j - 1][key] / (ratios[j - 1] || 1)).toFixed(4);
    }
    setUnits(next);
  }

  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault();
    if (
      await productMutation.execute({
        id: product?.id,
        name,
        groupId,
        category,
        units: units.map((u, i) => ({ ...u, factor: factors[i] })),
        active: isActive,
        min,
        alert: isAlert,
        maxDiscount: discount,
      })
    )
      close();
  }

  return {
    isBusy,
    workspace,
    name,
    setName,
    groupId,
    setGroupId,
    category,
    units,
    setUnits,
    ratios,
    setRatios,
    isActive,
    setActive,
    min,
    setMin,
    isAlert,
    setAlert,
    discount,
    setDiscount,
    profit,
    setProfit,
    isAuto,
    setAuto,
    changeCategory,
    factors,
    price,
    handleSubmit,
  };
}
