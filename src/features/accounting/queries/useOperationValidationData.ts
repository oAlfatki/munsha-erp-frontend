import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { booksQuery } from "@/features/accounting/public/books-query";
import type { OperationValidationReadModel } from '@/features/accounting/types/read-models/OperationValidationReadModel';
import { companyQuery } from "@/features/settings/public/company-query";
import { systemQuery } from "@/features/settings/public/system-query";
import { useQueryClient } from '@tanstack/react-query';
export function useOperationValidationData(){const app=useApplication(),identity=useQueryIdentity(),client=useQueryClient();return async()=>{const books=await client.ensureQueryData(booksQuery(identity));const scope={...identity,bookId:books.scope.bookId};const [d0,d3]=await Promise.all([client.ensureQueryData(companyQuery(scope)),client.ensureQueryData(systemQuery(scope))]);const q0={data:d0};const q3={data:d3};const state:OperationValidationReadModel={ organization: q0.data, annualBooks: { activeId: books.scope.bookId, books: books.items }, systemSettings: q3.data, extras: { records: {}, operations: [], drafts: {}, preferences: { defaultProfit: String(q3.data.inventory.profit), defaultDiscount: String(q3.data.inventory.discount), defaultPrice: q3.data.sales.defaultPrice } } };return state;};}
