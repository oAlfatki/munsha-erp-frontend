import { useLookupOptions } from "@/features/settings/queries/useLookupOptions";
import type { DynamicFieldProps } from "@/features/settings/types/DynamicFieldProps";
import { DynamicField } from "@/shared/ui/forms/DynamicField";
export function LookupField({field,value,onChange}:DynamicFieldProps){const options=useLookupOptions(field);return <DynamicField field={field} value={value} onChange={onChange} options={options}/>;}
