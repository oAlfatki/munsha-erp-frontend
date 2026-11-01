import {money} from './types';
import type {InvoiceLine} from './types';
export function allocateInvoiceDiscount<TData extends Pick<InvoiceLine,'qty'|'price'|'discount'>>(lines:TData[],amount:number): (TData&{invoiceDiscount:number})[]{
 const cents=lines.map(l=>Math.round(money(l.qty*l.price*(1-l.discount/100))*100)),total=cents.reduce((n,v)=>n+v,0),target=Math.round(amount*100);
 if(!Number.isFinite(amount)||amount<0||target>total)throw Error('خصم الفاتورة يجب أن يكون بين صفر وصافي الأصناف');
 if(!Number.isSafeInteger(total)||!Number.isSafeInteger(target)||cents.some(v=>!Number.isSafeInteger(v)||v<0))throw Error('قيمة الفاتورة خارج حدود الحساب');
 const shares=cents.map(v=>total?Number(BigInt(target)*BigInt(v)/BigInt(total)):0);let left=target-shares.reduce((n,v)=>n+v,0);
 for(let i=0;left>0&&i<shares.length;i++)if(shares[i]<cents[i]){shares[i]++;left--;}
 return lines.map((l,i)=>({...l,invoiceDiscount:shares[i]/100}));
}
