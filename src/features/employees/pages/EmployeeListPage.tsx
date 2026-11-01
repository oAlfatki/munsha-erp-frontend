import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { Employees } from '@/features/employees/components/Employees';
import { useEmployeesData } from '@/features/employees/hooks/useEmployeesData';
export default function EmployeeListPage() {
  const featureData = useEmployeesData();

  return <FeatureDataScope data={featureData}>{<Employees />}</FeatureDataScope>;
}
