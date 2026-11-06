import { ApiError } from '@/core/api/apiError';
import { errorMessage } from '@/core/api/error-message';
import { useAuth } from '@/core/auth/AuthProvider';
import { usersApi } from '@/features/users/api/users-api';
import { PermissionMatrix } from '@/features/users/components/PermissionMatrix';
import { fetchPermissionCatalog } from '@/features/users/services/permission-catalog';
import type { PermissionMask } from '@/features/users/types/PermissionMask';
import { assertGrantable } from '@/features/users/validations/permission-grants';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { Button } from '@/shared/ui/primitives/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function UserPermissionsPage() {

  const auth = useAuth(),
    [params] = useSearchParams(),
    client = useQueryClient(),
    id = Number(params.get('userId'));
  const canView = auth.can('USERS', 'USERS_PERMISSIONS_VIEW');
  const catalog = useQuery({
    queryKey: ['permissions', 'catalog', auth.user?.userId],

    queryFn: ({ signal }) => fetchPermissionCatalog(signal),

    enabled: canView,
    retry: false,
  });
  const query = useQuery({
    queryKey: ['users', auth.user?.userId, 'permissions', id],

    queryFn: async ({ signal }) => {

      const response = await usersApi.permissions(id, signal);
      if (response.userId !== id || String(response.branchId) !== auth.user?.branchId)
        throw new ApiError({ detail: 'لا يمكن عرض صلاحيات خارج نطاق الفرع المسموح.' }, 403);
      return response;
    },

    enabled: canView && Number.isSafeInteger(id) && id > 0,
    retry: false,
  });
  const [draftState, setDraftState] = useState<{ id: number; value: PermissionMask[] } | null>(
    null,
  );
  const draft = draftState?.id === id ? draftState.value : null;

  const setDraft = (value: PermissionMask[] | null) => setDraftState(value ? { id, value } : null);

  const mutation = useMutation({
    mutationFn: async () => {

      if (
        !query.data ||
        query.data.userId !== id ||
        String(query.data.branchId) !== auth.user?.branchId ||
        !auth.can('USERS', 'USERS_PERMISSIONS_MANAGE', String(query.data.branchId))
      )
        throw Error('لا تملك صلاحية الحفظ في هذا الفرع.');
      if (!draft?.some((v) => BigInt(v.mask) > 0n)) throw Error('اختر صلاحية واحدة على الأقل.');
      assertGrantable(draft, auth.user?.permissions || [], query.data.permissions);
      return usersApi.savePermissions(id, query.data.permissionsVersion, draft);
    },

    onSuccess: async () => {

      setDraft(null);
      await client.invalidateQueries({ queryKey: ['users'] });
    },
  });
  return (
    <>
      <PageHead title="صلاحيات المستخدم" description="الصلاحيات المباشرة حسب الأقسام والعمليات." />
      {!canView ? (
        <p role="alert">لا تملك صلاحية عرض الصلاحيات.</p>
      ) : !Number.isSafeInteger(id) || id < 1 ? (
        <p>اختر مستخدمًا من قائمة المستخدمين لعرض صلاحياته.</p>
      ) : query.error || catalog.error ? (
        <p role="alert">{errorMessage(query.error || catalog.error)}</p>
      ) : query.isPending || catalog.isPending ? (
        <p role="status">جارٍ تحميل الصلاحيات…</p>
      ) : (
        <>
          <p>الفرع: {query.data.branchId}</p>
          <PermissionMatrix
            catalog={catalog.data!}
            value={draft || query.data.permissions}
            allowed={auth.user?.permissions || []}
            onChange={setDraft}
            isReadOnly={
              !auth.can('USERS', 'USERS_PERMISSIONS_MANAGE', String(query.data.branchId)) ||
              mutation.isPending
            }
          />
          <Button
            disabled={
              !draft ||
              mutation.isPending ||
              !auth.can('USERS', 'USERS_PERMISSIONS_MANAGE', String(query.data.branchId))
            }
            onClick={() => mutation.mutate()}
          >
            حفظ الصلاحيات
          </Button>
          {mutation.error && <p role="alert">{errorMessage(mutation.error)}</p>}
        </>
      )}
    </>
  );
}
