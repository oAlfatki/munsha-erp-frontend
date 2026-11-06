import type { ToggleProps } from '@/features/settings/types/props/ToggleProps';

export function Toggle({ label, isChecked: isValue, onChange, note }: ToggleProps) {

  return (
    <label className="setting-toggle">
      <span>
        <strong>{label}</strong>
        {note && <small>{note}</small>}
      </span>
      <input type="checkbox" checked={isValue} onChange={(e) => onChange(e.target.checked)} />
    </label>
  );
}
