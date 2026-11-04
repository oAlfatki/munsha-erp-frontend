import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { mapMasterRecords } from "@/features/accounting/public/master-records";
import { accountsQuery } from "@/features/accounting/public/accounts-query";
import { booksQuery } from "@/features/accounting/public/books-query";
import type { JournalScreenControllerReadModel } from '@/features/accounting/types/read-models/JournalScreenControllerReadModel';
import { useSuspenseQueries,useSuspenseQuery } from '@tanstack/react-query';
export function useJournalScreenControllerQuery(){const app=useApplication(),identity=useQueryIdentity();const {data:books}=useSuspenseQuery(booksQuery(identity));const scope={...identity,bookId:books.scope.bookId};const [q0]=useSuspenseQueries({queries:[accountsQuery(scope)]});const state:JournalScreenControllerReadModel={extras:{records:{"accounts":mapMasterRecords(q0.data.items)},operations:[],drafts:{},preferences:{}}};return {...app,state,loading:false,error:'',revision:Math.max(books.scope.revision,q0.data.scope.revision)};}
