import {applyVoucher} from './vouchers';
import {allocateInvoiceDiscount} from './invoice-discounts';
import {backupPolicySchema} from './backup-policy';
import {applyPartialReturn} from './partial-returns';
import {applyPriceList} from './price-list';
import {applySystemSettings,systemSettings,validatePolicy,assertCashNonnegative,operationCashId} from './system-settings';
import {nextDocumentNumber} from './numbering';
import {requireCash} from './cash';
import {newId} from './id';
import {applyCompletion,fileSchema} from './completion';
import {extras} from './extensions';
import { applyExpense } from './expenses';
import { applyAnnualCommand, isArchived } from './annual-books';
import { z } from 'zod';
import { applyExtended } from './extensions';
import { applyStockDocument } from './stock-documents';
import { Workspace, Invoice, InvoiceLine, JournalLine, lineTotal, money, balance, ACCOUNTS } from './types';
const strSchema = z.string().trim().min(1).max(180), numSchema = z.number().finite().nonnegative(), positiveSchema = z.number().finite().positive();
const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(x => !isNaN(Date.parse(x)) && new Date(x).toISOString().slice(0, 10) === x, 'تاريخ غير صحيح');
export const uid = () => newId();
function fail(m: string): never { throw new Error(m); }
function year(workspace: Workspace, d: string) { if (+d.slice(0, 4) !== workspace.organization.year)
    fail('التاريخ خارج السنة المالية المفتوحة'); }
function audit(workspace: Workspace, action: string, reference: string) { workspace.audit.unshift({ id: uid(), date: new Date().toISOString(), action, reference }); workspace.audit = workspace.audit.slice(0, 300); }
function entry(workspace: Workspace, reference: string, date: string, branchId: string, description: string, lines: JournalLine[]) { const dr = money(lines.reduce((v, journalLine) => v + journalLine.debit, 0)), cr = money(lines.reduce((v, journalLine) => v + journalLine.credit, 0)); if (dr !== cr)
    fail('القيد غير متزن'); workspace.entries.push({ id: uid(), reference, date, branchId, description, lines }); }
function stock(workspace: Workspace, productId: string, warehouseId: string) { let x = workspace.stocks.find(x => x.productId === productId && x.warehouseId === warehouseId); if (!x) {
    x = { productId, warehouseId, qty: 0, value: 0 };
    workspace.stocks.push(x);
} return x; }
function move(workspace: Workspace, productId: string, warehouseId: string, qty: number, value: number, reference: string, date: string, kind: string) { const x = stock(workspace, productId, warehouseId); if (x.qty + qty < -0.00001 || x.value + value < -.02)
    fail('المخزون أو قيمته غير كافيين لهذه العملية'); x.qty = +(x.qty + qty).toFixed(6); x.value = +(x.value + value).toFixed(6); if (Math.abs(x.qty) < .000001)
    x.value = 0; workspace.movements.push({ id: uid(), reference, date, productId, warehouseId, qty, value, kind }); }
