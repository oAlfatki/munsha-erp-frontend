import { PurchaseInvoices } from '@/features/purchases/public';
import { SalesInvoices } from '@/features/sales/public';
import { useDocumentQuery } from '@/features/trade/public';
import { useParams } from 'react-router-dom';
export default function InvoiceDetailsPage() {
  const { documentId = '' } = useParams();
  const { data } = useDocumentQuery(documentId);
  return data.kind === 'purchase' ? (
    <PurchaseInvoices documentId={documentId} />
  ) : (
    <SalesInvoices documentId={documentId} />
  );
}
