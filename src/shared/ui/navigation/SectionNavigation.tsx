import { MENU_ITEMS, menuLeaves as navigationLeaves } from '@/core/config/menu';
import type { EntryProps } from '@/shared/types/props/EntryProps';
import type { SectionNavigationProps } from '@/shared/types/props/SectionNavigationProps';
import { ChevronDown, ChevronLeft, List, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

function Entry({ entry, view, go }: EntryProps) {

  const isActive = entry.children
    ? navigationLeaves(entry.children).some((e) => e.target === view)
    : entry.target === view;
  const [open, setOpen] = useState<boolean | null>(null);
  useEffect(() => setOpen(null), [view]);
  const isExpanded = open ?? isActive;
  if (entry.children)
    return (
      <div className="navigation-group">
        <button
          className={'navigation-group-toggle ' + (isActive ? 'current' : '')}
          aria-expanded={isExpanded}
          onClick={() => setOpen(!isExpanded)}
        >
          <span>{entry.label}</span>
          {isExpanded ? <ChevronDown size={13} /> : <ChevronLeft size={13} />}
        </button>
        {isExpanded && (
          <div className="navigation-children">
            {entry.children.map((e) => (
              <Entry key={e.id} entry={e} view={view} go={go} />
            ))}
          </div>
        )}
      </div>
    );
  return (
    <button
      className={isActive ? 'active' : ''}
      aria-current={isActive ? 'page' : undefined}
      onClick={() => go(entry.target!)}
    >
      {/إضافة|فاتورة شراء|فاتورة مبيعات/.test(entry.label) ? (
        <Plus size={12} />
      ) : (
        <List size={12} />
      )}
      <span>{entry.label}</span>
    </button>
  );
}

export function SectionNavigation({ module, view, go }: SectionNavigationProps) {

  return (
    <div className="subnav expanded structured-subnav">
      {(MENU_ITEMS[module] || []).map((e) => (
        <Entry key={e.id} entry={e} view={view} go={go} />
      ))}
    </div>
  );
}
