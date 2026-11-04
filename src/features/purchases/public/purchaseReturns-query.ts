import { readAllPages } from "@/core/api/readAllPages";
import type { QueryScope } from "@/core/types/QueryScope";
import { fetchPurchasesReturns } from "@/features/purchases/public/read-api";
import { queryOptions } from '@tanstack/react-query';
/** Authorized-book collection used by existing multi-branch calculations/export. Server authorizes accessible branches. */
export function purchaseReturnsQuery(scope:QueryScope){return queryOptions({queryKey:['erp','purchases','purchaseReturns',scope.userId,scope.userKind,scope.bookId,'',scope.locale],queryFn:({signal})=>readAllPages(params=>fetchPurchasesReturns(params,signal),{bookId:scope.bookId||undefined},signal),staleTime:30000});}
