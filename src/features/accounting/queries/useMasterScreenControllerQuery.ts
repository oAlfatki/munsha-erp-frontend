import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { mapMasterRecords } from "@/features/accounting/public/master-records";
import { accountsQuery } from "@/features/accounting/public/accounts-query";
import { assetsQuery } from "@/features/accounting/public/assets-query";
import { booksQuery } from "@/features/accounting/public/books-query";
import { cashQuery } from "@/features/accounting/public/cash-query";
import { contactsQuery } from "@/features/accounting/public/contacts-query";
import type { MasterScreenControllerReadModel } from '@/features/accounting/types/read-models/MasterScreenControllerReadModel';
import { expenseTypesQuery } from "@/features/expenses/public/expenseTypes-query";
import { itemGroupsQuery } from "@/features/inventory/public/itemGroups-query";
import { unitCategoriesQuery } from "@/features/inventory/public/unitCategories-query";
import { unitsQuery } from "@/features/inventory/public/units-query";
import { partyGroupsQuery } from "@/features/parties/public/partyGroups-query";
import { salesTargetsQuery } from "@/features/sales/public/salesTargets-query";
import { branchesQuery } from "@/features/settings/public/branches-query";
import { useSuspenseQueries,useSuspenseQuery } from '@tanstack/react-query';
export function useMasterScreenControllerQuery(){const app=useApplication(),identity=useQueryIdentity();const {data:books}=useSuspenseQuery(booksQuery(identity));const scope={...identity,bookId:books.scope.bookId};const [q0,q1,q2,q3,q4,q5,q6,q7,q8,q9,q10]=useSuspenseQueries({queries:[branchesQuery(scope),accountsQuery(scope),cashQuery(scope),assetsQuery(scope),contactsQuery(scope),unitsQuery(scope),unitCategoriesQuery(scope),expenseTypesQuery(scope),salesTargetsQuery(scope),itemGroupsQuery(scope),partyGroupsQuery(scope)]});const state:MasterScreenControllerReadModel={extras:{records:{"accounts":mapMasterRecords(q1.data.items),"cash":mapMasterRecords(q2.data.items),"assets":mapMasterRecords(q3.data.items),"contacts":mapMasterRecords(q4.data.items),"units":mapMasterRecords(q5.data.items),"categories":mapMasterRecords(q6.data.items),"expenseTypes":mapMasterRecords(q7.data.items),"salesTargets":mapMasterRecords(q8.data.items),groups:[...mapMasterRecords(q10.data.items),...mapMasterRecords(q9.data.items)]},operations:[],drafts:{},preferences:{}},branches:q0.data.items};return {...app,state,loading:false,error:'',revision:Math.max(books.scope.revision,q0.data.scope.revision,q1.data.scope.revision,q2.data.scope.revision,q3.data.scope.revision,q4.data.scope.revision,q5.data.scope.revision,q6.data.scope.revision,q7.data.scope.revision,q8.data.scope.revision,q9.data.scope.revision,q10.data.scope.revision)};}
