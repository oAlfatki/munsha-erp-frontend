import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { booksQuery } from "@/features/accounting/public/books-query";
import { currenciesQuery } from "@/features/accounting/public/currencies-query";
import type { CurrencyDocumentsReportReadModel } from '@/features/accounting/types/read-models/CurrencyDocumentsReportReadModel';
import { purchaseInvoicesQuery } from "@/features/purchases/public/purchaseInvoices-query";
import { saleInvoicesQuery } from "@/features/sales/public/saleInvoices-query";
import { branchesQuery } from "@/features/settings/public/branches-query";
import { companyQuery } from "@/features/settings/public/company-query";
import { useSuspenseQueries,useSuspenseQuery } from '@tanstack/react-query';
export function useCurrencyDocumentsReportQuery(){const app=useApplication(),identity=useQueryIdentity();const {data:books}=useSuspenseQuery(booksQuery(identity));const scope={...identity,bookId:books.scope.bookId};const [q0,q1,q2,q3,q4]=useSuspenseQueries({queries:[currenciesQuery(scope),companyQuery(scope),branchesQuery(scope),saleInvoicesQuery(scope),purchaseInvoicesQuery(scope)]});const state:CurrencyDocumentsReportReadModel={currencies:q0.data.items,invoices:[...q3.data.items,...q4.data.items],organization:q1.data,branches:q2.data.items};return {...app,state,loading:false,error:'',revision:Math.max(books.scope.revision,q0.data.scope.revision,0,q2.data.scope.revision,q3.data.scope.revision,q4.data.scope.revision)};}
