// Frontend display calculations; backend authority requires independent verification.
import type { Unit } from '@/features/stock/public/types/models/Unit';
export function quantityByUnits(qty: number, units: Unit[]): string {
  let remaining = Math.abs(qty);
  const chunks = units.map((u, i) => {
    const n =
      i === units.length - 1
        ? +(remaining / u.factor).toFixed(6)
        : Math.floor((remaining + 0.0000001) / u.factor);
    remaining = +Math.max(0, remaining - n * u.factor).toFixed(6);
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 6 }).format(n) + ' ' + u.name;
  });
  return (qty < 0 ? 'سالب ' : '') + chunks.join('، ');
}
