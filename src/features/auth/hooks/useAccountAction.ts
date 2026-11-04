import { ROUTES } from '@/core/config/navigation-paths';
import { authApi } from '@/features/auth/api/auth-api';
import type { AccountCommand } from '@/features/auth/types/AccountCommand';
import { useMutation,useQueryClient } from '@tanstack/react-query';
export function useAccountAction(){const client=useQueryClient();return useMutation({mutationFn:(command:AccountCommand)=>{switch(command.operation){case 'logout':return authApi.logout();case 'changePassword':return authApi.changePassword(command.input);case 'revokeSession':return authApi.revokeSession(command.id);case 'revokeOtherSessions':return authApi.revokeOtherSessions();}},onSuccess:async result=>{await client.invalidateQueries({queryKey:['auth','account']});if(result.relogin)window.location.href=ROUTES.LOGIN;}});}
