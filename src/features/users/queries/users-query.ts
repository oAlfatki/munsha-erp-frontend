import { ApiError } from '@/core/api/apiError';
import { useAuth } from '@/core/auth/AuthProvider';
import { usersApi } from '@/features/users/api/users-api';
import type { UsersFilters } from '@/features/users/types/UsersFilters';
import { useQuery } from '@tanstack/react-query';

export function useUsersQuery(params: UsersFilters) {

  const auth = useAuth();
  return useQuery({
    queryKey: ['users', auth.user?.userId, auth.user?.branchId, 'list', params],

    queryFn: async ({ signal }) => {

      const result = await usersApi.list(params, signal);
      if (result.items.some((u) => String(u.branchId) !== auth.user?.branchId))
        throw new ApiError({ detail: 'تتضمن الاستجابة بيانات خارج الفرع المسموح.' }, 403);
      return result;
    },

    enabled: auth.can('USERS', 'USERS_VIEW'),
    retry: false,
  });
}

export function useUserQuery(id: number) {

  const auth = useAuth();
  return useQuery({
    queryKey: ['users', auth.user?.userId, auth.user?.branchId, 'detail', id],

    queryFn: async ({ signal }) => {

      const result = await usersApi.detail(id, signal);
      if (String(result.branchId) !== auth.user?.branchId)
        throw new ApiError({ detail: 'لا يمكن عرض مستخدم من فرع غير مصرح به.' }, 403);
      return result;
    },

    enabled: Number.isSafeInteger(id) && id > 0 && auth.can('USERS', 'USERS_VIEW'),
    retry: false,
  });
}
