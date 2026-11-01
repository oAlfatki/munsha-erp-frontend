import type { ErpReadModel } from '@/core/types/ErpReadModel';
import type { ReadScope } from '@/core/types/ReadScope';
import type { OperationRecord } from '@/features/accounting/types/models/OperationRecord';
import type { ExpenseDocumentResponse } from '@/features/expenses/types/responses/ExpenseDocumentResponse';
/** Preserve existing legacy expense cards when the documented read DTO's extension fields carry them. */
export function mapExpenseReadModel(
  items: ExpenseDocumentResponse[],
  scope: ReadScope,
): Partial<ErpReadModel> {
  const expenses: ErpReadModel['expenses'] = [],
    operations: OperationRecord[] = [];
  const documents: NonNullable<ErpReadModel['expenseDocuments']> = [];
  for (const item of items) {
    if (item.legacy === 'cash') {
      expenses.push({
        id: item.id,
        date: item.date,
        branchId: item.branchId,
        category: item.typeId,
        description: item.description,
        amount: item.amount,
        currency: scope.baseCurrency,
        rate: 1,
      });
    } else if (item.legacy === 'accruedExpense' || item.legacy === 'prepaidExpense') {
      operations.push({
        id: item.id,
        reference: item.reference,
        kind: item.legacy,
        date: item.date,
        branchId: item.branchId,
        subject: item.description,
        note: item.description,
        amount: item.amount,
        paid: Number(item.paid) === item.amount,
      });
      for (const payment of item.payments)
        operations.push({
          id: payment.reference,
          reference: payment.reference,
          kind: 'settleExpense',
          date: payment.date,
          branchId: item.branchId,
          subject: item.description,
          note: '',
          amount: payment.amount,
          source: item.id,
        });
      for (const settlement of item.settlements)
        operations.push({
          id: settlement.reference,
          reference: settlement.reference,
          kind: 'consumePrepaid',
          date: settlement.date,
          branchId: item.branchId,
          subject: item.description,
          note: '',
          amount: settlement.amount,
          period: settlement.period,
          source: item.id,
        });
    } else documents.push(item);
  }
  return {
    expenseDocuments: documents,
    expenses,
    extras: { records: {}, operations, drafts: {}, preferences: {} },
  };
}
