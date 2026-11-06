import type { SearchBoxProps } from '@/core/types/props/SearchBoxProps';
import { Input } from '@/shared/ui/primitives/input';
import { Search } from 'lucide-react';

export function SearchBox({
  value,
  onChange,
  placeholder = 'ابحث بالاسم أو الرمز…',
}: SearchBoxProps) {
  return (
    <div className="search-box">
      <Search size={17} />
      <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}
