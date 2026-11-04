import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { mapMasterRecords } from "@/features/accounting/public/master-records";
import { booksQuery } from "@/features/accounting/public/books-query";
import { journalsQuery } from "@/features/accounting/public/journals-query";
import { employeesQuery } from "@/features/employees/public/employees-query";
import { saleInvoicesQuery } from "@/features/sales/public/saleInvoices-query";
import { saleReturnsQuery } from "@/features/sales/public/saleReturns-query";
import { salesTargetsQuery } from "@/features/sales/public/salesTargets-query";
import type { SalesTargetsControllerReadModel } from '@/features/sales/types/read-models/SalesTargetsControllerReadModel';
import { companyQuery } from "@/features/settings/public/company-query";
import { useSuspenseQueries,useSuspenseQuery } from '@tanstack/react-query';
export function useSalesTargetsControllerQuery(){const app=useApplication(),identity=useQueryIdentity();const {data:books}=useSuspenseQuery(booksQuery(identity));const scope={...identity,bookId:books.scope.bookId};const [q0,q1,q2,q3,q4,q5]=useSuspenseQueries({queries:[companyQuery(scope),employeesQuery(scope),journalsQuery(scope),saleInvoicesQuery(scope),saleReturnsQuery(scope),salesTargetsQuery(scope)]});const state:SalesTargetsControllerReadModel={organization:q0.data,employees:q1.data.items,extras:{records:{"salesTargets":mapMasterRecords(q5.data.items)},operations:[],drafts:{},preferences:{}},invoices:[...q3.data.items],entries:q2.data.items,invoiceReturns:[...q4.data.items]};return {...app,state,loading:false,error:'',revision:Math.max(books.scope.revision,0,q1.data.scope.revision,q2.data.scope.revision,q3.data.scope.revision,q4.data.scope.revision,q5.data.scope.revision)};}
