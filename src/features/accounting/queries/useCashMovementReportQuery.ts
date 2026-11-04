import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { mapMasterRecords } from "@/features/accounting/public/master-records";
import { booksQuery } from "@/features/accounting/public/books-query";
import { cashQuery } from "@/features/accounting/public/cash-query";
import { journalsQuery } from "@/features/accounting/public/journals-query";
import type { CashMovementReportReadModel } from '@/features/accounting/types/read-models/CashMovementReportReadModel';
import { branchesQuery } from "@/features/settings/public/branches-query";
import { companyQuery } from "@/features/settings/public/company-query";
import { useSuspenseQueries,useSuspenseQuery } from '@tanstack/react-query';
export function useCashMovementReportQuery(){const app=useApplication(),identity=useQueryIdentity();const {data:books}=useSuspenseQuery(booksQuery(identity));const scope={...identity,bookId:books.scope.bookId};const [q0,q1,q2,q3]=useSuspenseQueries({queries:[journalsQuery(scope),companyQuery(scope),branchesQuery(scope),cashQuery(scope)]});const state:CashMovementReportReadModel={entries:q0.data.items,organization:q1.data,extras:{records:{"cash":mapMasterRecords(q3.data.items)},operations:[],drafts:{},preferences:{}},branches:q2.data.items};return {...app,state,loading:false,error:'',revision:Math.max(books.scope.revision,q0.data.scope.revision,0,q2.data.scope.revision,q3.data.scope.revision)};}
