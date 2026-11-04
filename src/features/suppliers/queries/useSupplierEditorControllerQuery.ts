import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { mapMasterRecords } from "@/features/accounting/public/master-records";
import { booksQuery } from "@/features/accounting/public/books-query";
import { currenciesQuery } from "@/features/accounting/public/currencies-query";
import { warehousesQuery } from "@/features/inventory/public/warehouses-query";
import { partyGroupsQuery } from "@/features/parties/public/partyGroups-query";
import { branchesQuery } from "@/features/settings/public/branches-query";
import { companyQuery } from "@/features/settings/public/company-query";
import { systemQuery } from "@/features/settings/public/system-query";
import type { SupplierEditorControllerReadModel } from '@/features/suppliers/types/read-models/SupplierEditorControllerReadModel';
import { useSuspenseQueries,useSuspenseQuery } from '@tanstack/react-query';
export function useSupplierEditorControllerQuery(){const app=useApplication(),identity=useQueryIdentity();const {data:books}=useSuspenseQuery(booksQuery(identity));const scope={...identity,bookId:books.scope.bookId};const [q0,q1,q2,q3,q4,q5]=useSuspenseQueries({queries:[warehousesQuery(scope),branchesQuery(scope),systemQuery(scope),companyQuery(scope),currenciesQuery(scope),partyGroupsQuery(scope)]});const state:SupplierEditorControllerReadModel={warehouses:q0.data.items,branches:q1.data.items,systemSettings:q2.data,organization:q3.data,extras:{records:{groups:[...mapMasterRecords(q5.data.items)]},operations:[],drafts:{},preferences:{defaultProfit:String(q2.data.inventory.profit),defaultDiscount:String(q2.data.inventory.discount),defaultPrice:q2.data.sales.defaultPrice}},currencies:q4.data.items};return {...app,state,loading:false,error:'',revision:Math.max(books.scope.revision,q0.data.scope.revision,q1.data.scope.revision,0,0,q4.data.scope.revision,q5.data.scope.revision)};}
