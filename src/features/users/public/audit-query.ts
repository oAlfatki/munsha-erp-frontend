import { readAllPages } from "@/core/api/readAllPages";
import type { QueryScope } from "@/core/types/QueryScope";
import { fetchAuditEvents } from "@/features/users/api/read-api";
import { queryOptions } from '@tanstack/react-query';
/** Authorized-book collection used by existing multi-branch calculations/export. Server authorizes accessible branches. */
export function auditQuery(scope:QueryScope){return queryOptions({queryKey:['erp','users','audit',scope.userId,scope.userKind,scope.bookId,'',scope.locale],queryFn:({signal})=>readAllPages(params=>fetchAuditEvents(params,signal),{bookId:scope.bookId||undefined},signal),staleTime:30000});}
