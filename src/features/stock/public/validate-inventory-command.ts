import {
  productSchema,
  transferSchema,
  warehouseSchema,
} from '@/features/stock/public/inventory-schema';
import type { ValidateInventoryCommandContext } from '@/features/stock/public/types/read-models/ValidateInventoryCommandContext';
/** Read-only checks, matching the original product/transfer/warehouse business rules. */
export function validateInventoryCommand(
  data: ValidateInventoryCommandContext,
  type: string,
  input: unknown,
) {
  if (type === 'product') {
    const p = productSchema.parse(input);
    if (p.units.length !== p.category || p.units.at(-1)!.factor !== 1)
      throw Error('الوحدة الأصغر معاملها 1 وعدد الوحدات يطابق الفئة');
    for (let i = 0; i < p.units.length - 1; i++)
      if (
        p.units[i].factor <= p.units[i + 1].factor ||
        !Number.isInteger(p.units[i].factor / p.units[i + 1].factor)
      )
        throw Error('معاملات التحويل يجب أن تكون مضاعفات صحيحة من الأكبر إلى الأصغر');
    const old = data.products.find((item) => item.id === p.id);
    if (
      old &&
      data.movements.some((item) => item.productId === old.id) &&
      JSON.stringify(old.units.map((unit) => unit.factor)) !==
        JSON.stringify(p.units.map((unit) => unit.factor))
    )
      throw Error('لا يمكن تغيير تحويلات صنف له حركات');
    const barcodes = p.units.map((unit) => unit.barcode).filter(Boolean);
    if (new Set(barcodes).size !== barcodes.length)
      throw Error('الباركود يجب أن يكون مختلفًا لكل وحدة في الصنف');
    if (
      barcodes.some((barcode) =>
        data.products.some(
          (item) => item.id !== p.id && item.units.some((unit) => unit.barcode === barcode),
        ),
      )
    )
      throw Error('الباركود مستخدم لصنف آخر');
  }
  if (type === 'transfer') {
    const p = transferSchema.parse(input);
    if (p.from === p.to) throw Error('اختر مخزنين مختلفين');
    if (
      !data.warehouses.some((item) => item.id === p.from && item.active) ||
      !data.warehouses.some((item) => item.id === p.to && item.active)
    )
      throw Error('مخزن غير متاح');
    if (
      (data.stocks.find((item) => item.productId === p.productId && item.warehouseId === p.from)
        ?.qty || 0) < p.qty
    )
      throw Error('المخزون أو قيمته غير كافيين لهذه العملية');
  }
  if (type === 'warehouse') {
    const p = warehouseSchema.parse(input);
    if (!data.branches.some((branch) => branch.id === p.branchId && branch.active))
      throw Error('فرع غير موجود أو غير فعال');
    const old = data.warehouses.find((item) => item.id === p.id);
    if (p.id && !old) throw Error('المخزن غير موجود');
    if (
      old &&
      old.branchId !== p.branchId &&
      (data.movements.some((item) => item.warehouseId === old.id) ||
        data.invoices.some((item) => item.warehouseId === old.id))
    )
      throw Error('مخزن له حركات لا ينقل لفرع آخر');
    if (!p.active && data.stocks.some((item) => item.warehouseId === p.id && item.qty > 0))
      throw Error('المخزن به أرصدة؛ صفّرها بمستند قبل التعطيل');
  }
}
