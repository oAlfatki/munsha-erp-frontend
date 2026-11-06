import { today } from '@/core/utils/formatters';
import type { WarehouseTransferDialogProps } from '@/features/inventory/stock-balances/types/props/WarehouseTransferDialogProps';
import { Modal } from '@/shared/ui/dialogs/Modal';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { Form as ValidatedForm } from '@/shared/ui/forms/ValidatedForm';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';

export function WarehouseTransferDialog({ model }: WarehouseTransferDialogProps) {

  const {
    s: state,
    isBusy,
    transferMutation,
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
  } = model;
  return (
    <Modal isOpen={isTransfer} title="تحويل بين المخازن" onClose={() => setTransfer(false)}>
      <ValidatedForm
        onSubmit={async (e) => {
          e.preventDefault();
          if (await transferMutation.execute({ productId: p, from, to, qty, date: today() }))
            setTransfer(false);
        }}
      >
        <div className="form-grid">
          <Field label="الصنف *">
            <Select value={p} onChange={(e) => setP(e.target.value)}>
              {state.products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="من المخزن *">
            <Select value={from} onChange={(e) => setFrom(e.target.value)}>
              {state.warehouses.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="إلى المخزن *">
            <Select value={to} onChange={(e) => setTo(e.target.value)}>
              {state.warehouses.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field
            label={
              'الكمية — ' +
              (state.products.find((product) => product.id === p)?.units.at(-1)?.name ||
                'الوحدة الأساسية')
            }
          >
            <Input
              type="number"
              min="0.0001"
              step="any"
              value={qty}
              onChange={(e) => setQty(+e.target.value)}
              required
            />
          </Field>
        </div>
        <div className="info-note">
          ينقل الكمية بالقيمة الدفترية الحالية. مجموع مخزون المنشأة لا يتغير، ولا ينتج ربح من
          التحويل.
        </div>
        <div className="dialog-actions">
          <Button disabled={isBusy}>حفظ نهائي</Button>
          <Button type="button" variant="outline" onClick={() => setTransfer(false)}>
            تراجع
          </Button>
        </div>
      </ValidatedForm>
    </Modal>
  );
}
