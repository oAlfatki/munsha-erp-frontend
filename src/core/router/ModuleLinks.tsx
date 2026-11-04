import { MENU_ITEMS } from '@/core/config/menu';
import { ROUTES } from '@/core/config/navigation-paths';
import { useApplication } from '@/core/state/ApplicationProvider';
import type { ModuleLinksProps } from '@/core/types/ModuleLinksProps';
import { Select } from '@/shared/ui/forms/Select';
import { Button } from '@/shared/ui/primitives/button';

export function ModuleLinks({ module }: ModuleLinksProps) {
  const { navigate, view } = useApplication();
  const groups = (MENU_ITEMS[module] || []).map((entry) => ({
    label: entry.label,
    entries: entry.children || [entry],
  }));
  if (!groups.length) return null;
  const isKnown = groups.flatMap((g) => g.entries).some((e) => e.target === view);
  return (
    <div className="module-screen-links no-print">
      <span>شاشات القسم</span>
      <Select
        aria-label="الانتقال إلى شاشة في القسم"
        value={isKnown ? view : ''}
        onChange={(e) => e.target.value && navigate(e.target.value)}
      >
        <option value="">اختر عملية أو قائمة أو تقريرًا…</option>
        {groups.map((g, i) => (
          <optgroup key={i} label={g.label}>
            {g.entries.map((e) => (
              <option key={e.id} value={e.target}>
                {e.label}
              </option>
            ))}
          </optgroup>
        ))}
      </Select>
      <Button
        variant="ghost"
        onClick={() =>
          navigate(
            module === 'access' ? '/access' : module === 'accounts' ? ROUTES.ACCOUNTING : '/' + module,
          )
        }
      >
        الرئيسية للقسم
      </Button>
    </div>
  );
}
