export type ImportTemplateResponse = {
  kind: 'customer' | 'supplier' | 'product';
  encoding: 'UTF-8';
  headers: Array<string>;
  requiredHeaders: Array<string>;
  sampleRows: Array<Array<string>>;
};
