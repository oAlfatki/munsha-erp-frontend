import {newId} from './id';
import { z } from 'zod';
import { Workspace, JournalLine, ACCOUNTS, money, balance } from './types';

export interface MasterRecord { id: string; name: string; active: boolean; [key: string]: string | number | boolean }
export interface OperationRecord { id: string; reference: string; kind: string; date: string; branchId: string; subject: string; amount: number; note: string; source?: string; period?: string; qty?: number; warehouseId?: string; paid?: boolean; }
export interface ExtensionData { records: Record<string, MasterRecord[]>; operations: OperationRecord[]; drafts: Record<string, Record<string, string>>; preferences: Record<string, string>; }
export function extras(workspace: Workspace): ExtensionData {
    const defaults: Record<string, MasterRecord[]> = {
        units: [...new Set(workspace.products.flatMap(product=>product.units.map(u=>u.name)))].map((name,i)=>({id:'unit-'+i,name,category:'3',active:true})),
        categories: [1,2,3].map((n)=>({id:'category-'+n,name:['','أحادية','ثنائية','ثلاثية'][n],count:n,active:true})),
        expenseTypes: [{id:'rent',name:'إيجار',active:true,account:'510'},{id:'general',name:'مصروفات عامة',active:true,account:'510'}]
    };
    return { records: {...defaults,...workspace.extras?.records}, operations:workspace.extras?.operations||[], drafts:workspace.extras?.drafts||{}, preferences:workspace.extras?.preferences||{} };
}
export function allAccounts(workspace: Workspace) {
    const result: Record<string, { name: string; type: string }> = { ...ACCOUNTS,
        '165':{name:'ضريبة مشتريات قابلة للاسترداد',type:'asset'},'240':{name:'ضريبة مبيعات مستحقة',type:'liability'},
        '140': { name: 'سلف الموظفين', type: 'asset' }, '160': { name: 'مصروفات مقدمة', type: 'asset' },
        '170': { name: 'الأصول الثابتة', type: 'asset' }, '179': { name: 'مجمع الإهلاك', type: 'asset' },
        '220': { name: 'رواتب مستحقة', type: 'liability' }, '230': { name: 'مصروفات مستحقة', type: 'liability' },
        '310': { name: 'نتائج متراكمة', type: 'equity' }, '520': { name: 'مصروف الرواتب', type: 'expense' },
        '530': { name: 'مصروف الإهلاك', type: 'expense' }, '540': { name: 'فروق الجرد', type: 'expense' }
    };
    for (const a of extras(workspace).records.accounts || []) result[String(a.code)] = { name: a.name, type: String(a.type || 'asset') };
    return result;
}
const textSchema = z.string().trim().min(1).max(200), numberSchema = z.number().finite().nonnegative();
const isoSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(d => !isNaN(Date.parse(d)) && new Date(d).toISOString().slice(0, 10) === d);
function requireValue(ok: unknown, message: string): asserts ok { if (!ok) throw Error(message); }
export function applyExtended(workspace: Workspace, type: string, raw: unknown): boolean {
    if (!['master', 'screenDraft', 'preferences', 'operation', 'manualJournal', 'currency'].includes(type)) return false;
    workspace.extras = structuredClone(extras(workspace));
    const x = workspace.extras;
    const audit = (action: string, reference: string) => { workspace.audit.unshift({ id: newId(), date: new Date().toISOString(), action, reference }); workspace.audit = workspace.audit.slice(0, 300); };
    if(type==='currency'){
        const p=z.object({name:textSchema,code:z.string().regex(/^[A-Z]{3}$/),date:isoSchema,rate:z.number().finite().positive(),source:textSchema}).parse(raw);
        requireValue(p.code!==workspace.organization.currency||p.rate===1,'سعر العملة الأساسية 1 دائمًا');
        requireValue(+p.date.slice(0,4)===workspace.organization.year,'تاريخ السعر خارج السنة الحالية');
        requireValue(p.date<=new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Aden',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()),'السعر المستقبلي لا يفعّل قبل تاريخ سريانه');
        const rates=x.records.fxRates||[];
        requireValue(!rates.some(v=>v.code===p.code&&v.date===p.date),'يوجد سعر لهذه العملة والتاريخ؛ لا يستبدل التاريخ المحفوظ');
        rates.push({...p,id:newId(),active:true});x.records.fxRates=rates;
        const previous=rates.filter(v=>v.code===p.code).sort((a,b)=>String(a.date).localeCompare(String(b.date))).at(-1)!;
        const old=workspace.currencies.find(v=>v.code===p.code);
        if(old){old.name=p.name;old.rate=Number(previous.rate);}else workspace.currencies.push({code:p.code,name:p.name,rate:p.rate});
        audit('حفظ سعر صرف مرجعي مؤرخ',p.code+' '+p.date);return true;
    }
    if (type === 'screenDraft') {
        const p = z.object({ screen: textSchema, values: z.record(z.string().max(2000)) }).parse(raw);
        x.drafts[p.screen] = p.values; audit('حفظ نموذج إعداد — بلا أثر مالي', p.screen); return true;
    }
    if (type === 'preferences') { x.preferences = { ...x.preferences, ...z.record(z.string().max(300)).parse(raw) }; audit('حفظ تفضيلات العرض', 'الإعدادات'); return true; }
    if (type === 'master') {
        const p = z.object({ collection: z.enum(['units','categories','groups','productGroups','expenseTypes','accounts','cash','assets','contacts','users']), record: z.object({ id: z.string().optional(), name: textSchema, active: z.boolean() }).catchall(z.union([z.string().max(500), z.number().finite(), z.boolean()])) }).parse(raw);
        const list = x.records[p.collection] || [];
        const record = { ...p.record, id: p.record.id || newId() } as MasterRecord;
        requireValue(!list.some(v => v.id !== record.id && v.name === record.name), 'الاسم موجود بالفعل');
        if(p.collection==='contacts'){requireValue(['debtor','creditor'].includes(String(record.kind)),'اختر نوع طرف صحيحًا');const a=x.records.accounts?.find(a=>a.code===record.account);requireValue(a?.active&&a.postable==='yes'&&!['101','120','130','140','150','160','170','179','165','240','210','220','230','300','310','400','500','510','520','530','540'].includes(String(record.account))&&a.type===(record.kind==='debtor'?'asset':'liability'),'اختر حسابًا فرعيًا مضافًا من الأصول للمدين أو الالتزامات للدائن');const old=list.find(v=>v.id===record.id);if(old&&workspace.entries.some(entry=>entry.lines.some(journalLine=>journalLine.partyId===old.id)))requireValue(old.kind===record.kind&&old.account===record.account,'لا تغير تصنيف أو حساب طرف له حركات');}
        if(p.collection==='groups'){requireValue(['customer','supplier'].includes(String(record.kind)),'اختر نوع مجموعة صحيحًا');const old=list.find(v=>v.id===record.id);if(old&&workspace.parties.some(party=>party.groupId===old.id))requireValue(old.kind===record.kind,'مجموعة مرتبطة بأطراف لا يتغير نوعها');}
        if(p.collection==='expenseTypes'){const chart=allAccounts(workspace);const code=String(record.account||'');requireValue(chart[code]?.type==='expense','اربط نوع المصروف بحساب مصروف من دليل الحسابات');}
        if (p.collection === 'categories') { requireValue([1,2,3].includes(Number(record.count)), 'عدد الوحدات 1 أو 2 أو 3'); }
        if (p.collection === 'accounts') {
            requireValue(/^[0-9]{3,12}$/.test(String(record.code)), 'رمز الحساب من 3 إلى 12 رقمًا');
            requireValue(['asset','liability','equity','revenue','expense'].includes(String(record.type)), 'تصنيف غير صحيح');
            requireValue(!allAccounts({...workspace,extras:{...x,records:{...x.records,accounts:[]}}})[String(record.code)], 'لا يمكن استبدال حساب نظام');
            requireValue(!list.some(v => v.id !== record.id && v.code === record.code), 'رمز حساب مكرر');
            const old = list.find(v => v.id === record.id);
            if (old && workspace.entries.some(entry => entry.lines.some(journalLine => journalLine.account === old.code))) requireValue(old.code === record.code && old.type === record.type, 'لا تغير رمز أو تصنيف حساب له حركات');
            if(record.parent){
                requireValue(!!allAccounts(workspace)[String(record.parent)] && record.parent !== record.code, 'اختر حساب أب مختلفًا ومعرفًا');
                const parent=list.find(v=>v.code===record.parent);
                requireValue(parent && parent.postable==='no' && parent.type===record.type, 'الحساب الأب يجب أن يكون حسابًا تجميعيًا مضافًا من التصنيف نفسه');
                const seen=new Set([String(record.code)]); let next=String(record.parent);
                while(next){requireValue(!seen.has(next), 'علاقة دائرية في دليل الحسابات');seen.add(next);next=String(list.find(v=>v.code===next)?.parent||'');}
            }
            if(record.postable==='yes')requireValue(!list.some(v=>v.id!==record.id&&v.parent===record.code), 'الحساب له أبناء ولا يصبح قابلًا للقيد');
        }
        if (p.collection === 'cash') {
            requireValue(workspace.branches.some(branch=>branch.id===record.branchId)&&workspace.currencies.some(c=>c.code===record.currency),'راجع فرع الصندوق وعملته');
            record.account=record.account||'101';const a=allAccounts(workspace)[String(record.account)],custom=x.records.accounts?.find(a=>a.code===record.account);
            requireValue(a?.type==='asset'&&!['120','130','140','150','160','170','179','165'].includes(String(record.account))&&(!custom||custom.active&&custom.postable==='yes'),'اربط الصندوق بحساب نقدي من الأصول قابل للقيد');
            const old=list.find(c=>c.id===record.id);
            if(old&&workspace.entries.some(entry=>entry.lines.some(journalLine=>journalLine.cashId===old.id)))requireValue(['branchId','currency','account'].every(k=>(old[k]|| (k==='account'?'101':''))===record[k]),'لا تغير فرع أو عملة أو حساب صندوق له حركات');
        }
        if (p.collection === 'assets') {
            const previous=list.find(v=>v.id===record.id);
            record.code=previous?.code||'AST-'+String(list.length+1).padStart(5,'0');
            record.purchaseDate=record.purchaseDate||record.ready;
            requireValue(isoSchema.safeParse(record.purchaseDate).success && String(record.purchaseDate)<=String(record.ready),'تاريخ الشراء لا يتجاوز تاريخ الجاهزية');
            requireValue(!record.method||['straight-line','variable'].includes(String(record.method)),'اختر طريقة إهلاك صحيحة');

            requireValue(Number(record.cost) >= 0 && Number(record.residual) >= 0 && Number(record.residual) <= Number(record.cost) && Number(record.life) > 0, 'راجع التكلفة والعمر والقيمة التخريدية');
            requireValue(isoSchema.safeParse(record.ready).success && workspace.branches.some(branch=>branch.id===record.branchId), 'راجع تاريخ الجاهزية والفرع');
            const old = list.find(v=>v.id===record.id);
            if(old && x.operations.some(v=>v.subject===old.id && v.kind==='assetPurchase')) requireValue(['cost','residual','life','ready','branchId'].every(k=>old[k]===record[k]) && String(old.purchaseDate||old.ready)===String(record.purchaseDate) && String(old.method||'straight-line')===String(record.method||'straight-line'), 'لا تغير بيانات قياس أصل مثبت؛ يلزم إجراء تعديل موثق');
        }
        x.records[p.collection] = list.some(v => v.id === record.id) ? list.map(v => v.id === record.id ? record : v) : [...list, record];
        audit('حفظ سجل تعريفي — بلا قيد', record.name); return true;
    }
    const addEntry = (reference: string, date: string, branchId: string, description: string, lines: JournalLine[]) => {
        const dr = money(lines.reduce((n,journalLine) => n+journalLine.debit,0)), cr = money(lines.reduce((n,journalLine) => n+journalLine.credit,0));
        requireValue(dr > 0 && dr === cr, 'القيد يجب أن يكون متزنًا وغير صفري');
        workspace.entries.push({ id: newId(), reference, date, branchId, description, lines });
    };
    if (type === 'manualJournal') {
        const p = z.object({ date: isoSchema, branchId: textSchema, note: textSchema, lines: z.array(z.object({ account: textSchema, debit: numberSchema, credit: numberSchema })).min(2).max(100) }).parse(raw);
        requireValue(+p.date.slice(0,4) === workspace.organization.year && workspace.branches.some(branch => branch.id === p.branchId), 'راجع السنة والفرع');
        const a = allAccounts(workspace);
        for (const l of p.lines) {
            requireValue(!(x.records.contacts||[]).some(c=>c.account===l.account),'استخدم مستند الطرف المتنوع لحسابه الرقابي');
            requireValue(!!a[l.account] && !['120','130','140','150','160','170','179','165','240','210','220','230'].includes(l.account), 'الحساب الرقابي يُحدث من مستنده، وليس بقيد يدوي');
            const custom = x.records.accounts?.find(a=>a.code===l.account);
            requireValue(!custom || (custom.active && custom.postable === 'yes'), 'الحساب غير فعال أو تجميعي غير قابل للقيد');
            requireValue((l.debit > 0) !== (l.credit > 0), 'كل سطر مدين أو دائن فقط');
        }
        const ref = 'JRN-' + (workspace.entries.length + 1); addEntry(ref,p.date,p.branchId,p.note,p.lines); audit('حفظ قيد يدوي',ref); return true;
    }
    const p = z.object({ kind: z.enum(['payroll','salaryPayment','advance','count','adjustment','assetPurchase','depreciation','accruedExpense','settleExpense','prepaidExpense','consumePrepaid']), date: isoSchema, branchId: textSchema, subject: textSchema, amount: numberSchema.default(0), note: z.string().max(500), source: z.string().optional(), period: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/).optional(), qty: numberSchema.optional(), warehouseId: z.string().optional() }).parse(raw);
    requireValue(+p.date.slice(0,4) === workspace.organization.year && workspace.branches.some(branch => branch.id === p.branchId && branch.active), 'التاريخ خارج السنة المفتوحة أو الفرع غير فعال');
    const ref = p.kind.toUpperCase() + '-' + String(x.operations.length + 1).padStart(4,'0');
    const op: OperationRecord = { ...p, id: newId(), reference: ref };
    const lines = (debit: string, credit: string, amount: number, partyId?: string): JournalLine[] => [{ account: debit, debit: amount, credit: 0, partyId }, { account: credit, debit: 0, credit: amount, partyId }];
    const bySubject = (kind: string) => x.operations.filter(v => v.kind === kind && v.subject === p.subject);
    if (p.kind === 'count' || p.kind === 'adjustment') {
        const wh = workspace.warehouses.find(warehouse => warehouse.id === p.warehouseId && warehouse.branchId === p.branchId && warehouse.active), product = workspace.products.find(product => product.id === p.subject && product.active);
        requireValue(wh && product && p.qty !== undefined, 'اختر الصنف والمخزن والعدد الفعلي');
        const st = workspace.stocks.find(v => v.productId === p.subject && v.warehouseId === wh.id);
        if (p.kind === 'adjustment') {
            const count = x.operations.find(v => v.id === p.source && v.kind === 'count' && v.subject === p.subject && v.warehouseId === wh.id);
            requireValue(count && !x.operations.some(v => v.source === count.id), 'اختر محضر جرد لم يسوّ بعد');
            requireValue(count.date <= p.date, 'تاريخ التسوية لا يسبق الجرد');
            requireValue(!workspace.movements.some(m => m.productId === p.subject && m.warehouseId === wh.id && m.date >= count.date), 'توجد حركات في يوم الجرد أو بعده؛ أعد العد قبل التسوية');
            requireValue(p.qty === count.qty, 'الكمية الفعلية يجب أن تطابق المحضر');
            requireValue(st && st.qty > 0, 'تسوية صنف بلا تكلفة تحتاج مستند افتتاح موثق');
            const delta = +(p.qty - st.qty).toFixed(6), value = money(delta * st.value / st.qty);
            requireValue(delta !== 0 && value !== 0, 'لا يوجد فرق قابل للتسوية');
            st.qty = p.qty; st.value = money(st.value + value); op.amount = Math.abs(value);
            workspace.movements.push({ id: newId(), reference: ref, date: p.date, productId: product.id, warehouseId: wh.id, qty: delta, value, kind: 'تسوية جرد' });
            addEntry(ref,p.date,p.branchId,p.note || 'تسوية جرد',value > 0 ? lines('120','540',value) : lines('540','120',-value));
        }
    } else if (p.kind === 'payroll' || p.kind === 'advance') {
        const employee = workspace.employees.find(employee => employee.id === p.subject && employee.active && employee.branchId === p.branchId);
        requireValue(employee && employee.currency === workspace.organization.currency && p.amount > 0, 'اختر موظفًا نشطًا بعملة أساسية ومبلغًا موجبًا');
        if (p.kind === 'payroll') { requireValue(p.period && +p.period.slice(0,4) === workspace.organization.year && p.date.slice(0,7) >= p.period, 'راجع فترة الراتب وتاريخ الإثبات'); requireValue(!bySubject('payroll').some(v => v.period === p.period), 'راتب الموظف مثبت لهذه الفترة'); }
        addEntry(ref,p.date,p.branchId,p.note || 'حركة موظف',p.kind === 'payroll' ? lines('520','220',money(p.amount),p.subject) : lines('140','101',money(p.amount),p.subject));
    } else if (p.kind === 'salaryPayment' || p.kind === 'settleExpense') {
        const sourceKind = p.kind === 'salaryPayment' ? 'payroll' : 'accruedExpense';
        const source = x.operations.find(v => v.id === p.source && v.kind === sourceKind && v.branchId === p.branchId);
        requireValue(source && !source.paid && p.date >= source.date, 'المصدر غير متاح أو سُدد أو تاريخ السداد قبله');
        op.subject = source.subject; op.amount = source.amount; source.paid = true;
        addEntry(ref,p.date,p.branchId,p.note || 'سداد كامل',lines(p.kind === 'salaryPayment' ? '220' : '230','101',source.amount,source.subject));
    } else if (p.kind === 'assetPurchase') {
        const asset = x.records.assets?.find(v => v.id === p.subject && v.active && v.branchId === p.branchId);
        requireValue(asset && Number(asset.cost) > 0 && !bySubject('assetPurchase').length, 'الأصل غير متاح أو تم إثباته سابقًا');
        requireValue(String(asset.ready || p.date) >= p.date, 'تاريخ الاقتناء لا يتجاوز تاريخ الجاهزية');
        op.amount = money(Number(asset.cost)); addEntry(ref,p.date,p.branchId,'اقتناء أصل: '+asset.name,lines('170','101',op.amount));
    } else if (p.kind === 'depreciation') {
        const asset = x.records.assets?.find(v => v.id === p.subject), purchase = bySubject('assetPurchase')[0];
        requireValue(asset && purchase && p.period && !bySubject('depreciation').some(v => v.period === p.period), 'الأصل غير مثبت أو الفترة مكررة');
        requireValue(p.period >= String(asset.ready || purchase.date).slice(0,7) && p.period <= p.date.slice(0,7), 'فترة الإهلاك قبل الجاهزية أو بعد تاريخ الإثبات');
        const used = bySubject('depreciation').reduce((n,v) => n+v.amount,0), remaining = money(Number(asset.cost)-Number(asset.residual)-used);
        if(asset.method==='variable'){requireValue(p.amount>0 && money(p.amount)<=remaining,'قسط الفترة يجب أن يكون موجبًا ولا يتجاوز المتبقي القابل للإهلاك');op.amount=money(p.amount);}else op.amount = money(Math.min(remaining,(Number(asset.cost)-Number(asset.residual))/(Number(asset.life)*12)));
        requireValue(op.amount > 0, 'الأصل مستهلك بالكامل'); addEntry(ref,p.date,p.branchId,(asset.method==='variable'?'إهلاك بقسط متغير: ':'إهلاك بالقسط الثابت: ')+asset.name,lines('530','179',op.amount));
    } else if (p.kind === 'accruedExpense' || p.kind === 'prepaidExpense') {
        requireValue(p.amount > 0, 'أدخل مبلغًا موجبًا');
        addEntry(ref,p.date,p.branchId,p.note || p.subject,p.kind === 'accruedExpense' ? lines('510','230',money(p.amount)) : lines('160','101',money(p.amount)));
    } else if (p.kind === 'consumePrepaid') {
        const source = x.operations.find(v => v.id === p.source && v.kind === 'prepaidExpense' && v.branchId === p.branchId);
        requireValue(source && p.period && p.date >= source.date && !x.operations.some(v => v.kind === p.kind && v.source === source.id && v.period === p.period), 'مصدر غير صحيح أو فترة مكررة');
        const used = x.operations.filter(v => v.kind === p.kind && v.source === source.id).reduce((n,v) => n+v.amount,0);
        requireValue(p.amount > 0 && money(p.amount+used) <= source.amount, 'المبلغ يتجاوز المتبقي'); op.subject = source.subject;
        addEntry(ref,p.date,p.branchId,p.note || 'استهلاك مصروف مقدم',lines('510','160',money(p.amount)));
    }
    x.operations.push(op); audit(p.kind === 'count' ? 'حفظ محضر عد — دون أثر مخزني' : 'حفظ مستند نهائي',ref); return true;
}
