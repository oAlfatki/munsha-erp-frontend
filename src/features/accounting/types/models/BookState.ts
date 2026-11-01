import type { ErpReadModel } from '@/core/types/ErpReadModel';
export type BookState = Omit<ErpReadModel, 'annualBooks'>;
