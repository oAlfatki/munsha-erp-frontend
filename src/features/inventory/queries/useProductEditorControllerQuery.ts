import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { mapMasterRecords } from "@/features/accounting/public/master-records";
import { booksQuery } from "@/features/accounting/public/books-query";
import { unitsQuery } from "@/features/inventory/public/units-query";
import type { ProductEditorControllerReadModel } from '@/features/inventory/types/read-models/ProductEditorControllerReadModel';
import { companyQuery } from "@/features/settings/public/company-query";
import { systemQuery } from "@/features/settings/public/system-query";
import { useSuspenseQueries,useSuspenseQuery } from '@tanstack/react-query';
export function useProductEditorControllerQuery(){const app=useApplication(),identity=useQueryIdentity();const {data:books}=useSuspenseQuery(booksQuery(identity));const scope={...identity,bookId:books.scope.bookId};const [q0,q1,q2]=useSuspenseQueries({queries:[systemQuery(scope),companyQuery(scope),unitsQuery(scope)]});const state:ProductEditorControllerReadModel={systemSettings:q0.data,organization:q1.data,extras:{records:{"units":mapMasterRecords(q2.data.items)},operations:[],drafts:{},preferences:{defaultProfit:String(q0.data.inventory.profit),defaultDiscount:String(q0.data.inventory.discount),defaultPrice:q0.data.sales.defaultPrice}}};return {...app,state,loading:false,error:'',revision:Math.max(books.scope.revision,0,0,q2.data.scope.revision)};}
