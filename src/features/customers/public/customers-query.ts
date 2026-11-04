import { readAllPages } from "@/core/api/readAllPages";
import type { QueryScope } from "@/core/types/QueryScope";
import { fetchCustomers } from "@/features/customers/api/read-api";
import { queryOptions } from '@tanstack/react-query';
/** Authorized-book collection used by existing multi-branch calculations/export. Server authorizes accessible branches. */
export function customersQuery(scope:QueryScope){return queryOptions({queryKey:['erp','customers','customers',scope.userId,scope.userKind,scope.bookId,'',scope.locale],queryFn:({signal})=>readAllPages(params=>fetchCustomers(params,signal),{bookId:scope.bookId||undefined},signal),staleTime:30000});}
