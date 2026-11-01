import { useApplication } from '@/app/providers/ApplicationProvider';
import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { PurchaseInvoices } from '@/features/purchases/components/PurchaseInvoices';
import { SalesInvoices } from '@/features/sales/components/SalesInvoices';
import { useTradeData } from '@/features/trade/hooks/useTradeData';
export default function InvoiceDetailsPage() {
  const featureData = useTradeData();

  const { view, state } = { ...useApplication(), ...featureData };
  return (
    <FeatureDataScope data={featureData}>
      {state?.invoices.find(
        (invoice) => invoice.id === decodeURIComponent(view.slice('/documents/'.length)),
      )?.kind === 'purchase' ? (
        <PurchaseInvoices />
      ) : (
        <SalesInvoices />
      )}
    </FeatureDataScope>
  );
}
