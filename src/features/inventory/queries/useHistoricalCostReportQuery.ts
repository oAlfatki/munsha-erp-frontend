import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { mapMasterRecords } from "@/features/accounting/public/master-records";
import { assetsQuery } from "@/features/accounting/public/assets-query";
import { booksQuery } from "@/features/accounting/public/books-query";
import { customersQuery } from "@/features/customers/public/customers-query";
import { employeesQuery } from "@/features/employees/public/employees-query";
import { itemsQuery } from "@/features/inventory/public/items-query";
import { movementsQuery } from "@/features/inventory/public/movements-query";
import { warehousesQuery } from "@/features/inventory/public/warehouses-query";
import type { HistoricalCostReportReadModel } from '@/features/inventory/types/read-models/HistoricalCostReportReadModel';
import { branchesQuery } from "@/features/settings/public/branches-query";
import { companyQuery } from "@/features/settings/public/company-query";
import { suppliersQuery } from "@/features/suppliers/public/suppliers-query";
import { useSuspenseQueries,useSuspenseQuery } from '@tanstack/react-query';
export function useHistoricalCostReportQuery(){const app=useApplication(),identity=useQueryIdentity();const {data:books}=useSuspenseQuery(booksQuery(identity));const scope={...identity,bookId:books.scope.bookId};const [q0,q1,q2,q3,q4,q5,q6,q7,q8]=useSuspenseQueries({queries:[warehousesQuery(scope),movementsQuery(scope),employeesQuery(scope),itemsQuery(scope),companyQuery(scope),branchesQuery(scope),customersQuery(scope),suppliersQuery(scope),assetsQuery(scope)]});const state:HistoricalCostReportReadModel={warehouses:q0.data.items,movements:q1.data.items,parties:[...q6.data.items,...q7.data.items],employees:q2.data.items,products:q3.data.items,extras:{records:{"assets":mapMasterRecords(q8.data.items)},operations:[],drafts:{},preferences:{}},organization:q4.data,branches:q5.data.items};return {...app,state,loading:false,error:'',revision:Math.max(books.scope.revision,q0.data.scope.revision,q1.data.scope.revision,q2.data.scope.revision,q3.data.scope.revision,0,q5.data.scope.revision,q6.data.scope.revision,q7.data.scope.revision,q8.data.scope.revision)};}
