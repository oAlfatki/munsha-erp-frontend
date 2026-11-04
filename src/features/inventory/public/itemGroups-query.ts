import { readAllPages } from "@/core/api/readAllPages";
import type { QueryScope } from "@/core/types/QueryScope";
import { fetchInventoryItemGroups } from "@/features/inventory/public/read-api";
import { queryOptions } from '@tanstack/react-query';
/** Authorized-book collection used by existing multi-branch calculations/export. Server authorizes accessible branches. */
export function itemGroupsQuery(scope:QueryScope){return queryOptions({queryKey:['erp','inventory','itemGroups',scope.userId,scope.userKind,scope.bookId,'',scope.locale],queryFn:({signal})=>readAllPages(params=>fetchInventoryItemGroups(params,signal),{bookId:scope.bookId||undefined},signal),staleTime:30000});}
