import { ROUTES } from '@/core/config/navigation-paths';
import type { RouteObject } from 'react-router-dom';
export const TRADE_ROUTES:RouteObject[]=[
{
    path:ROUTES.DOCUMENTS_DOCUMENTID,
    lazy: async () => ({
      Component: (await import('@/features/trade/pages/InvoiceDetailsPage')).default,
    }),
    handle: { module: 'trade', title: '', },
  }
];
