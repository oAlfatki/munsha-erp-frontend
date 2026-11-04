import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { booksQuery } from "@/features/accounting/public/books-query";
import { customersQuery } from "@/features/customers/public/customers-query";
import type { CustomersProjectionReadModel } from '@/features/customers/types/read-models/CustomersProjectionReadModel';
import { useSuspenseQueries,useSuspenseQuery } from '@tanstack/react-query';
export function useCustomersProjectionQuery(){const app=useApplication(),identity=useQueryIdentity();const {data:books}=useSuspenseQuery(booksQuery(identity));const scope={...identity,bookId:books.scope.bookId};const [q0]=useSuspenseQueries({queries:[customersQuery(scope)]});const state:CustomersProjectionReadModel={parties:[...q0.data.items]};return {...app,state,loading:false,error:'',revision:Math.max(books.scope.revision,q0.data.scope.revision)};}
