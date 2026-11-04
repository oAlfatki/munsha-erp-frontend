import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { booksQuery } from "@/features/accounting/public/books-query";
import { currenciesQuery } from "@/features/accounting/public/currencies-query";
import { journalsQuery } from "@/features/accounting/public/journals-query";
import { customersQuery } from "@/features/customers/public/customers-query";
import { itemsQuery } from "@/features/inventory/public/items-query";
import { movementsQuery } from "@/features/inventory/public/movements-query";
import { stocksQuery } from "@/features/inventory/public/stocks-query";
import { warehousesQuery } from "@/features/inventory/public/warehouses-query";
import { purchaseInvoicesQuery } from "@/features/purchases/public/purchaseInvoices-query";
import { saleInvoicesQuery } from "@/features/sales/public/saleInvoices-query";
import { companyQuery } from "@/features/settings/public/company-query";
import { systemQuery } from "@/features/settings/public/system-query";
import { suppliersQuery } from "@/features/suppliers/public/suppliers-query";
import type { InvoiceValidationReadModel } from '@/features/trade/types/read-models/InvoiceValidationReadModel';
import { useQueryClient } from '@tanstack/react-query';
export function useInvoiceValidationData(){const app=useApplication(),identity=useQueryIdentity(),client=useQueryClient();return async()=>{const books=await client.ensureQueryData(booksQuery(identity));const scope={...identity,bookId:books.scope.bookId};const [d0,d1,d3,d4,d5,d6,d7,d8,d9,d10,d11,d12]=await Promise.all([client.ensureQueryData(companyQuery(scope)),client.ensureQueryData(warehousesQuery(scope)),client.ensureQueryData(systemQuery(scope)),client.ensureQueryData(currenciesQuery(scope)),client.ensureQueryData(movementsQuery(scope)),client.ensureQueryData(itemsQuery(scope)),client.ensureQueryData(stocksQuery(scope)),client.ensureQueryData(journalsQuery(scope)),client.ensureQueryData(customersQuery(scope)),client.ensureQueryData(suppliersQuery(scope)),client.ensureQueryData(saleInvoicesQuery(scope)),client.ensureQueryData(purchaseInvoicesQuery(scope))]);const q0={data:d0};const q1={data:d1};const q3={data:d3};const q4={data:d4};const q5={data:d5};const q6={data:d6};const q7={data:d7};const q8={data:d8};const q9={data:d9};const q10={data:d10};const q11={data:d11};const q12={data:d12};const state:InvoiceValidationReadModel={ organization: q0.data, annualBooks: { activeId: books.scope.bookId, books: books.items }, invoices: [...q11.data.items, ...q12.data.items], warehouses: q1.data.items, systemSettings: q3.data, extras: { records: {}, operations: [], drafts: {}, preferences: { defaultProfit: String(q3.data.inventory.profit), defaultDiscount: String(q3.data.inventory.discount), defaultPrice: q3.data.sales.defaultPrice } }, currencies: q4.data.items, parties: [...q9.data.items, ...q10.data.items], movements: q5.data.items, products: q6.data.items, stocks: q7.data.items, entries: q8.data.items };return state;};}
