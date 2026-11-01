import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { SalaryPaymentScreen } from '@/features/employees/components/screens/SalaryPaymentScreen';
import { useEmployeesData } from '@/features/employees/hooks/useEmployeesData';
/** صرف رواتب الموظفين — feature-owned route content. */
export default function SalaryPaymentPage() {
  const featureData = useEmployeesData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="employees~salary-payment">
          <SalaryPaymentScreen />
        </section>
      }
    </FeatureDataScope>
  );
}
