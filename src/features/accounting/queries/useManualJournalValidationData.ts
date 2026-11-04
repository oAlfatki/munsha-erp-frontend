import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { booksQuery } from "@/features/accounting/public/books-query";
import type { ManualJournalValidationReadModel } from '@/features/accounting/types/read-models/ManualJournalValidationReadModel';
import { branchesQuery } from "@/features/settings/public/branches-query";
import { companyQuery } from "@/features/settings/public/company-query";
import { useQueryClient } from '@tanstack/react-query';
export function useManualJournalValidationData(){const app=useApplication(),identity=useQueryIdentity(),client=useQueryClient();return async()=>{const books=await client.ensureQueryData(booksQuery(identity));const scope={...identity,bookId:books.scope.bookId};const [d0,d4]=await Promise.all([client.ensureQueryData(companyQuery(scope)),client.ensureQueryData(branchesQuery(scope))]);const q0={data:d0};const q4={data:d4};const state:ManualJournalValidationReadModel={ organization: q0.data, annualBooks: { activeId: books.scope.bookId, books: books.items }, extras: { records: {}, operations: [], drafts: {}, preferences: {} }, branches: q4.data.items };return state;};}
