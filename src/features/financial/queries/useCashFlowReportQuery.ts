import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { mapMasterRecords } from "@/features/accounting/public/master-records";
import { accountsQuery } from "@/features/accounting/public/accounts-query";
import { booksQuery } from "@/features/accounting/public/books-query";
import { cashQuery } from "@/features/accounting/public/cash-query";
import { journalsQuery } from "@/features/accounting/public/journals-query";
import type { CashFlowReportReadModel } from '@/features/financial/types/read-models/CashFlowReportReadModel';
import { branchesQuery } from "@/features/settings/public/branches-query";
import { companyQuery } from "@/features/settings/public/company-query";
import { useSuspenseQueries,useSuspenseQuery } from '@tanstack/react-query';
export function useCashFlowReportQuery(){const app=useApplication(),identity=useQueryIdentity();const {data:books}=useSuspenseQuery(booksQuery(identity));const scope={...identity,bookId:books.scope.bookId};const [q0,q1,q2,q3,q4]=useSuspenseQueries({queries:[journalsQuery(scope),companyQuery(scope),branchesQuery(scope),cashQuery(scope),accountsQuery(scope)]});const state:CashFlowReportReadModel={entries:q0.data.items,organization:q1.data,extras:{records:{"cash":mapMasterRecords(q3.data.items),"accounts":mapMasterRecords(q4.data.items)},operations:[],drafts:{},preferences:{}},branches:q2.data.items};return {...app,state,loading:false,error:'',revision:Math.max(books.scope.revision,q0.data.scope.revision,0,q2.data.scope.revision,q3.data.scope.revision,q4.data.scope.revision)};}
