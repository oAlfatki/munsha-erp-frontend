import { PurchaseInvoices } from "@/features/purchases/public/PurchaseInvoices";
import { SalesInvoices } from "@/features/sales/public/SalesInvoices";
import { useDocumentQuery } from '@/features/trade/queries/useDocumentQuery';
import { useParams } from 'react-router-dom';
export default function InvoiceDetailsPage(){const {documentId=''}=useParams();const {data}=useDocumentQuery(documentId);return data.kind==='purchase'?<PurchaseInvoices/>:<SalesInvoices/>;}
