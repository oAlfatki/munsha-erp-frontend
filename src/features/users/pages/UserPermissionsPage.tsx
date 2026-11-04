import { AccessRules } from '@/features/users/components/AccessRules';
import { PageHead } from '@/shared/ui/layout/PageHead';
export default function UserPermissionsPage(){return <><PageHead title="صلاحيات الحسابات" description="الصلاحيات المعتمدة لكل نوع من حسابات النظام."/><AccessRules/></>;}
