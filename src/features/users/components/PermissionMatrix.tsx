import type { PermissionMatrixProps } from '@/features/users/types/props/PermissionMatrixProps';
import type { PermissionMask } from '@/features/users/types/PermissionMask';
import { Button } from '@/shared/ui/primitives/button';

export function PermissionMatrix({
  catalog,
  value,
  allowed,
  onChange,
  isReadOnly = false,
}: PermissionMatrixProps) {

  const mask = (items: PermissionMask[], module: string) =>
    BigInt(items.find((v) => v.moduleCode === module)?.mask || '0');

  const set = (module: string, next: bigint) =>
    onChange([
      ...value.filter((v) => v.moduleCode !== module),
      ...(next ? [{ moduleCode: module, mask: String(next) }] : []),
    ]);

  const all = (shouldExcludeUsers: boolean) =>
    onChange(
      catalog.modules.flatMap((module) => {
        let selected = 0n;
        for (const d of module.definitions) {
          const bit = BigInt(d.bitValue);
          if (
            (mask(allowed, module.moduleCode) & bit) === bit &&
            (!shouldExcludeUsers || (!d.code.startsWith('USERS_') && module.moduleCode !== 'USERS'))
          )
            selected |= bit;
        }
        return selected ? [{ moduleCode: module.moduleCode, mask: String(selected) }] : [];
      }),
    );

  return (
    <section className="access-matrix" aria-label="صلاحيات المستخدم">
      <div className="dialog-actions">
        <Button type="button" disabled={isReadOnly} onClick={() => all(false)}>
          كل الصلاحيات المسموح بمنحها
        </Button>
        <Button type="button" disabled={isReadOnly} onClick={() => all(true)}>
          كل الصلاحيات عدا إدارة المستخدمين
        </Button>
      </div>
      {catalog.modules.map((module) => (
        <fieldset className="access-module" key={module.moduleCode}>
          <legend>{module.nameAr || module.moduleCode}</legend>
          {module.features.map((feature) => (
            <fieldset className="access-feature" key={feature.featureCode}>
              <legend>{feature.nameAr || feature.featureCode}</legend>
              {feature.actions.map((d) => {
                const bit = BigInt(d.bitValue);
                return (
                  <label className="check-label" key={d.code}>
                    <input
                      type="checkbox"
                      checked={(mask(value, module.moduleCode) & bit) === bit}
                      disabled={isReadOnly || (mask(allowed, module.moduleCode) & bit) !== bit}
                      onChange={(e) =>
                        set(
                          module.moduleCode,
                          e.target.checked
                            ? mask(value, module.moduleCode) | bit
                            : mask(value, module.moduleCode) & ~bit,
                        )
                      }
                    />
                    {d.nameAr || d.code}
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
