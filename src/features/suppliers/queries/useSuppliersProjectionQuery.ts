import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { booksQuery } from "@/features/accounting/public/books-query";
import { suppliersQuery } from "@/features/suppliers/public/suppliers-query";
import type { SuppliersProjectionReadModel } from '@/features/suppliers/types/read-models/SuppliersProjectionReadModel';
import { useSuspenseQueries,useSuspenseQuery } from '@tanstack/react-query';
export function useSuppliersProjectionQuery(){const app=useApplication(),identity=useQueryIdentity();const {data:books}=useSuspenseQuery(booksQuery(identity));const scope={...identity,bookId:books.scope.bookId};const [q0]=useSuspenseQueries({queries:[suppliersQuery(scope)]});const state:SuppliersProjectionReadModel={parties:[...q0.data.items]};return {...app,state,loading:false,error:'',revision:Math.max(books.scope.revision,q0.data.scope.revision)};}
