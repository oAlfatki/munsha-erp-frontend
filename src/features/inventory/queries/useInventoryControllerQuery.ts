import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { booksQuery } from "@/features/accounting/public/books-query";
import { itemsQuery } from "@/features/inventory/public/items-query";
import { movementsQuery } from "@/features/inventory/public/movements-query";
import { stocksQuery } from "@/features/inventory/public/stocks-query";
import { warehousesQuery } from "@/features/inventory/public/warehouses-query";
import type { InventoryControllerReadModel } from '@/features/inventory/types/read-models/InventoryControllerReadModel';
import { branchesQuery } from "@/features/settings/public/branches-query";
import { companyQuery } from "@/features/settings/public/company-query";
import { systemQuery } from "@/features/settings/public/system-query";
import { useSuspenseQueries,useSuspenseQuery } from '@tanstack/react-query';
export function useInventoryControllerQuery(){const app=useApplication(),identity=useQueryIdentity();const {data:books}=useSuspenseQuery(booksQuery(identity));const scope={...identity,bookId:books.scope.bookId};const [q0,q1,q2,q3,q4,q5,q6]=useSuspenseQueries({queries:[warehousesQuery(scope),itemsQuery(scope),stocksQuery(scope),movementsQuery(scope),systemQuery(scope),companyQuery(scope),branchesQuery(scope)]});const state:InventoryControllerReadModel={warehouses:q0.data.items,products:q1.data.items,stocks:q2.data.items,movements:q3.data.items,systemSettings:q4.data,organization:q5.data,extras:{records:{},operations:[],drafts:{},preferences:{defaultProfit:String(q4.data.inventory.profit),defaultDiscount:String(q4.data.inventory.discount),defaultPrice:q4.data.sales.defaultPrice}},branches:q6.data.items};return {...app,state,loading:false,error:'',revision:Math.max(books.scope.revision,q0.data.scope.revision,q1.data.scope.revision,q2.data.scope.revision,q3.data.scope.revision,0,0,q6.data.scope.revision)};}
