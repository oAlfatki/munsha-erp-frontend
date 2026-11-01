import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { PayrollScreen } from '@/features/employees/components/screens/PayrollScreen';
import { useEmployeesData } from '@/features/employees/hooks/useEmployeesData';
/** احتساب وإثبات رواتب فترة — feature-owned route content. */
export default function PayrollAccrualPage() {
  const featureData = useEmployeesData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="employees~payroll">
          <PayrollScreen />
        </section>
      }
    </FeatureDataScope>
  );
}
