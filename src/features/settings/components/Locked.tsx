import type { LockedProps } from '@/features/settings/types/props/LockedProps';
import { Pill } from '@/shared/ui/display/Pill';

export function Locked({ label, value, reason }: LockedProps) {

  return (
    <div className="setting-locked">
      <span>
        <strong>{label}</strong>
        {reason && <small>{reason}</small>}
      </span>
      <Pill tone="gray">{value}</Pill>
    </div>
  );
}
