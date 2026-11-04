import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { booksQuery } from "@/features/accounting/public/books-query";
import { journalsQuery } from "@/features/accounting/public/journals-query";
import { branchesQuery } from "@/features/settings/public/branches-query";
import { companyQuery } from "@/features/settings/public/company-query";
import { suppliersQuery } from "@/features/suppliers/public/suppliers-query";
import type { SupplierBalancesReportReadModel } from '@/features/suppliers/types/read-models/SupplierBalancesReportReadModel';
import { useSuspenseQueries,useSuspenseQuery } from '@tanstack/react-query';
export function useSupplierBalancesReportQuery(){const app=useApplication(),identity=useQueryIdentity();const {data:books}=useSuspenseQuery(booksQuery(identity));const scope={...identity,bookId:books.scope.bookId};const [q0,q1,q2,q3]=useSuspenseQueries({queries:[journalsQuery(scope),companyQuery(scope),branchesQuery(scope),suppliersQuery(scope)]});const state:SupplierBalancesReportReadModel={entries:q0.data.items,parties:[...q3.data.items],organization:q1.data,branches:q2.data.items};return {...app,state,loading:false,error:'',revision:Math.max(books.scope.revision,q0.data.scope.revision,0,q2.data.scope.revision,q3.data.scope.revision)};}
