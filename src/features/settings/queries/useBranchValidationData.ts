import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { booksQuery } from "@/features/accounting/public/books-query";
import { companyQuery } from "@/features/settings/public/company-query";
import type { BranchValidationReadModel } from '@/features/settings/types/read-models/BranchValidationReadModel';
import { useQueryClient } from '@tanstack/react-query';
export function useBranchValidationData(){const app=useApplication(),identity=useQueryIdentity(),client=useQueryClient();return async()=>{const books=await client.ensureQueryData(booksQuery(identity));const scope={...identity,bookId:books.scope.bookId};const [d0]=await Promise.all([client.ensureQueryData(companyQuery(scope))]);const q0={data:d0};const state:BranchValidationReadModel={ organization: q0.data, annualBooks: { activeId: books.scope.bookId, books: books.items } };return state;};}
