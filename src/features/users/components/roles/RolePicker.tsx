import { errorMessage } from '@/core/api/error-message';
import { useAuth } from '@/core/auth/AuthProvider';
import { useRolesQuery } from '@/features/users/queries/roles-query';
import type { RolePickerProps } from '@/features/users/types/props/RolePickerProps';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { Input } from '@/shared/ui/primitives/input';
import { Button } from '@/shared/ui/primitives/button';
import { useState } from 'react';

export function RolePicker({ value, onChange, isReadOnly = false }: RolePickerProps) {

  const auth = useAuth();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const query = useRolesQuery(
    {
      page,
      pageSize: 20,
      branchId: Number(auth.user?.branchId),
      search: search || undefined,
      assignableOnly: true,
    },
    !isReadOnly,
  );
  const options = isReadOnly ? [] : query.data?.items || [];
  const items =
    value && !options.some((role) => role.id === value.id) ? [value, ...options] : options;
  return (
    <div>
      {!isReadOnly && (
        <Field label="البحث عن دور">
          <Input
            value={search}
            maxLength={200}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
          />
        </Field>
      )}
      <Field label="الدور *">
        <Select
          value={value?.id || ''}
          disabled={isReadOnly || query.isFetching}
          onChange={(event) =>
            onChange(items.find((role) => role.id === Number(event.target.value)) || null)
          }
        >
          <option value="">اختر الدور…</option>
          {items.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </Select>
      </Field>
      {!isReadOnly && query.error && <p role="alert">{errorMessage(query.error)}</p>}
      {!isReadOnly && query.isPending && <p role="status">جارٍ تحميل الأدوار…</p>}
      {!isReadOnly && query.data && !query.data.items.length && (
        <p>لا توجد أدوار مطابقة مسموح بإسنادها.</p>
      )}
      {!isReadOnly && (
        <div className="dialog-actions">
          <Button
            type="button"
            variant="outline"
            disabled={page <= 1 || query.isFetching}
            onClick={() => setPage((value) => value - 1)}
          >
            الأدوار السابقة
          </Button>
          <span>صفحة الأدوار {page}</span>
          <Button
            type="button"
            variant="outline"
            disabled={!query.data || page * 20 >= query.data.totalCount || query.isFetching}
            onClick={() => setPage((value) => value + 1)}
          >
            الأدوار التالية
          </Button>
        </div>
      )}
    </div>
  );
}
