import { money } from "@/core/utils/money";
import type { InvoiceLine } from "@/features/trade/public/types/models/InvoiceLine";
export const lineTotal = (
  l: Pick<InvoiceLine, 'qty' | 'price' | 'discount'> & { invoiceDiscount?: number },
) => money(money(l.qty * l.price * (1 - l.discount / 100)) - (l.invoiceDiscount || 0));
