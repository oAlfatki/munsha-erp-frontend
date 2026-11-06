import { fmt } from '@/core/utils/formatters';
import type { StockDocumentLinesProps } from '@/features/inventory/stock-documents/types/props/StockDocumentLinesProps';
import { Select } from '@/shared/ui/forms/Select';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { Plus, Trash2 } from 'lucide-react';
export function StockDocumentLines({ model, kind }: StockDocumentLinesProps) {
  const {
    s,
    isReadOnly,
    setDirty,
    lines,
    wh,
    direction,
    currency,
    match,
    add,
    searchQuery,
    setQ,
    update,
    stockValue,
    setLines,
  } = model;
  return (
    <section className="panel form-panel">
      <h2>{kind === 'opening' ? 'بنود مخزون البداية' : 'بنود المستند'}</h2>
      {!isReadOnly && (
        <div className="stock-item-search">
          <Input
            aria-label="بحث صنف للمستند المخزني"
            placeholder="اسم الصنف أو الرمز أو الباركود…"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (match.length) add(match[0].id);
              }
            }}
            value={searchQuery}
            onChange={(e) => setQ(e.target.value)}
          />
          {searchQuery && (
            <div className="stock-item-results">
              {match.map((product) => (
                <Button
                  type="button"
                  key={product.id}
                  variant="ghost"
                  onClick={() => add(product.id)}
                >
                  {product.name} — {product.code}
                  <Plus size={15} />
                </Button>
              ))}
              {!match.length && <p>الصنف غير موجود.</p>}
            </div>
          )}
        </div>
      )}
      <div className="table-scroll">
        <table className="data-table line-table">
          <thead>
            <tr>
              <th>اسم الصنف</th>
              <th>الوحدة</th>
              <th>الكمية</th>
              {kind === 'adjustment' && (
                <>
                  <th>الرصيد الأساسي عند المراجعة</th>
                  <th>الرصيد المتوقع بعدها</th>
                </>
              )}
              <th>
                {kind === 'opening' ? 'تكلفة الوحدة ' + currency : 'تكلفة الوحدة الدفترية YER'}
              </th>
              <th>الإجمالي YER</th>
              {!isReadOnly && <th>حذف</th>}
            </tr>
          </thead>
          <tbody>
            {lines.map((l, i) => {
              const product = s.products.find((product) => product.id === l.productId)!;
              const qty = l.qty * product.units[l.unit].factor;
              return (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>
                    <Select
                      disabled={isReadOnly}
                      value={l.unit}
                      onChange={(e) => update(i, 'unit', +e.target.value)}
                    >
                      {product.units.map((u, j) => (
                        <option key={j} value={j}>
                          {u.name}
                        </option>
                      ))}
                    </Select>
                  </td>
                  <td>
                    <Input
                      aria-label={'كمية ' + product.name}
                      required
                      type="number"
                      min=".000001"
                      step="any"
                      disabled={isReadOnly}
                      value={l.qty}
                      onChange={(e) => update(i, 'qty', +e.target.value)}
                    />
                  </td>
                  {kind === 'adjustment' && (
                    <>
                      <td>{fmt(l.expectedQty || 0)}</td>
                      <td>{fmt((l.expectedQty || 0) + (direction === 'shortage' ? -qty : qty))}</td>
                    </>
                  )}
                  <td>
                    {kind === 'opening' ? (
                      <Input
                        aria-label={'تكلفة ' + product.name}
                        required
                        type="number"
                        min=".01"
                        step="any"
                        disabled={isReadOnly}
                        value={l.price}
                        onChange={(e) => update(i, 'price', +e.target.value)}
                      />
                    ) : (
                      fmt(l.qty ? stockValue(l) / l.qty : 0)
                    )}
                  </td>
                  <td>{fmt(stockValue(l))}</td>
                  {!isReadOnly && (
                    <td>
                      <Button
                        type="button"
                        aria-label="حذف بند مخزني"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setLines(lines.filter((unusedValue, j) => j !== i));
                          setDirty(true);
                        }}
                      >
                        <Trash2 size={15} />
                      </Button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {kind === 'adjustment' && !isReadOnly && (
        <Button
          type="button"
          className="mt-4"
          variant="outline"
          onClick={() => {
            setLines(
              lines.map((l) => ({
                ...l,
                expectedQty:
                  s.stocks.find((v) => v.productId === l.productId && v.warehouseId === wh)?.qty ||
                  0,
                value: undefined,
              })),
            );
            setDirty(true);
          }}
        >
          تحديث الرصيد الدفتري للمراجعة
        </Button>
      )}
    </section>
  );
}
