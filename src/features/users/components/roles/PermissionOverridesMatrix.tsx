import type { PermissionMask } from '@/features/users/types/PermissionMask';
import type { PermissionOverridesMatrixProps } from '@/features/users/types/props/PermissionOverridesMatrixProps';
import { Select } from '@/shared/ui/forms/Select';

export function PermissionOverridesMatrix({
  catalog,
  additionalPermissions,
  excludedPermissions,
  inheritedPermissions,
  allowed,
  onChange,
  isReadOnly = false,
}: PermissionOverridesMatrixProps) {

  const mask = (items: PermissionMask[], module: string) =>
    BigInt(items.find((item) => item.moduleCode === module)?.mask || '0');

  const update = (items: PermissionMask[], moduleCode: string, bit: bigint, isSet: boolean) => {

    const next = isSet ? mask(items, moduleCode) | bit : mask(items, moduleCode) & ~bit;
    return [
      ...items.filter((item) => item.moduleCode !== moduleCode),
      ...(next ? [{ moduleCode, mask: String(next) }] : []),
    ];
  };

  return (
    <section className="access-overrides" aria-label="استثناءات المستخدم">
      <h3>الإضافات والاستثناءات الخاصة بالمستخدم</h3>
      <p>المنع الخاص بالمستخدم يتقدم على السماح الموروث من الدور.</p>
      {catalog.modules.map((module) => (
        <fieldset className="access-module" key={module.moduleCode}>
          <legend>{module.nameAr || module.moduleCode}</legend>
          {module.features.map((feature) => (
            <fieldset className="access-feature" key={feature.featureCode}>
              <legend>{feature.nameAr || feature.featureCode}</legend>
              {feature.actions.map((action) => {
                const bit = BigInt(action.bitValue);
                const selection =
                  (mask(excludedPermissions, module.moduleCode) & bit) !== 0n
                    ? 'deny'
                    : (mask(additionalPermissions, module.moduleCode) & bit) !== 0n
                      ? 'allow'
                      : 'inherit';
                const isInherited = (mask(inheritedPermissions, module.moduleCode) & bit) !== 0n;
                return (
                  <label className="field" key={action.code}>
                    <span>
                      {action.nameAr} · {isInherited ? 'ممنوحة من الدور' : 'غير ممنوحة من الدور'}
                    </span>
                    <Select
                      aria-label={
                        'استثناء ' + module.nameAr + ' / ' + feature.nameAr + ' / ' + action.nameAr
                      }
                      value={selection}
                      disabled={isReadOnly}
                      onChange={(event) => {
                        const value = event.target.value;
                        onChange(
                          update(additionalPermissions, module.moduleCode, bit, value === 'allow'),
                          update(excludedPermissions, module.moduleCode, bit, value === 'deny'),
                        );
                      }}
                    >
                      <option value="inherit">حسب الدور</option>
                      <option
                        value="allow"
                        disabled={(mask(allowed, module.moduleCode) & bit) === 0n}
                      >
                        سماح إضافي
                      </option>
                      <option value="deny">منع خاص بالمستخدم</option>
                    </Select>
                  </label>
                );
              })}
            </fieldset>
          ))}
        </fieldset>
      ))}
    </section>
  );
}
