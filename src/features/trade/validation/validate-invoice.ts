import { money } from '@/core/utils/money';
import { balance } from '@/features/ledger/public/account-balances';
import { systemSettings } from '@/features/organization/public/system-settings';
import { invoiceSummary } from '@/features/trade/public/presentation';
import { invoiceSchema } from '@/features/trade/public/trade-schema';
import type { ValidateInvoiceContext } from '@/features/trade/types/read-models/ValidateInvoiceContext';
export function validateInvoice(data: ValidateInvoiceContext, input: unknown) {
  const p = invoiceSchema.parse(input),
    settings = systemSettings(data);
  if (
    !data.warehouses.some(
      (warehouse) =>
        warehouse.id === p.warehouseId && warehouse.branchId === p.branchId && warehouse.active,
    )
  )
    throw Error('المخزن لا يتبع الفرع المحدد');
  if (!data.currencies.some((currency) => currency.code === p.currency))
    throw Error('العملة غير معرفة');
  if (p.currency === data.organization.currency && p.rate !== 1)
    throw Error('سعر صرف العملة الأساسية يجب أن يكون 1');
  const old = data.invoices.find((invoice) => invoice.id === p.id);
  if (p.id && !old) throw Error('المستند غير موجود');
  if (old && old.status !== 'draft') throw Error('لا يسمح بتعديل مستند نهائي');
  const party = data.parties.find(
    (party) =>
      party.id === p.partyId &&
      party.active &&
      party.kind === (p.kind === 'sale' ? 'customer' : 'supplier'),
  );
  if (p.payment !== 'cash' && !party) throw Error('اختر عميلًا أو موردًا نشطًا للفاتورة الآجلة');
  if (p.taxRate && !settings.accounting.taxEnabled)
    throw Error('الضرائب غير مفعلة في إعدادات المحاسبة');
  const lines = p.lines.map((line) => ({ ...line, cost: 0 }));
  const doc = invoiceSummary(lines, p.payment, p.paid || 0, p.taxRate || 0, p.invoiceDiscount);
  if (p.payment === 'mixed' && !(doc.paid > 0 && doc.paid < doc.net))
    throw Error('أدخل مبلغًا مدفوعًا أكبر من صفر وأقل من إجمالي الفاتورة للدفع المختلط');
  if (p.status !== 'final') return;
  if (!data.organization.policyApproved)
    throw Error('اعتمد سياسة التكلفة التجريبية من الإعدادات أولًا');
  if (money(doc.net * p.rate) <= 0) throw Error('قيمة الفاتورة يجب أن تكون أكبر من صفر');
  if (
    p.kind === 'sale' &&
    p.payment !== 'cash' &&
    party &&
    party.limit > 0 &&
    balance(data, '130', party.id) + money((doc.net - doc.paid) * p.rate) > party.limit
  )
    throw Error('الفاتورة تتجاوز سقف ائتمان العميل');
  if (
    p.kind === 'purchase' &&
    settings.purchases.preventDuplicateSupplierNumber &&
    p.supplierNumber &&
    data.invoices.some(
      (invoice) =>
        invoice.id !== p.id &&
        invoice.kind === 'purchase' &&
        invoice.status === 'final' &&
        invoice.partyId === p.partyId &&
        invoice.supplierNumber === p.supplierNumber,
    )
  )
    throw Error('رقم فاتورة المورد مكرر');
  if (
    data.movements.some(
      (movement) =>
        movement.warehouseId === p.warehouseId &&
        p.lines.some((line) => line.productId === movement.productId) &&
        movement.date > p.date,
    )
  )
    throw Error('تاريخ الفاتورة يسبق حركة لاحقة للصنف في المخزن؛ لا يعاد احتساب التكلفة بأثر رجعي');
  for (const line of lines) {
    const product = data.products.find(
        (product) => product.id === line.productId && product.active,
      ),
      unit = product?.units[line.unit];
    if (!product || !unit) throw Error('صنف أو وحدة غير متاحة');
    if (p.kind === 'sale' && line.free) throw Error('الزيادة المجانية للشراء فقط');
    if (p.kind === 'sale' && line.discount > product.maxDiscount)
      throw Error('نسبة الخصم تتجاوز الحد المسموح للصنف');
    if (p.kind === 'sale') {
      const stock = data.stocks.find(
        (stock) => stock.productId === product.id && stock.warehouseId === p.warehouseId,
      );
      if ((stock?.qty || 0) < line.qty * unit.factor)
        throw Error('الكمية غير متاحة للصنف: ' + product.name);
    }
  }
}
