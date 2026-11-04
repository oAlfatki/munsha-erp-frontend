import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { booksQuery } from "@/features/accounting/public/books-query";
import { purchaseInvoicesQuery } from "@/features/purchases/public/purchaseInvoices-query";
import { saleInvoicesQuery } from "@/features/sales/public/saleInvoices-query";
import { companyQuery } from "@/features/settings/public/company-query";
import { systemQuery } from "@/features/settings/public/system-query";
import type { DeleteDraftValidationReadModel } from '@/features/trade/types/read-models/DeleteDraftValidationReadModel';
import { useQueryClient } from '@tanstack/react-query';
export function useDeleteDraftValidationData(){const app=useApplication(),identity=useQueryIdentity(),client=useQueryClient();return async()=>{const books=await client.ensureQueryData(booksQuery(identity));const scope={...identity,bookId:books.scope.bookId};const [d0,d3,d4,d5]=await Promise.all([client.ensureQueryData(companyQuery(scope)),client.ensureQueryData(systemQuery(scope)),client.ensureQueryData(saleInvoicesQuery(scope)),client.ensureQueryData(purchaseInvoicesQuery(scope))]);const q0={data:d0};const q3={data:d3};const q4={data:d4};const q5={data:d5};const state:DeleteDraftValidationReadModel={ organization: q0.data, annualBooks: { activeId: books.scope.bookId, books: books.items }, invoices: [...q4.data.items, ...q5.data.items], systemSettings: q3.data, extras: { records: {}, operations: [], drafts: {}, preferences: { defaultProfit: String(q3.data.inventory.profit), defaultDiscount: String(q3.data.inventory.discount), defaultPrice: q3.data.sales.defaultPrice } } };return state;};}
