export type ReturnAvailabilityResponse = {
  invoiceId: string;
  kind: 'sale' | 'purchase';
  lines: Array<{
    sourceLineIndex: number;
    productId: string;
    unit: number;
    originalQty: number;
    returnedQty: number;
    remainingQty: number;
  }>;
};
