import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { booksQuery } from "@/features/accounting/public/books-query";
import { itemsQuery } from "@/features/inventory/public/items-query";
import type { CatalogControllerReadModel } from '@/features/inventory/types/read-models/CatalogControllerReadModel';
import { useSuspenseQueries,useSuspenseQuery } from '@tanstack/react-query';
export function useCatalogControllerQuery(){const app=useApplication(),identity=useQueryIdentity();const {data:books}=useSuspenseQuery(booksQuery(identity));const scope={...identity,bookId:books.scope.bookId};const [q0]=useSuspenseQueries({queries:[itemsQuery(scope)]});const state:CatalogControllerReadModel={products:q0.data.items,extras:{records:{},operations:[],drafts:{},preferences:{}}};return {...app,state,loading:false,error:'',revision:Math.max(books.scope.revision,q0.data.scope.revision)};}
