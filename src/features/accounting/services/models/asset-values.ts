// Frontend display calculations; backend authority requires independent verification.
import { money } from '@/core/utils/money';
export function assetValues(asset: object, period: 'year' | 'month' = 'year') {
  const values = asset as Record<string, unknown>;
  const cost = Number(values.cost || 0),
    residual = Number(values.residual || 0),
    life = Number(values.life || 0);
  const divisor = life * (period === 'month' ? 12 : 1);
  return {
    cost,
    residual,
    rate: divisor > 0 ? 100 / divisor : 0,
    installment: divisor > 0 ? money(Math.max(0, cost - residual) / divisor) : 0,
  };
}
