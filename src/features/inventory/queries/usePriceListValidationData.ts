import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { booksQuery } from "@/features/accounting/public/books-query";
import { itemsQuery } from "@/features/inventory/public/items-query";
import { movementsQuery } from "@/features/inventory/public/movements-query";
import { stocksQuery } from "@/features/inventory/public/stocks-query";
import { warehousesQuery } from "@/features/inventory/public/warehouses-query";
import type { PriceListValidationReadModel } from '@/features/inventory/types/read-models/PriceListValidationReadModel';
import { purchaseInvoicesQuery } from "@/features/purchases/public/purchaseInvoices-query";
import { saleInvoicesQuery } from "@/features/sales/public/saleInvoices-query";
import { branchesQuery } from "@/features/settings/public/branches-query";
import { companyQuery } from "@/features/settings/public/company-query";
import { useQueryClient } from '@tanstack/react-query';
export function usePriceListValidationData(){const app=useApplication(),identity=useQueryIdentity(),client=useQueryClient();return async()=>{const books=await client.ensureQueryData(booksQuery(identity));const scope={...identity,bookId:books.scope.bookId};const [d0,d1,d4,d5,d6,d7,d8,d9]=await Promise.all([client.ensureQueryData(companyQuery(scope)),client.ensureQueryData(warehousesQuery(scope)),client.ensureQueryData(itemsQuery(scope)),client.ensureQueryData(movementsQuery(scope)),client.ensureQueryData(stocksQuery(scope)),client.ensureQueryData(branchesQuery(scope)),client.ensureQueryData(saleInvoicesQuery(scope)),client.ensureQueryData(purchaseInvoicesQuery(scope))]);const q0={data:d0};const q1={data:d1};const q4={data:d4};const q5={data:d5};const q6={data:d6};const q7={data:d7};const q8={data:d8};const q9={data:d9};const state:PriceListValidationReadModel={ organization: q0.data, annualBooks: { activeId: books.scope.bookId, books: books.items }, invoices: [...q8.data.items, ...q9.data.items], warehouses: q1.data.items, products: q4.data.items, movements: q5.data.items, stocks: q6.data.items, branches: q7.data.items };return state;};}
