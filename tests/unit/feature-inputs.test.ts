import { it, expect } from "vitest";
import { mapCustomerInput } from "@/features/customers/mapper/customers-mapper";
import { mapSupplierInput } from "@/features/suppliers/mapper/suppliers-mapper";
const input={name:'Example party',address:'Taiz',phone:'123',currency:'YER',priceType:'retail' as const,limit:'1000',active:true};
it('maps screen numeric input to a typed customer request and fixes its kind',()=>{const dto=mapCustomerInput(input);expect(dto.limit).toBe(1000);expect(dto.kind).toBe('customer');expect(input.limit).toBe('1000');});
it('keeps supplier requests distinct from customer requests',()=>{expect(mapSupplierInput(input).kind).toBe('supplier');expect(()=>mapCustomerInput({...input,name:''})).toThrow();});
