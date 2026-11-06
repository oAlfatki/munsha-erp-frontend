import type { PillProps } from '@/core/types/props/PillProps';

export function Pill({ children, tone = 'green' }: PillProps) {
  return (
    <span className={'pill ' + tone}>
      <i />
      {children}
    </span>
  );
}
