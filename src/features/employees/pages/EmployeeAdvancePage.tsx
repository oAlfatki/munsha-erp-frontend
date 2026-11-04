import { EmployeeAdvanceScreen } from '@/features/employees/components/screens/EmployeeAdvanceScreen';
/** صرف سلفة موظف — feature-owned route content. */
export default function EmployeeAdvancePage() {
  return (
    <section className="screen-page" data-screen="employees~advance">
      <EmployeeAdvanceScreen />
    </section>
  );
}
