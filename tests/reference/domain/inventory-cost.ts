import {Workspace,money} from './types';
import {quantityByUnits} from './inventory-display';
export interface CostFilters{from:string;to:string;warehouse:string;group:string;product:string;excludeZero:boolean;priceType:'retail'|'wholesale';}
export function inventoryCost(workspace:Workspace,branch:string,f:CostFilters){
 const warehouses=workspace.warehouses.filter(w=>w.branchId===branch&&(!f.warehouse||w.id===f.warehouse));
 const moves=workspace.movements.filter(m=>warehouses.some(warehouse=>warehouse.id===m.warehouseId)&&m.date<=f.to);
 const rows=workspace.products.filter(p=>(!f.group||p.groupId===f.group)&&(!f.product||p.id===f.product)).map(product=>{
  const ms=moves.filter(m=>m.productId===product.id),qty=+ms.reduce((n,m)=>n+m.qty,0).toFixed(6),cost=money(ms.reduce((n,m)=>n+m.value,0)),average=qty?cost/qty:0,price=product.units.at(-1)![f.priceType];
  return{code:product.code,name:product.name,units:quantityByUnits(qty,product.units),qty,average,cost,price,saleValue:money(qty*price)};
 }).filter(r=>!f.excludeZero||r.qty!==0||r.cost!==0);
 return{rows,cost:money(rows.reduce((n,r)=>n+r.cost,0)),sale:money(rows.reduce((n,r)=>n+r.saleValue,0)),movements:moves.filter(m=>(!f.from||m.date>=f.from)&&rows.some(r=>workspace.products.find(product=>product.id===m.productId)?.code===r.code)).length};
}
