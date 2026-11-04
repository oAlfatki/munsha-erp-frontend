import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { booksQuery } from "@/features/accounting/public/books-query";
import type { PeriodSwitchValidationReadModel } from '@/features/accounting/types/read-models/PeriodSwitchValidationReadModel';
import { companyQuery } from "@/features/settings/public/company-query";
import { useQueryClient } from '@tanstack/react-query';
export function usePeriodSwitchValidationData(){const app=useApplication(),identity=useQueryIdentity(),client=useQueryClient();return async()=>{const books=await client.ensureQueryData(booksQuery(identity));const scope={...identity,bookId:books.scope.bookId};const [d0]=await Promise.all([client.ensureQueryData(companyQuery(scope))]);const q0={data:d0};const state:PeriodSwitchValidationReadModel={ organization: q0.data, annualBooks: { activeId: books.scope.bookId, books: books.items } };return state;};}
