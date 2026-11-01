export type SavePartialReturnRequest = {
  id: string;
  date: string;
  note?: string;
  invoiceDiscount?: number;
  paid?: number;
  lines: {
    index: number;
    qty: number;
    discount?: number;
  }[];
};
