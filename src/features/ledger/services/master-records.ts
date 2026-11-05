import type { MasterRecord } from '@/features/ledger/types/models/MasterRecord';
/** API extension fields are kept only when they match the existing flat master-record contract. */
export function mapMasterRecords(
  items: ReadonlyArray<{ id: string; name: string; active: boolean }>,
): MasterRecord[] {
  return items.map((item) => {
    const record: MasterRecord = { id: item.id, name: item.name, active: item.active };
    for (const [key, value] of Object.entries(item)) {
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean')
        record[key] =
          key === 'postable' && typeof value === 'boolean' ? (value ? 'yes' : 'no') : value;
    }
    return record;
  });
}
