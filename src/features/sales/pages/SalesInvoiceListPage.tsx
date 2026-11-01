import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { SalesInvoices } from '@/features/sales/components/SalesInvoices';
import { useSalesData } from '@/features/sales/hooks/useSalesData';
export default function SalesInvoiceListPage() {
  const featureData = useSalesData();

  return <FeatureDataScope data={featureData}>{<SalesInvoices />}</FeatureDataScope>;
}
