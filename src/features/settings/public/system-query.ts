import type { QueryScope } from "@/core/types/QueryScope";
import { fetchSettingsSystem } from "@/features/settings/api/read-api";
import { queryOptions } from '@tanstack/react-query';
/** Authorized-book collection used by existing multi-branch calculations/export. Server authorizes accessible branches. */
export function systemQuery(scope:QueryScope){return queryOptions({queryKey:['erp','settings','system',scope.userId,scope.userKind,scope.bookId,'',scope.locale],queryFn:({signal})=>fetchSettingsSystem({bookId:scope.bookId||undefined},signal),staleTime:30000});}
