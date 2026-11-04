import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { mapMasterRecords } from "@/features/accounting/public/master-records";
import { accountsQuery } from "@/features/accounting/public/accounts-query";
import { booksQuery } from "@/features/accounting/public/books-query";
import { journalsQuery } from "@/features/accounting/public/journals-query";
import type { AccountingReadModel } from '@/features/accounting/types/read-models/AccountingReadModel';
import { companyQuery } from "@/features/settings/public/company-query";
import { useSuspenseQueries,useSuspenseQuery } from '@tanstack/react-query';
export function useAccountingQuery(){const app=useApplication(),identity=useQueryIdentity();const {data:books}=useSuspenseQuery(booksQuery(identity));const scope={...identity,bookId:books.scope.bookId};const [q0,q1,q2]=useSuspenseQueries({queries:[journalsQuery(scope),companyQuery(scope),accountsQuery(scope)]});const state:AccountingReadModel={entries:q0.data.items,organization:q1.data,extras:{records:{"accounts":mapMasterRecords(q2.data.items)},operations:[],drafts:{},preferences:{}}};return {...app,state,loading:false,error:'',revision:Math.max(books.scope.revision,q0.data.scope.revision,0,q2.data.scope.revision)};}
