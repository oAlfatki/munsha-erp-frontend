import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { booksQuery } from "@/features/accounting/public/books-query";
import { currenciesQuery } from "@/features/accounting/public/currencies-query";
import { customersQuery } from "@/features/customers/public/customers-query";
import { itemsQuery } from "@/features/inventory/public/items-query";
import type { ImportMastersReadModel } from '@/features/settings/types/read-models/ImportMastersReadModel';
import { suppliersQuery } from "@/features/suppliers/public/suppliers-query";
import { useSuspenseQueries,useSuspenseQuery } from '@tanstack/react-query';
export function useImportMastersQuery(){const app=useApplication(),identity=useQueryIdentity();const {data:books}=useSuspenseQuery(booksQuery(identity));const scope={...identity,bookId:books.scope.bookId};const [q0,q1,q2,q3]=useSuspenseQueries({queries:[itemsQuery(scope),currenciesQuery(scope),customersQuery(scope),suppliersQuery(scope)]});const state:ImportMastersReadModel={products:q0.data.items,parties:[...q2.data.items,...q3.data.items],currencies:q1.data.items};return {...app,state,loading:false,error:'',revision:Math.max(books.scope.revision,q0.data.scope.revision,q1.data.scope.revision,q2.data.scope.revision,q3.data.scope.revision)};}
