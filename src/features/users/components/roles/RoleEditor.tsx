import { toast } from 'sonner';
import { errorMessage } from '@/core/api/error-message';
import { useAuth } from '@/core/auth/AuthProvider';
import { rolesApi } from '@/features/users/api/roles-api';
import { PermissionMatrix } from '@/features/users/components/PermissionMatrix';
import { assertKnownPermissions } from '@/features/users/services/permission-assignment';
import { fetchPermissionCatalog } from '@/features/users/services/permission-catalog';
import type { SaveRoleValues } from '@/features/users/types/SaveRoleValues';
import type { RoleEditorProps } from '@/features/users/types/props/RoleEditorProps';
import { assertGrantable } from '@/features/users/validations/permission-grants';
import { roleFormSchema } from '@/features/users/validations/roles-schema';
import { Field } from '@/shared/ui/forms/Field';
import { Input } from '@/shared/ui/primitives/input';
import { Button } from '@/shared/ui/primitives/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';

export function RoleEditor({ role, onSaved, onCancel }: RoleEditorProps) {

  const auth = useAuth();
  const client = useQueryClient();
  const lock = useRef(false);
  const catalog = useQuery({
    queryKey: ['permissions', 'catalog', auth.user?.userId],

    queryFn: ({ signal }) => fetchPermissionCatalog(signal),

    retry: false,
  });
  const form = useForm<SaveRoleValues>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      name: role?.name || '',
      branchId: Number(auth.user?.branchId),
      permissions: role?.permissions || [],
      rowVersion: role?.rowVersion,
    },
  });
  const mutation = useMutation({
    mutationFn: async (values: SaveRoleValues) => {

      const code = role ? 'USERS_ROLES_UPDATE' : 'USERS_ROLES_CREATE';
      if (!auth.canFeature('USERS', 'ROLES', code, String(values.branchId)))
        throw Error('لا تملك صلاحية حفظ الدور في هذا الفرع.');
      if (!catalog.data?.capabilities.roles) throw Error('الخادم لم يعلن دعم الأدوار.');
      if (role && role.branchId !== values.branchId) throw Error('الدور خارج نطاق الفرع المسموح.');
      assertKnownPermissions(values.permissions, catalog.data);
      assertGrantable(values.permissions, auth.user?.permissions || [], role?.permissions || []);
      return role ? rolesApi.update(role.id, values) : rolesApi.create(values);
    },

    onSuccess: async () => {

      await Promise.all([
        client.invalidateQueries({ queryKey: ['roles'] }),
        client.invalidateQueries({ queryKey: ['users'] }),
      ]);
      try {
        await auth.refreshIdentity();
      } catch (error) {
        toast.warning('حُفظ الدور، لكن تعذر تحديث الجلسة: ' + errorMessage(error));
      }
      onSaved();
    },
  });
  const submit = form.handleSubmit(async (values) => {
    if (lock.current) return;
    lock.current = true;
    try {
      await mutation.mutateAsync(values);
    } catch (error) {
      form.setError('root', { message: errorMessage(error) });
    } finally {
      lock.current = false;
    }
  });
  const permissions = form.watch('permissions');
  return (
    <form className="role-editor" onSubmit={submit} noValidate>
      <Field label="اسم الدور *">
        <Input {...form.register('name')} disabled={mutation.isPending} maxLength={200} />
      </Field>
      <Field label="الفرع">
        <Input value={form.getValues('branchId')} readOnly />
      </Field>
      {form.formState.errors.name && <p role="alert">{form.formState.errors.name.message}</p>}
      {catalog.error ? (
        <p role="alert">{errorMessage(catalog.error)}</p>
      ) : !catalog.data ? (
        <p role="status">جارٍ تحميل دليل الصلاحيات…</p>
      ) : !catalog.data.capabilities.roles ? (
        <p role="alert">إدارة الأدوار تتطلب دعم عقد الأدوار على الخادم.</p>
      ) : (
        <PermissionMatrix
          catalog={catalog.data}
          value={permissions}
          allowed={auth.user?.permissions || []}
          onChange={(value) => form.setValue('permissions', value, { shouldValidate: true })}
          isReadOnly={mutation.isPending}
        />
      )}
      {form.formState.errors.root && <p role="alert">{form.formState.errors.root.message}</p>}
      {form.formState.errors.permissions && <p role="alert">راجع صلاحيات الدور.</p>}
      <div className="dialog-actions">
        <Button
          disabled={
            mutation.isPending || form.formState.isSubmitting || !catalog.data?.capabilities.roles
          }
        >
          حفظ الدور
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          تراجع
        </Button>
      </div>
    </form>
  );
}
