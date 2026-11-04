import { useAuth } from '@/core/auth/AuthProvider';
import { usersApi } from '@/features/users/api/users-api';
import { useQuery } from '@tanstack/react-query';
export function useUsersQuery(){const {user}=useAuth();return useQuery({queryKey:['erp','users','directory',user?.userId,user?.kind],queryFn:()=>usersApi.list({page:1,pageSize:200}),enabled:user?.role==='admin'});}
export function useUserQuery(id:string){const {user}=useAuth();return useQuery({queryKey:['erp','users','user',user?.userId,user?.kind,id],queryFn:()=>usersApi.detail({id}),enabled:!!id&&user?.role==='admin'});}
