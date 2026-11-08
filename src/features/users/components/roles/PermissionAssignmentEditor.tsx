import { PermissionMatrix } from '@/features/users/components/PermissionMatrix';
import { PermissionOverridesMatrix } from '@/features/users/components/roles/PermissionOverridesMatrix';
import { RolePicker } from '@/features/users/components/roles/RolePicker';
import { effectivePermissions } from '@/features/users/services/permission-assignment';
import type { PermissionAssignmentEditorProps } from '@/features/users/types/props/PermissionAssignmentEditorProps';
import { permissionAssignmentSchema } from '@/features/users/validations/roles-schema';

export function PermissionAssignmentEditor({
  catalog,
  value,
  allowed,
  onChange,
  canAssignRole,
  isReadOnly = false,
  isRoleSelectionLocked = false,
}: PermissionAssignmentEditorProps) {

  const parsed = permissionAssignmentSchema.safeParse(value);
  const preview = parsed.success ? effectivePermissions(parsed.data) : [];
  return (
    <section className="access-assignment" aria-label="مصدر صلاحيات المستخدم">
      <fieldset className="access-source">
        <legend>مصدر الصلاحيات</legend>
        <label className="check-label">
          <input
            type="radio"
            name="permission-source"
            value="direct"
            checked={value.mode === 'direct'}
            disabled={isReadOnly || isRoleSelectionLocked}
            onChange={() => onChange({ mode: 'direct', permissions: preview })}
          />
          صلاحيات مباشرة
        </label>
        <label className="check-label">
          <input
            type="radio"
            name="permission-source"
            value="role"
            checked={value.mode === 'role'}
            disabled={
              isReadOnly ||
              isRoleSelectionLocked ||
              !catalog.capabilities.roles ||
              (!canAssignRole && value.mode !== 'role')
            }
            onChange={() =>
              onChange({
                mode: 'role',
                role: null,
                additionalPermissions: [],
                excludedPermissions: [],
              })
            }
          />
          دور مع إضافات واستثناءات
        </label>
      </fieldset>
      {!catalog.capabilities.roles && (
        <p>إدارة الأدوار تتطلب تفعيل عقد الأدوار على الخادم؛ الصلاحيات المباشرة متاحة.</p>
      )}
      {value.mode === 'direct' ? (
        <PermissionMatrix
          catalog={catalog}
          value={value.permissions}
          allowed={allowed}
          onChange={(permissions) => onChange({ mode: 'direct', permissions })}
          isReadOnly={isReadOnly}
        />
      ) : (
        <>
          <RolePicker
            value={value.role}
            onChange={(role) => onChange({ ...value, role })}
            isReadOnly={isReadOnly || !canAssignRole || isRoleSelectionLocked}
          />
          {value.role && (
            <>
              <PermissionOverridesMatrix
                catalog={catalog}
                additionalPermissions={value.additionalPermissions}
                excludedPermissions={value.excludedPermissions}
                inheritedPermissions={value.role.permissions}
                allowed={allowed}
                onChange={(additionalPermissions, excludedPermissions) =>
                  onChange({ ...value, additionalPermissions, excludedPermissions })
                }
                isReadOnly={isReadOnly}
              />
              <h3>معاينة الصلاحيات الفعالة</h3>
              <p>هذه معاينة؛ الخادم هو المرجع النهائي للصلاحيات الممنوحة.</p>
              <PermissionMatrix
                catalog={catalog}
                value={preview}
                allowed={allowed}
                onChange={() => {}}
                isReadOnly
              />
            </>
          )}
        </>
      )}
    </section>
  );
}
