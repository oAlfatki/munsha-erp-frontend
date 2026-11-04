import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { booksQuery } from "@/features/accounting/public/books-query";
import { branchesQuery } from "@/features/settings/public/branches-query";
import type { BranchDirectoryReadModel } from '@/features/settings/types/read-models/BranchDirectoryReadModel';
import { useSuspenseQueries,useSuspenseQuery } from '@tanstack/react-query';
export function useBranchDirectoryQuery(){const app=useApplication(),identity=useQueryIdentity();const {data:books}=useSuspenseQuery(booksQuery(identity));const scope={...identity,bookId:books.scope.bookId};const [q0]=useSuspenseQueries({queries:[branchesQuery(scope)]});const state:BranchDirectoryReadModel={branches:q0.data.items};return {...app,state,loading:false,error:'',revision:Math.max(books.scope.revision,q0.data.scope.revision)};}
