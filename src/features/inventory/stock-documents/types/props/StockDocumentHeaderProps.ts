import type { useStockDocumentsController } from '@/features/inventory/stock-documents/hooks/useStockDocumentsController';
export interface StockDocumentHeaderProps {
  model: NonNullable<ReturnType<typeof useStockDocumentsController>>;
  kind: Parameters<typeof useStockDocumentsController>[0]['kind'];
}
