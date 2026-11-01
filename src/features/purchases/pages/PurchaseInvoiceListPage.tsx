import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { PurchaseInvoices } from '@/features/purchases/components/PurchaseInvoices';
import { usePurchasesData } from '@/features/purchases/hooks/usePurchasesData';
export default function PurchaseInvoiceListPage() {
  const featureData = usePurchasesData();

  return <FeatureDataScope data={featureData}>{<PurchaseInvoices />}</FeatureDataScope>;
}
