import { readAllPages } from "@/core/api/readAllPages";
import type { QueryScope } from "@/core/types/QueryScope";
import { fetchSuppliers } from "@/features/suppliers/api/read-api";
import { queryOptions } from '@tanstack/react-query';
/** Authorized-book collection used by existing multi-branch calculations/export. Server authorizes accessible branches. */
export function suppliersQuery(scope:QueryScope){return queryOptions({queryKey:['erp','suppliers','suppliers',scope.userId,scope.userKind,scope.bookId,'',scope.locale],queryFn:({signal})=>readAllPages(params=>fetchSuppliers(params,signal),{bookId:scope.bookId||undefined},signal),staleTime:30000});}
