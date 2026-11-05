import type { StockDocumentHeaderProps } from '@/features/inventory/stock-documents/types/props/StockDocumentHeaderProps';
import { allAccounts } from '@/features/ledger/public';
import { Pill } from '@/shared/ui/display/Pill';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { Input } from '@/shared/ui/primitives/input';
export function StockDocumentHeader({ model, kind }: StockDocumentHeaderProps) {
  const {
    s,
    selected,
    isReadOnly,
    date,
    setDate,
    setDirty,
    lines,
    wh,
    setWarehouse,
    own,
    to,
    setTo,
    direction,
    setDirection,
    currency,
    setCurrency,
    setRate,
    rate,
    branchId,
    offset,
    setOffset,
    note,
    setNote,
  } = model;
  return (
    <section className="panel form-panel">
      <div className="form-section-title">
        <h2>بيانات المستند</h2>
        <Pill tone={isReadOnly ? 'green' : 'amber'}>
          {selected?.reference || 'جديد'} · {isReadOnly ? 'نهائي — عرض فقط' : 'مسودة / إدخال'}
        </Pill>
      </div>
      <div className="form-grid four">
        <Field label="تاريخ المستند *">
          <Input
            type="date"
            disabled={isReadOnly}
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setDirty(true);
            }}
          />
        </Field>
        <Field label={kind === 'transfer' ? 'من المخزن *' : 'المخزن *'}>
          <Select
            disabled={isReadOnly || lines.length > 0}
            value={wh}
            onChange={(e) => {
              setWarehouse(e.target.value);
              setDirty(true);
            }}
          >
            {own.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </option>
            ))}
          </Select>
        </Field>
        {kind === 'transfer' && (
          <Field label="إلى المخزن *">
            <Select
              disabled={isReadOnly}
              value={to}
              onChange={(e) => {
                setTo(e.target.value);
                setDirty(true);
              }}
            >
              <option value="">اختر مخزن الاستلام</option>
              {s.warehouses
                .filter((warehouse) => warehouse.active && warehouse.id !== wh)
                .map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.name} —{' '}
                    {s.branches.find((branch) => branch.id === warehouse.branchId)?.name}
                  </option>
                ))}
            </Select>
          </Field>
        )}
        {kind === 'adjustment' && (
          <Field label="نوع التسوية *">
            <Select
              disabled={isReadOnly}
              value={direction}
              onChange={(e) => {
                setDirection(e.target.value as 'shortage' | 'excess');
                setDirty(true);
              }}
            >
              <option value="shortage">تسوية بالعجز — إخراج</option>
              <option value="excess">تسوية بالزيادة — إدخال</option>
            </Select>
          </Field>
        )}
        <Field label="العملة">
          <Select
            disabled={isReadOnly || kind !== 'opening' || lines.length > 0}
            value={currency}
            onChange={(e) => {
              const c = s.currencies.find((c) => c.code === e.target.value)!;
              setCurrency(c.code);
              setRate(c.rate);
              setDirty(true);
            }}
          >
            {s.currencies.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name} — {c.code}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="سعر الصرف">
          <Input
            required
            type="number"
            min=".000001"
            step="any"
            disabled={isReadOnly || currency === 'YER'}
            value={rate}
            onChange={(e) => {
              setRate(+e.target.value);
              setDirty(true);
            }}
          />
        </Field>
        <Field label="الفرع">
          <div className="input-readonly">
            {s.branches.find((branch) => branch.id === branchId)?.name}
          </div>
        </Field>
        {kind === 'opening' && (
          <Field label="الحساب المقابل لمخزون البداية *">
            <Select
              disabled={isReadOnly}
              value={offset}
              onChange={(e) => {
                setOffset(e.target.value);
                setDirty(true);
              }}
            >
              <option value="">اختر حسابًا</option>
              {Object.entries(allAccounts(s))
                .filter(
                  ([code, a]) =>
                    a.type === 'equity' &&
                    (!s.extras?.records.accounts?.find((v) => v.code === code) ||
                      s.extras.records.accounts.find((v) => v.code === code)?.postable === 'yes'),
                )
                .map(([code, a]) => (
                  <option key={code} value={code}>
                    {a.name} — {code}
                  </option>
                ))}
            </Select>
          </Field>
        )}
        <Field label="ملاحظات / سبب التسوية">
          <Input
            disabled={isReadOnly}
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
              setDirty(true);
            }}
          />
        </Field>
      </div>
    </section>
  );
}
