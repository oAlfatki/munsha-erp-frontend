import {describe,it,expect} from 'vitest';
import {readComplete,mergeResources,records} from '@/core/query/resources';
import {resourceQueryKey} from '@/core/query/resource-queries';
import {affectedOwners} from '@/core/query/invalidation';
import type {ReadPage} from '@/core/types/ReadPage';
import type {Identity} from '@/core/types/Identity';
const scope={bookId:'main',branchId:'',baseCurrency:'YER',revision:7};
function page(n:number,items:number[],total=3):ReadPage<number>{return {items,scope,pagination:{page:n,pageSize:200,totalItems:total,totalPages:2,hasNextPage:n===1}};}
describe('complete resource reads preserve ledgers rather than silently truncating them',()=>{
 it('loads every page and keeps book scope',async()=>{const calls:unknown[]=[];const result=await readComplete(async params=>{calls.push(params);return params.page===1?page(1,[1,2]):page(2,[3]);},{bookId:'main'});expect(result.items).toEqual([1,2,3]);expect(calls).toEqual([{bookId:'main',page:1,pageSize:200},{bookId:'main',page:2,pageSize:200}]);});
 it('rejects a truncated collection',async()=>{await expect(readComplete(async()=>({...page(1,[1]),pagination:{...page(1,[1]).pagination,hasNextPage:false}}),{})).rejects.toThrow('إجمالي');});
 it('rejects changed revision between pages',async()=>{await expect(readComplete(async params=>({...page(params.page!,params.page===1?[1,2]:[3]),scope:{...scope,revision:params.page!}}),{})).rejects.toThrow('تغيرت');});
 it('rejects wrong book on the next page',async()=>{await expect(readComplete(async params=>({...page(params.page!,params.page===1?[1,2]:[3]),scope:{...scope,bookId:params.page===1?'main':'other'}}),{})).rejects.toThrow('تغيرت');});
 it('rejects a page with the wrong index',async()=>{await expect(readComplete(async()=>page(2,[1,2,3]),{})).rejects.toThrow('غير مكتملة');});
 it('keeps query caches distinct for users and books',()=>{const resource={owner:'customers',id:'list',read:async()=>({patch:{}})};const user={userId:'a',kind:'local'} as Identity;expect(resourceQueryKey(resource,user,'main')).not.toEqual(resourceQueryKey(resource,{...user,userId:'b'},'main'));expect(resourceQueryKey(resource,user,'main')).not.toEqual(resourceQueryKey(resource,user,'archive'));});
 it('invalidates both ledger and stock effects of an invoice',()=>{expect(affectedOwners('invoice')).toEqual(expect.arrayContaining(['accounting','inventory','customers','suppliers','sales','purchases','dashboard']));expect(affectedOwners('periodSwitch')).toBeNull();});
 it('merges shared group collections without losing the earlier kind',()=>{const state=mergeResources([{patch:{organization:{name:'test'}} as never},{patch:records('groups',[{id:'customer',kind:'customer'}])},{patch:records('groups',[{id:'item',kind:'item'}])}]);expect(state?.extras?.records.groups).toHaveLength(2);});
});
