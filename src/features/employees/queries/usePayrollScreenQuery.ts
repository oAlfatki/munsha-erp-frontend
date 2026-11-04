import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { acquisitionsQuery } from "@/features/accounting/public/acquisitions-query";
import { booksQuery } from "@/features/accounting/public/books-query";
import { depreciationQuery } from "@/features/accounting/public/depreciation-query";
import { advancesQuery } from "@/features/employees/public/advances-query";
import { employeesQuery } from "@/features/employees/public/employees-query";
import { payrollQuery } from "@/features/employees/public/payroll-query";
import { salaryPaymentsQuery } from "@/features/employees/public/salaryPayments-query";
import type { PayrollScreenReadModel } from '@/features/employees/types/read-models/PayrollScreenReadModel';
import { mapExpenseReadModel } from "@/features/expenses/public/expense-read-model";
import { expenseDocumentsQuery } from "@/features/expenses/public/expenseDocuments-query";
import { stockCountsQuery } from "@/features/inventory/public/stockCounts-query";
import { branchesQuery } from "@/features/settings/public/branches-query";
import { useSuspenseQueries,useSuspenseQuery } from '@tanstack/react-query';
export function usePayrollScreenQuery(){const app=useApplication(),identity=useQueryIdentity();const {data:books}=useSuspenseQuery(booksQuery(identity));const scope={...identity,bookId:books.scope.bookId};const [q0,q1,q2,q3,q4,q5,q6,q7,q8]=useSuspenseQueries({queries:[employeesQuery(scope),branchesQuery(scope),payrollQuery(scope),salaryPaymentsQuery(scope),advancesQuery(scope),acquisitionsQuery(scope),depreciationQuery(scope),stockCountsQuery(scope),expenseDocumentsQuery(scope)]});const expenseProjection=mapExpenseReadModel(q8.data.items,q8.data.scope);const state:PayrollScreenReadModel={employees:q0.data.items,branches:q1.data.items,extras:{records:{},operations:[...q2.data.items,...q3.data.items,...q4.data.items,...q5.data.items,...q6.data.items,...q7.data.items,...(expenseProjection.extras?.operations||[])],drafts:{},preferences:{}}};return {...app,state,loading:false,error:'',revision:Math.max(books.scope.revision,q0.data.scope.revision,q1.data.scope.revision,q2.data.scope.revision,q3.data.scope.revision,q4.data.scope.revision,q5.data.scope.revision,q6.data.scope.revision,q7.data.scope.revision,q8.data.scope.revision)};}
