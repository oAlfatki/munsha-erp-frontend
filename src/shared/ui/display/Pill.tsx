import type { PillProps } from '@/shared/types/props/PillProps';

export function Pill({ children, tone = 'green' }: PillProps) {

  return (
    <span className={'pill ' + tone}>
      <i />
      {children}
    </span>
  );
}
