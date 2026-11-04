import { readAllPages } from "@/core/api/readAllPages";
import type { QueryScope } from "@/core/types/QueryScope";
import { fetchInventoryUnitCategories } from "@/features/inventory/public/read-api";
import { queryOptions } from '@tanstack/react-query';
/** Authorized-book collection used by existing multi-branch calculations/export. Server authorizes accessible branches. */
export function unitCategoriesQuery(scope:QueryScope){return queryOptions({queryKey:['erp','inventory','unitCategories',scope.userId,scope.userKind,scope.bookId,'',scope.locale],queryFn:({signal})=>readAllPages(params=>fetchInventoryUnitCategories(params,signal),{bookId:scope.bookId||undefined},signal),staleTime:30000});}
