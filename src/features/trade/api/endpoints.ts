import { commandPath } from '@/core/api/command-path';
import { pathSegment } from '@/core/api/path-segment';

export const ENDPOINTS = {
  command: commandPath,
  fetchPurchasesInvoices: `/purchases/invoices`,

  fetchPurchasesInvoicesById: (id: string) => `/purchases/invoices/${pathSegment(id)}`,

  fetchPurchasesReturns: `/purchases/returns`,

  fetchPurchasesReturnsById: (id: string) => `/purchases/returns/${pathSegment(id)}`,

  fetchPurchasesInvoicesByIdReturnAvailability: (id: string) =>
    `/purchases/invoices/${pathSegment(id)}/return-availability`,

  fetchSalesTargets: `/sales/targets`,

  fetchSalesTargetsById: (id: string) => `/sales/targets/${pathSegment(id)}`,

  fetchSalesInvoices: `/sales/invoices`,

  fetchSalesInvoicesById: (id: string) => `/sales/invoices/${pathSegment(id)}`,

  fetchSalesReturns: `/sales/returns`,

  fetchSalesReturnsById: (id: string) => `/sales/returns/${pathSegment(id)}`,

  fetchSalesInvoicesByIdReturnAvailability: (id: string) =>
    `/sales/invoices/${pathSegment(id)}/return-availability`,
} as const;
