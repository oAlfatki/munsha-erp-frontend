import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { mapMasterRecords } from "@/features/accounting/public/master-records";
import { accountsQuery } from "@/features/accounting/public/accounts-query";
import { booksQuery } from "@/features/accounting/public/books-query";
import { cashQuery } from "@/features/accounting/public/cash-query";
import { contactsQuery } from "@/features/accounting/public/contacts-query";
import { journalsQuery } from "@/features/accounting/public/journals-query";
import type { ContactsLedgerReadModel } from '@/features/accounting/types/read-models/ContactsLedgerReadModel';
import { companyQuery } from "@/features/settings/public/company-query";
import { useSuspenseQueries,useSuspenseQuery } from '@tanstack/react-query';
export function useContactsLedgerQuery(){const app=useApplication(),identity=useQueryIdentity();const {data:books}=useSuspenseQuery(booksQuery(identity));const scope={...identity,bookId:books.scope.bookId};const [q0,q1,q2,q3,q4]=useSuspenseQueries({queries:[companyQuery(scope),journalsQuery(scope),contactsQuery(scope),accountsQuery(scope),cashQuery(scope)]});const state:ContactsLedgerReadModel={organization:q0.data,entries:q1.data.items,extras:{records:{"contacts":mapMasterRecords(q2.data.items),"accounts":mapMasterRecords(q3.data.items),"cash":mapMasterRecords(q4.data.items)},operations:[],drafts:{},preferences:{}}};return {...app,state,loading:false,error:'',revision:Math.max(books.scope.revision,0,q1.data.scope.revision,q2.data.scope.revision,q3.data.scope.revision,q4.data.scope.revision)};}
