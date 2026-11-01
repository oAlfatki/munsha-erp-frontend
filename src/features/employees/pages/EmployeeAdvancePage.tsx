import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { EmployeeAdvanceScreen } from '@/features/employees/components/screens/EmployeeAdvanceScreen';
import { useEmployeesData } from '@/features/employees/hooks/useEmployeesData';
/** صرف سلفة موظف — feature-owned route content. */
export default function EmployeeAdvancePage() {
  const featureData = useEmployeesData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="employees~advance">
          <EmployeeAdvanceScreen />
        </section>
      }
    </FeatureDataScope>
  );
}