const invoiceSchema = z.object({ id: z.string().optional(), kind: z.enum(['sale', 'purchase']), date: dateSchema, branchId: strSchema, warehouseId: strSchema, partyId: z.string(), currency: strSchema, rate: positiveSchema, payment: z.enum(['cash', 'credit','mixed']),invoiceDiscount:numSchema.optional(),paid:numSchema.optional(),taxRate:numSchema.max(100).optional(), priceType: z.enum(['retail', 'wholesale']), status: z.enum(['draft', 'final']), note: z.string().max(1000),cashId:z.string().optional(),supplierNumber:z.string().max(100).optional(), lines: z.array(z.object({ productId: strSchema, unit: z.number().int().nonnegative(), qty: positiveSchema, free: numSchema, price: numSchema, discount: numSchema.max(100) })).min(1).max(100) });
export interface CommandActor{id:string;name:string;}
export function applyCommand(input:Workspace,type:string,raw:unknown,actor?:CommandActor):Workspace {const result=applyInternal(input,type,raw,actor);if(!systemSettings(result).accounting.allowNegativeCash)assertCashNonnegative(result);return result;}
function applyInternal(input: Workspace, type: string, raw: unknown,actor?:CommandActor): Workspace {
    const workspace = structuredClone(input);
    if (applyAnnualCommand(workspace,type,raw)) return workspace;
    if (isArchived(workspace)) fail('الفترة مؤرشفة للعرض فقط؛ افتح الفترة الحالية من الإعدادات');
    workspace.dataVersion=(workspace.dataVersion||0)+1;
    if(type==='backupSettings'){workspace.backupSettings=backupPolicySchema.parse(raw);audit(workspace,'تحديث إعدادات النسخ الاحتياطي','الإعدادات');return workspace;}
    if(applySystemSettings(workspace,type,raw))return workspace;
    validatePolicy(workspace,type,raw);
    if(type==='partialReturn'){applyPartialReturn(workspace,raw,actor);return workspace;}
    if(type==='priceList'){applyPriceList(workspace,raw);return workspace;}
    if(applyCompletion(workspace,type,raw,applyCommand))return workspace;
    if(applyExpense(workspace,type,raw))return workspace;
    if(type==='branding'){const p=z.object({name:strSchema,tagline:z.string().max(160),color:z.string().regex(/^#[0-9a-fA-F]{6}$/),logo:z.string().max(160000)}).parse(raw);if(p.logo&&!/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(p.logo))fail('الشعار صورة PNG أو JPEG أو WebP فقط');workspace.branding=p;audit(workspace,'تحديث الهوية التجارية',p.name);return workspace;}
    if (type === 'product') {
        const p = z.object({ id: z.string().optional(), name: strSchema, groupId: z.string().max(100).optional(), category: z.union([z.literal(1), z.literal(2), z.literal(3)]), min: numSchema, alert: z.boolean(), active: z.boolean(), maxDiscount: numSchema.max(100), units: z.array(z.object({ name: strSchema, factor: positiveSchema, purchase: numSchema, retail: numSchema, wholesale: numSchema, barcode: z.string().trim().max(80) })).min(1).max(3) }).parse(raw);
        if (p.units.length !== p.category || p.units.at(-1)!.factor !== 1)
            fail('الوحدة الأصغر معاملها 1 وعدد الوحدات يطابق الفئة');
        for (let i = 0; i < p.units.length - 1; i++) {
            if (p.units[i].factor <= p.units[i + 1].factor || !Number.isInteger(p.units[i].factor / p.units[i + 1].factor))
                fail('معاملات التحويل يجب أن تكون مضاعفات صحيحة من الأكبر إلى الأصغر');
        }
        const existing = workspace.products.find(product => product.id === p.id);
        if (existing && workspace.movements.some(x => x.productId === existing.id) && JSON.stringify(existing.units.map(x => x.factor)) !== JSON.stringify(p.units.map(x => x.factor)))
            fail('لا يمكن تغيير تحويلات صنف له حركات');
        const barcodes=p.units.map(u=>u.barcode).filter(Boolean);
        if(new Set(barcodes).size!==barcodes.length)fail('الباركود يجب أن يكون مختلفًا لكل وحدة في الصنف');
        for (const u of p.units)
            if (u.barcode && workspace.products.some(product => product.id !== p.id && product.units.some(v => v.barcode === u.barcode)))
                fail('الباركود مستخدم لصنف آخر');
        const q = { ...p, id: p.id || uid(), code: existing?.code || `ITM-${String(workspace.products.length + 1).padStart(4, '0')}` };
        workspace.products = existing ? workspace.products.map(product => product.id === q.id ? q : product) : [...workspace.products, q];
        audit(workspace, 'حفظ بطاقة صنف', q.name);
    }
    else if (type === 'party') {
        const p = z.object({ id: z.string().optional(), kind: z.enum(['customer', 'supplier']), groupId:z.string().max(100).optional(), name: strSchema, address: z.string().max(200), phone: z.string().max(40), currency: strSchema, priceType: z.enum(['retail', 'wholesale']), limit: numSchema, active: z.boolean() }).parse(raw);
        if (!workspace.currencies.some(x => x.code === p.currency))
            fail('عملة غير معرفة');
        if(p.groupId&&!extras(workspace).records.groups?.some(g=>g.id===p.groupId&&(g.active||workspace.parties.find(party=>party.id===p.id)?.groupId===p.groupId)&&g.kind===p.kind))fail('اختر مجموعة نشطة من نوع الطرف');
        const q = { ...p, id: p.id || uid() };
        workspace.parties = workspace.parties.some(party => party.id === q.id) ? workspace.parties.map(party => party.id === q.id ? q : party) : [...workspace.parties, q];
        audit(workspace, 'حفظ بيانات طرف', q.name);
    }
    else if (type === 'invoice') {
        const d = invoiceSchema.parse(raw);
        const discounted=allocateInvoiceDiscount(d.lines,d.invoiceDiscount||0);
        year(workspace, d.date);
        const w = workspace.warehouses.find(warehouse => warehouse.id === d.warehouseId && warehouse.active);
        if (!w || w.branchId !== d.branchId)
            fail('المخزن لا يتبع الفرع المحدد');
        if (!workspace.currencies.some(x => x.code === d.currency))
            fail('العملة غير معرفة');
        if (d.currency === workspace.organization.currency && d.rate !== 1)
            fail('سعر صرف العملة الأساسية يجب أن يكون 1');
        const old = workspace.invoices.find(invoice => invoice.id === d.id);
        if (d.id && !old)
            fail('المستند غير موجود');
        if (old?.status === 'final')
            fail('لا يسمح بتعديل مستند نهائي');
        const party = workspace.parties.find(party => party.id === d.partyId);
        if (d.payment !== 'cash' && (!party || !party.active || party.kind !== (d.kind === 'sale' ? 'customer' : 'supplier')))
            fail('اختر عميلًا أو موردًا نشطًا للفاتورة الآجلة');
        const id = old?.id || uid(), number = old?.number || nextDocumentNumber(workspace,d.kind,d.branchId,true);
        const doc: Invoice = { ...d, id, number, createdAt: old?.createdAt || new Date().toISOString(), total: money(discounted.reduce((v, l) => v + lineTotal(l), 0)), lines: discounted.map(l => ({ ...l, cost: 0 })) };
        doc.subtotal=doc.total;doc.taxRate=d.taxRate||0;doc.taxAmount=money(doc.subtotal*doc.taxRate/100);doc.total=money(doc.subtotal+doc.taxAmount);
        if(doc.taxRate&&!systemSettings(workspace).accounting.taxEnabled)fail('الضرائب غير مفعلة في إعدادات المحاسبة');
        doc.paid=d.payment==='cash'?doc.total:d.payment==='credit'?0:money(d.paid||0);
        if(d.payment==='mixed'&&!(doc.paid>0&&doc.paid<doc.total))fail('أدخل مبلغًا مدفوعًا أكبر من صفر وأقل من إجمالي الفاتورة للدفع المختلط');
        if(actor){doc.savedById=actor.id;doc.savedByName=actor.name;}else if(old){doc.savedById=old.savedById;doc.savedByName=old.savedByName;}
        if (d.status === 'final') {
            if(workspace.movements.some(m=>m.warehouseId===d.warehouseId&&d.lines.some(l=>l.productId===m.productId)&&m.date>d.date))fail('تاريخ الفاتورة يسبق حركة لاحقة للصنف في المخزن؛ لا يعاد احتساب التكلفة بأثر رجعي');
            if (!workspace.organization.policyApproved)
                fail('اعتمد سياسة التكلفة التجريبية من الإعدادات أولًا');
            const total = money(doc.total * d.rate),inventoryTotal=money(doc.subtotal!*d.rate),taxBase=money(total-inventoryTotal);
            if (total <= 0)
                fail('قيمة الفاتورة يجب أن تكون أكبر من صفر');
            if (d.kind === 'sale' && d.payment !== 'cash' && party && party.limit > 0 && balance(workspace, '130', party.id) + money((doc.total-(doc.paid||0))*d.rate) > party.limit)
                fail('الفاتورة تتجاوز سقف ائتمان العميل');
            const policies=systemSettings(workspace);
            if(d.kind==='purchase'&&policies.purchases.preventDuplicateSupplierNumber&&d.supplierNumber&&workspace.invoices.some(invoice=>invoice.id!==d.id&&invoice.kind==='purchase'&&invoice.status==='final'&&invoice.partyId===d.partyId&&invoice.supplierNumber===d.supplierNumber))fail('رقم فاتورة المورد مكرر');
            const cash=d.payment!=='credit'?requireCash(workspace,d.branchId,d.cashId||operationCashId(workspace,d.branchId,d.kind),workspace.organization.currency):null;doc.cashId=cash?.id;
            let cogs = 0;
            for (const [lineIndex, invoiceLine] of doc.lines.entries()) {
                const p = workspace.products.find(product => product.id === invoiceLine.productId && product.active);
                if (!p || !p.units[invoiceLine.unit])
                    fail('صنف أو وحدة غير متاحة');
                const u = p.units[invoiceLine.unit];
                if (d.kind === 'sale' && invoiceLine.free)
                    fail('الزيادة المجانية للشراء فقط');
                const effectiveDiscount=invoiceLine.qty*invoiceLine.price?100*(1-lineTotal(invoiceLine)/(invoiceLine.qty*invoiceLine.price)):0;
                if(d.kind==='sale'&&(!policies.sales.lineDiscount&&(invoiceLine.discount>0||(invoiceLine.invoiceDiscount||0)>0)||(effectiveDiscount>policies.sales.maxDiscount+.00001||invoiceLine.discount>policies.sales.maxDiscount)))fail('خصم المبيعات يخالف إعدادات النظام');
                if (d.kind === 'sale' && (effectiveDiscount > p.maxDiscount+.00001||invoiceLine.discount>p.maxDiscount))
                    fail('نسبة الخصم تتجاوز الحد المسموح للصنف');
                const q = (invoiceLine.qty + (d.kind === 'purchase' ? invoiceLine.free : 0)) * u.factor;
                const st = stock(workspace, p.id, w.id);
                const cost = d.kind === 'sale' ? money(q === st.qty ? st.value : (st.qty ? st.value / st.qty : 0) * q) : (lineIndex === doc.lines.length - 1 ? money(inventoryTotal - cogs) : money(lineTotal(invoiceLine) * d.rate));
                if (d.kind === 'sale' && st.qty + 0.000001 < q)
                    fail('الكمية غير متاحة للصنف: ' + p.name);
                if(d.kind==='sale'&&!policies.sales.allowBelowCost&&money(lineTotal(invoiceLine)*d.rate)<money(cost))fail('البيع بأقل من التكلفة غير مسموح');
                invoiceLine.cost = money(cost);
                cogs = money(cogs + invoiceLine.cost);
                if(d.kind==='purchase'&&policies.purchases.updatePurchasePrice)u.purchase=money(lineTotal(invoiceLine)/invoiceLine.qty*d.rate);
                move(workspace, p.id, w.id, d.kind === 'sale' ? -q : q, d.kind === 'sale' ? -cost : cost, number, d.date, d.kind === 'sale' ? 'بيع' : 'شراء');
            }
            const paidBase=money((doc.paid||0)*d.rate),dueBase=money(total-paidBase);
            if (d.kind === 'sale') {
                entry(workspace,number,d.date,d.branchId,'فاتورة مبيعات',[
                    ...(paidBase?[{account:cash!.account,cashId:cash!.id,debit:paidBase,credit:0}]:[]),
                    ...(dueBase?[{account:'130',partyId:d.partyId,debit:dueBase,credit:0}]:[]),
                    {account:'400',debit:0,credit:inventoryTotal},...(taxBase?[{account:'240',debit:0,credit:taxBase}]:[]),{account:'500',debit:cogs,credit:0},{account:'120',debit:0,credit:cogs}]);
            } else {
                entry(workspace,number,d.date,d.branchId,'فاتورة مشتريات',[
                    {account:'120',debit:inventoryTotal,credit:0},...(taxBase?[{account:'165',debit:taxBase,credit:0}]:[]),
                    ...(paidBase?[{account:cash!.account,cashId:cash!.id,debit:0,credit:paidBase}]:[]),
                    ...(dueBase?[{account:'210',partyId:d.partyId,debit:0,credit:dueBase}]:[])]);
            }
        }
        workspace.invoices = old ? workspace.invoices.map(invoice => invoice.id === id ? doc : invoice) : [...workspace.invoices, doc];
        audit(workspace, d.status === 'draft' ? 'حفظ مسودة بلا أثر' : 'حفظ نهائي', number);
    }
    else if (type === 'deleteDraft') {
        const p = z.object({ id: strSchema }).parse(raw);
        const d = workspace.invoices.find(invoice => invoice.id === p.id);
        if (!d || d.status !== 'draft')
            fail('الحذف للمسودات فقط');
        workspace.invoices = workspace.invoices.filter(invoice => invoice.id !== p.id);
        audit(workspace, 'حذف مسودة', d.number);
    }
    else if (type === 'return') {
        const p = z.object({ id: strSchema, date: dateSchema, note:z.string().max(1000).default('') }).parse(raw);
        year(workspace, p.date);
        const d = workspace.invoices.find(invoice => invoice.id === p.id);
        if (!d || d.status !== 'final' || d.reversedBy)
            fail('المستند غير مؤهل لمرتجع كامل');
        if (p.date < d.date)
            fail('تاريخ المرتجع قبل الفاتورة');
        if(workspace.movements.some(m=>m.warehouseId===d.warehouseId&&m.date>p.date))fail('تاريخ المرتجع يسبق حركة لاحقة للمخزن');
        if(workspace.invoiceReturns?.some(r=>r.sourceId===d.id))fail('توجد مرتجعات جزئية؛ استخدم شاشة المرتجع لإرجاع المتبقي');
        const ref = 'RET-' + d.number;
        for (const invoiceLine of d.lines) {
            const product = workspace.products.find(product => product.id === invoiceLine.productId)!;
            const qty = (invoiceLine.qty + (d.kind === 'purchase' ? invoiceLine.free : 0)) * product.units[invoiceLine.unit].factor;
            move(workspace, invoiceLine.productId, d.warehouseId, d.kind === 'sale' ? qty : -qty, d.kind === 'sale' ? invoiceLine.cost : -invoiceLine.cost, ref, p.date, 'مرتجع كامل');
        }
        const e = workspace.entries.find(entry => entry.reference === d.number)!;
        entry(workspace, ref, p.date, d.branchId, 'مرتجع كامل ' + d.number+(p.note?' — '+p.note:''), e.lines.map(journalLine => ({ ...journalLine, debit: journalLine.credit, credit: journalLine.debit })));
        d.reversedBy = ref;
        if(actor){d.returnedById=actor.id;d.returnedByName=actor.name;}
        audit(workspace, 'مرتجع كامل', ref);
    }
    else if (type === 'expense') {
        const p = z.object({ date: dateSchema, branchId: strSchema, category: strSchema, description: strSchema, amount: positiveSchema, currency: strSchema, rate: positiveSchema }).parse(raw);
        year(workspace, p.date);
        if (!workspace.branches.some(branch => branch.id === p.branchId))
            fail('فرع غير موجود');
        if (!workspace.currencies.some(c => c.code === p.currency) || (p.currency === workspace.organization.currency && p.rate !== 1))
            fail('العملة أو سعر الصرف غير صحيح');
        const id = uid(), value = money(p.amount * p.rate);
        workspace.expenses.push({ ...p, id });
        entry(workspace, 'EXP-' + String(workspace.expenses.length).padStart(4, '0'), p.date, p.branchId, p.description, [{ account: '510', debit: value, credit: 0 }, { account: '101', debit: 0, credit: value }]);
        audit(workspace, 'حفظ مصروف نقدي', p.description);
    }
    else if (type === 'voucher') { applyVoucher(workspace,raw,actor); }
    else if (type === 'transfer') {
        const p = z.object({ productId: strSchema, from: strSchema, to: strSchema, qty: positiveSchema, date: dateSchema }).parse(raw);
        year(workspace, p.date);
        if (p.from === p.to)
            fail('اختر مخزنين مختلفين');
        if (!workspace.warehouses.some(warehouse => warehouse.id === p.from && warehouse.active) || !workspace.warehouses.some(warehouse => warehouse.id === p.to && warehouse.active))
            fail('مخزن غير متاح');
        const x = stock(workspace, p.productId, p.from), v = x.qty ? money(x.value / x.qty * p.qty) : 0, ref = 'TRF-' + (workspace.movements.length + 1);
        move(workspace, p.productId, p.from, -p.qty, -v, ref, p.date, 'تحويل صادر');
        move(workspace, p.productId, p.to, p.qty, v, ref, p.date, 'تحويل وارد');
        const source = workspace.warehouses.find(warehouse => warehouse.id === p.from)!, dest = workspace.warehouses.find(warehouse => warehouse.id === p.to)!;
        if (source.branchId !== dest.branchId) {
            const amount = money(v);
            entry(workspace, ref + '-OUT', p.date, source.branchId, 'تحويل مخزون لفرع آخر', [{ account: '150', debit: amount, credit: 0 }, { account: '120', debit: 0, credit: amount }]);
            entry(workspace, ref + '-IN', p.date, dest.branchId, 'استلام مخزون من فرع آخر', [{ account: '120', debit: amount, credit: 0 }, { account: '150', debit: 0, credit: amount }]);
        }
        audit(workspace, 'تحويل مخزني بالوحدة الأساسية', ref);
    }
    else if (type === 'organization') {
        const p = z.object({ name: strSchema, address: z.string().max(200), phone: z.string().max(40), multiBranch: z.boolean(), policyApproved: z.boolean() }).parse(raw);
        Object.assign(workspace.organization, p);
        audit(workspace, 'حفظ بيانات المنشأة', p.name);
    }
    else if (type === 'branch') {
        const p = z.object({ id:z.string().optional(), name: strSchema, address: z.string().max(200), active:z.boolean().default(true) }).parse(raw);
        const old=workspace.branches.find(branch=>branch.id===p.id);
        if(p.id&&!old)fail('الفرع غير موجود');
        if(!p.active && workspace.warehouses.some(warehouse=>warehouse.branchId===p.id&&warehouse.active))fail('عطل مخازن الفرع قبل تعطيله');
        if(!p.active && !workspace.branches.some(branch=>branch.id!==p.id&&branch.active))fail('يلزم فرع نشط واحد على الأقل');
        const branch={...p,id:p.id||uid()};
        workspace.branches=old?workspace.branches.map(b=>b.id===branch.id?branch:b):[...workspace.branches,branch];
        workspace.organization.multiBranch = workspace.branches.filter(branch=>branch.active).length>1;
        audit(workspace, 'حفظ بطاقة فرع', p.name);
    }
    else if (type === 'warehouse') {
        const p = z.object({ id:z.string().optional(),name: strSchema, branchId: strSchema,active:z.boolean().default(true) }).parse(raw);
        if (!workspace.branches.some(branch => branch.id === p.branchId&&branch.active))fail('فرع غير موجود أو غير فعال');
        const old=workspace.warehouses.find(warehouse=>warehouse.id===p.id);
        if(p.id&&!old)fail('المخزن غير موجود');
        if(old&&old.branchId!==p.branchId&&(workspace.movements.some(m=>m.warehouseId===old.id)||workspace.invoices.some(invoice=>invoice.warehouseId===old.id)))fail('مخزن له حركات لا ينقل لفرع آخر');
        if(!p.active&&workspace.stocks.some(v=>v.warehouseId===p.id&&v.qty>0))fail('المخزن به أرصدة؛ صفّرها بمستند قبل التعطيل');
        const wh={...p,id:p.id||uid()};workspace.warehouses=old?workspace.warehouses.map(warehouse=>warehouse.id===wh.id?wh:warehouse):[...workspace.warehouses,wh];
        audit(workspace,'حفظ بطاقة مخزن',p.name);
    }
    else if (type === 'employee') {
        const p = z.object({ id: z.string().optional(), name: strSchema, phone: z.string().max(40), address: z.string().max(200), email: z.string().max(150), job: strSchema, branchId: strSchema, salary: numSchema, currency: strSchema, joined: dateSchema, identity: z.string().max(80), issuer: z.string().max(120), marital:z.enum(['','single','married','divorced','widowed']).optional(),issueDate:z.union([dateSchema,z.literal('')]).optional(),photo:z.string().max(110000).optional(),files:z.array(fileSchema).max(3).optional(), active: z.boolean() }).parse(raw);
        if (!workspace.branches.some(branch => branch.id === p.branchId) || !workspace.currencies.some(c => c.code === p.currency))
            fail('فرع أو عملة غير معرفة');
        const old=workspace.employees.find(employee=>employee.id===p.id);if(p.id&&!old)fail('الموظف غير موجود');
        if(p.photo&&!/^data:image\/(png|jpeg);base64,(iVBORw0KGgo|\/9j\/)[A-Za-z0-9+/=]+$/.test(p.photo))fail('صورة الموظف PNG أو JPEG فقط');
        if(old&&old.branchId!==p.branchId&&extras(workspace).operations.some(o=>o.subject===old.id))fail('موظف له حركات لا ينقل بين الفروع');
        const code=old?.code||'EMP-'+String(workspace.employees.length+1).padStart(6,'0')+'-'+uid().slice(0,4);
        const q = { ...old,...p, code, id: p.id || uid() };
        workspace.employees = workspace.employees.some(employee => employee.id === q.id) ? workspace.employees.map(employee => employee.id === q.id ? q : employee) : [...workspace.employees, q];
        audit(workspace, 'حفظ بطاقة موظف', q.name);
    }
    else if (type === 'permissions') {
        const p = z.object({ role: strSchema, permissions: z.array(strSchema).max(100) }).parse(raw);
        if (p.role === 'admin')
            fail('صلاحيات مسؤول المساحة ثابتة في هذا الإصدار');
        workspace.roles[p.role] = p.permissions;
        audit(workspace, 'تحديث نموذج صلاحيات دور', p.role);
    }
    else if (!applyStockDocument(workspace,type,raw) && !applyExtended(workspace, type, raw))
        fail('عملية غير مدعومة');
    return workspace;
}
export function createSeed(): Workspace {
    const today = new Date().toISOString().slice(0, 10);
    const workspace: Workspace = { organization: { name: 'مؤسسة الأمل التجارية', address: 'تعز، شارع جمال', phone: '', multiBranch: true, currency: 'YER', year: 2026, costPolicy: 'moving_average', policyApproved: true }, branches: [{ id: 'b1', name: 'الفرع الرئيسي', address: 'تعز، شارع جمال', active: true }, { id: 'b2', name: 'فرع الحوبان', address: 'تعز، الحوبان', active: true }], warehouses: [{ id: 'w1', name: 'المخزن الرئيسي', branchId: 'b1', active: true }, { id: 'w2', name: 'مخزن الحوبان', branchId: 'b2', active: true }], products: [], parties: [{ id: 'c1', kind: 'customer', name: 'بقالة الندى', address: 'تعز، الروضة', phone: '77X XXX 101', currency: 'YER', priceType: 'wholesale', limit: 200000, active: true }, { id: 'c2', kind: 'customer', name: 'مركز الصفوة التجاري', address: 'تعز، شارع التحرير', phone: '77X XXX 202', currency: 'YER', priceType: 'retail', limit: 100000, active: true }, { id: 's1', kind: 'supplier', name: 'شركة الوفاء للتجارة', address: 'صنعاء، شارع حدة', phone: '77X XXX 303', currency: 'YER', priceType: 'wholesale', limit: 0, active: true }], employees: [{ id: 'e1', name: 'أحمد محمد', phone: '77X XXX 404', address: 'تعز', email: '', job: 'مسؤول المبيعات', branchId: 'b1', salary: 60000, currency: 'YER', joined: '2026-01-01', identity: '', issuer: '', active: true }], stocks: [], invoices: [], entries: [], movements: [], expenses: [], audit: [], processed: [], currencies: [{ code: 'YER', name: 'ريال يمني', rate: 1 }, { code: 'SAR', name: 'ريال سعودي — سعر تجريبي', rate: 160 }, { code: 'USD', name: 'دولار أمريكي — سعر تجريبي', rate: 600 }], roles: { admin: ['all'], cashier: ['sales', 'customers', 'products', 'dashboard'], warehouse: ['products', 'inventory', 'dashboard'] } };
    const names = [['بسكويت الشاي', 'بسكويت', 12000, 15000, 14400], ['أرز بسمتي فاخر', 'أرز', 18000, 22500, 21000], ['زيت دوار الشمس', 'زيت', 24000, 30000, 28500], ['حليب كامل الدسم', 'حليب', 15000, 19000, 18000], ['سكر أبيض ناعم', 'سكر', 13000, 16500, 15500], ['مياه معدنية', 'مياه', 5000, 6500, 6000]] as const;
    names.forEach((a, i) => { workspace.products.push({ id: 'p' + (i + 1), code: 'ITM-000' + (i + 1), name: a[0], category: 2, units: [{ name: 'كرتون', factor: 12, purchase: a[2], retail: a[3], wholesale: a[4], barcode: '6280000000' + (i + 1) }, { name: 'حبة', factor: 1, purchase: a[2] / 12, retail: a[3] / 12, wholesale: a[4] / 12, barcode: '6281000000' + (i + 1) }], min: 36, alert: true, maxDiscount: 10, active: true }); });
    workspace.entries.push({ id: uid(), reference: 'OPEN-001', date: '2026-10-01', branchId: 'b1', description: 'رصيد افتتاحي تجريبي متزن', lines: [{ account: '101', debit: 1000000, credit: 0 }, { account: '300', debit: 0, credit: 1000000 }] });
    let current = workspace;
    current = applyCommand(current, 'invoice', { kind: 'purchase', date: '2026-10-05', branchId: 'b1', warehouseId: 'w1', partyId: 's1', currency: 'YER', rate: 1, payment: 'credit', priceType: 'wholesale', status: 'final', note: 'شراء تجريبي — لا يمثل معاملات فعلية', lines: current.products.map(product => ({ productId: product.id, unit: 0, qty: 8, free: 0, price: product.units[0].purchase, discount: 0 })) });
    for (let day = 15; day <= 21; day++) {
        current = applyCommand(current, 'invoice', { kind: 'sale', date: `2026-10-${day}`, branchId: 'b1', warehouseId: 'w1', partyId: day % 2 ? 'c1' : 'c2', currency: 'YER', rate: 1, payment: day % 3 ? 'cash' : 'credit', priceType: 'retail', status: 'final', note: 'فاتورة تجريبية', lines: [{ productId: 'p' + (day % 6 + 1), unit: 1, qty: day % 4 + 3, free: 0, price: current.products[day % 6].units[1].retail, discount: 0 }] });
    }
    current = applyCommand(current, 'expense', { date: '2026-10-20', branchId: 'b1', category: 'خدمات', description: 'إنترنت الفرع — مثال تجريبي', amount: 3500, currency: 'YER', rate: 1 });
    return current;
}
