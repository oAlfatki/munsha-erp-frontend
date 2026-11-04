import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { booksQuery } from "@/features/accounting/public/books-query";
import { itemsQuery } from "@/features/inventory/public/items-query";
import { movementsQuery } from "@/features/inventory/public/movements-query";
import { warehousesQuery } from "@/features/inventory/public/warehouses-query";
import type { ReorderReportReadModel } from '@/features/inventory/types/read-models/ReorderReportReadModel';
import { branchesQuery } from "@/features/settings/public/branches-query";
import { companyQuery } from "@/features/settings/public/company-query";
import { systemQuery } from "@/features/settings/public/system-query";
import { useSuspenseQueries,useSuspenseQuery } from '@tanstack/react-query';
export function useReorderReportQuery(){const app=useApplication(),identity=useQueryIdentity();const {data:books}=useSuspenseQuery(booksQuery(identity));const scope={...identity,bookId:books.scope.bookId};const [q0,q1,q2,q3,q4,q5]=useSuspenseQueries({queries:[warehousesQuery(scope),movementsQuery(scope),itemsQuery(scope),systemQuery(scope),companyQuery(scope),branchesQuery(scope)]});const state:ReorderReportReadModel={warehouses:q0.data.items,movements:q1.data.items,products:q2.data.items,systemSettings:q3.data,organization:q4.data,extras:{records:{},operations:[],drafts:{},preferences:{defaultProfit:String(q3.data.inventory.profit),defaultDiscount:String(q3.data.inventory.discount),defaultPrice:q3.data.sales.defaultPrice}},branches:q5.data.items};return {...app,state,loading:false,error:'',revision:Math.max(books.scope.revision,q0.data.scope.revision,q1.data.scope.revision,q2.data.scope.revision,0,0,q5.data.scope.revision)};}
