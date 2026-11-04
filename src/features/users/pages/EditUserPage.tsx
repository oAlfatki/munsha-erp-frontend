import { useAuth } from '@/core/auth/AuthProvider';
import { ROUTES } from '@/core/config/navigation-paths';
import { UserEditor } from '@/features/users/components/UserEditor';
import { useUserQuery } from '@/features/users/queries/users-query';
import { LoadingState } from '@/shared/ui/feedback/LoadingState';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { useNavigate,useParams } from 'react-router-dom';
export default function EditUserPage(){const {id=''}=useParams(),navigate=useNavigate(),{user}=useAuth();const query=useUserQuery(id);if(user?.role!=='admin')return <p role="alert">إدارة حسابات المستخدمين متاحة لمسؤول النظام.</p>;if(query.isPending)return <LoadingState/>;if(query.error)return <p role="alert">{query.error.message}</p>;return <><PageHead title="تعديل المستخدم" description="بطاقة المستخدم وحالة الحساب."/><UserEditor key={id} user={query.data} onSaved={()=>navigate(ROUTES.USERS)} onCancel={()=>navigate(ROUTES.USERS)}/></>;}
