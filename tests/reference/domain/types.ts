export interface Unit {
    name: string;
    factor: number;
    purchase: number;
    retail: number;
    wholesale: number;
    barcode: string;
}
export interface Product {
    id: string;
    code: string;
    name: string;
    category: 1 | 2 | 3;
    groupId?: string;
    units: Unit[];
    min: number;
    alert: boolean;
    maxDiscount: number;
    active: boolean;
}
export interface Party {
    groupId?: string;
    id: string;
    kind: 'customer' | 'supplier';
    name: string;
    address: string;
    phone: string;
    currency: string;
    priceType: 'retail' | 'wholesale';
    limit: number;
    active: boolean;
}
export interface Branch {
    id: string;
    name: string;
    address: string;
    active: boolean;
}
export interface Warehouse {
    id: string;
    name: string;
    branchId: string;
    active: boolean;
}
export interface Employee {
    code?: string;
    marital?: string;
    issueDate?: string;
    photo?: string;
    files?: import('./completion').EmployeeFile[];
    id: string;
    name: string;
    phone: string;
    address: string;
    email: string;
    job: string;
    branchId: string;
    salary: number;
    currency: string;
    joined: string;
    identity: string;
    issuer: string;
    active: boolean;
}
export interface Stock {
    productId: string;
    warehouseId: string;
    qty: number;
    value: number;
}
export interface InvoiceLine {
    sourceInvoiceDiscount?:number;
    invoiceDiscount?:number;
    productId: string;
    unit: number;
    qty: number;
    free: number;
    price: number;
    discount: number;
    cost: number;
}
export interface Invoice {
    invoiceDiscount?:number;
    savedById?:string;
    savedByName?:string;
    returnedById?:string;
    returnedByName?:string;
    cashId?: string;
    supplierNumber?: string;
    id: string;
    number: string;
    kind: 'sale' | 'purchase';
    date: string;
    branchId: string;
    warehouseId: string;
    partyId: string;
    currency: string;
    rate: number;
    payment: 'cash' | 'credit' | 'mixed';
    paid?:number;
    taxRate?:number;
    taxAmount?:number;
    subtotal?:number;
    priceType: 'retail' | 'wholesale';
    status: 'draft' | 'final';
    lines: InvoiceLine[];
    total: number;
    note: string;
    createdAt: string;
    reversedBy?: string;
}
export interface JournalLine {
    currency?:string;foreignAmount?:number;rate?:number;
    cashId?: string;
    account: string;
    debit: number;
    credit: number;
    partyId?: string;
}
export interface Entry {
    id: string;
    reference: string;
    date: string;
    branchId: string;
    description: string;
    lines: JournalLine[];
}
export interface Movement {
    id: string;
    reference: string;
    date: string;
    productId: string;
    warehouseId: string;
    qty: number;
    value: number;
    kind: string;
}
export interface Expense {
    id: string;
    date: string;
    branchId: string;
    category: string;
    description: string;
    amount: number;
    currency: string;
    rate: number;
}
export interface Audit {
    id: string;
    date: string;
    action: string;
    reference: string;
}
export interface Workspace {
    vouchers?:import('./vouchers').VoucherDocument[];
    backupSettings?:import('./backup-policy').BackupPolicy;
    systemSettings?: import('./system-settings').SystemSettings;
    documentCounters?: Record<string,number>;
    annualBooks?: import('./annual-books').AnnualBooks;
    dataVersion?: number;
    expenseDocuments?: import('./expenses').ExpenseDocument[];
    branding?: {name:string;tagline:string;color:string;logo:string;};
    stockDocuments?: import("./stock-documents").StockDocument[];
    extras?: import("./extensions").ExtensionData;
    organization: {
        name: string;
        email?: string;
        activity?: string;
        taxNumber?: string;
        registrationNumber?: string;
        address: string;
        phone: string;
        multiBranch: boolean;
        currency: string;
        year: number;
        costPolicy: 'moving_average';
        policyApproved: boolean;
    };
    branches: Branch[];
    warehouses: Warehouse[];
    products: Product[];
    parties: Party[];
    employees: Employee[];
    stocks: Stock[];
    invoices: Invoice[];
    invoiceReturns?: (Invoice & {sourceId:string;sourceLines:number[];adjusted?:boolean;baseSubtotal?:number;baseTax?:number;baseTotal?:number;basePaid?:number})[];
    entries: Entry[];
    movements: Movement[];
    expenses: Expense[];
    audit: Audit[];
    processed: string[];
    currencies: {
        code: string;
        name: string;
        rate: number;
    }[];
    roles: Record<string, string[]>;
}
export type WorkspaceResponse = {
    state: Workspace;
    revision: number;
};
export const ACCOUNTS: Record<string, {
    name: string;
    type: string;
}> = { '101': { name: 'الصناديق', type: 'asset' }, '120': { name: 'المخزون', type: 'asset' }, '130': { name: 'ذمم العملاء', type: 'asset' }, '150': { name: 'جاري الفروع', type: 'asset' }, '210': { name: 'ذمم الموردين', type: 'liability' }, '300': { name: 'رأس المال', type: 'equity' }, '400': { name: 'إيرادات المبيعات', type: 'revenue' }, '500': { name: 'تكلفة البضاعة المباعة', type: 'expense' }, '510': { name: 'المصروفات التشغيلية', type: 'expense' } };
export const money = (v: number) => Math.round((v + Number.EPSILON) * 100) / 100;
export const lineTotal = (l: Pick<InvoiceLine, 'qty' | 'price' | 'discount'> & {invoiceDiscount?:number}) => money(money(l.qty * l.price * (1 - l.discount / 100))-(l.invoiceDiscount||0));
export const balance = (workspace: Workspace, account: string, partyId?: string) => money(workspace.entries.flatMap(entry => entry.lines).filter(journalLine => journalLine.account === account && (!partyId || journalLine.partyId === partyId)).reduce((n, journalLine) => n + journalLine.debit - journalLine.credit, 0));
