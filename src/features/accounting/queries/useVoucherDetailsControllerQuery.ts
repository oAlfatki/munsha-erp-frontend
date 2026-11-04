import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { mapMasterRecords } from "@/features/accounting/public/master-records";
import { booksQuery } from "@/features/accounting/public/books-query";
import { cashQuery } from "@/features/accounting/public/cash-query";
import type { VoucherDetailsControllerReadModel } from '@/features/accounting/types/read-models/VoucherDetailsControllerReadModel';
import { customersQuery } from "@/features/customers/public/customers-query";
import { companyQuery } from "@/features/settings/public/company-query";
import { suppliersQuery } from "@/features/suppliers/public/suppliers-query";
import { useSuspenseQueries,useSuspenseQuery } from '@tanstack/react-query';
export function useVoucherDetailsControllerQuery(){const app=useApplication(),identity=useQueryIdentity();const {data:books}=useSuspenseQuery(booksQuery(identity));const scope={...identity,bookId:books.scope.bookId};const [q0,q1,q2,q3]=useSuspenseQueries({queries:[companyQuery(scope),customersQuery(scope),suppliersQuery(scope),cashQuery(scope)]});const state:VoucherDetailsControllerReadModel={parties:[...q1.data.items,...q2.data.items],organization:q0.data,extras:{records:{"cash":mapMasterRecords(q3.data.items)},operations:[],drafts:{},preferences:{}}};return {...app,state,loading:false,error:'',revision:Math.max(books.scope.revision,0,q1.data.scope.revision,q2.data.scope.revision,q3.data.scope.revision)};}
