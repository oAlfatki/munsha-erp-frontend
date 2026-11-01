import { DynamicField } from '@/shared/ui/forms/DynamicField';
import { useErpContext } from '@/core/hooks/useErpContext';
import { allAccounts } from '@/features/accounting/services/models/extensions';
import type { DynamicFieldProps } from '@/features/settings/types/DynamicFieldProps';

export function LookupField({ field, value, onChange }: DynamicFieldProps) {
  const { state: s } = useErpContext();
  if (!s) return null;
  const options =
    field.key === 'currency'
      ? s.currencies.map((c) => [c.code, c.name])
      : field.type === 'branch'
        ? s.branches.map((branch) => [branch.id, branch.name])
        : field.type === 'warehouse'
          ? s.warehouses.map((warehouse) => [warehouse.id, warehouse.name])
          : field.type === 'product'
            ? s.products.map((product) => [product.id, product.name])
            : field.type === 'employee'
              ? s.employees.map((employee) => [employee.id, employee.name])
              : field.type === 'account'
                ? Object.entries(allAccounts(s)).map(([id, a]) => [id, a.name + ' · ' + id])
                : field.options;
  return (
    <DynamicField
      field={field}
      value={value}
      onChange={onChange}
      options={options as [string, string][] | undefined}
    />
  );
}
