import { fmt } from '@/core/utils/formatters';
import { systemSettings } from '@/features/organization/public';
import { lineTotal } from '@/features/trade/services/line-total';
import {
  invoiceEntryLine,
  invoiceItemMatches,
} from '@/features/trade/services/models/invoice-entry';
import type { InvoiceLine } from '@/features/trade/types/models/InvoiceLine';
import type { ItemMatch } from '@/features/trade/types/models/ItemMatch';
import type { InvoiceLineGridProps } from '@/features/trade/types/props/InvoiceLineGridProps';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { Plus, Trash2 } from 'lucide-react';
import { useLayoutEffect, useRef, useState } from 'react';

export function InvoiceLineGrid({
  state: workspace,
  lines,
  onChange,
  kind,
  priceType,
  rate,
  currency,
  warehouseId,
  isReadOnly: isReadOnly,
  onAddProduct,
  onPendingChange,
}: InvoiceLineGridProps) {
  const root = useRef<HTMLDivElement>(null),
    [editing, setEditing] = useState<number | null>(null),
    [query, setQuery] = useState(''),
    [isOpen, setOpen] = useState(false),
    [choice, setChoice] = useState(0),
    [error, setError] = useState(''),
    [active, setActive] = useState(0),
    [focus, setFocus] = useState<{
      row: number;
      column: string;
      sequence: number;
    } | null>(null);
  const isSale = kind === 'sale',
    matches = invoiceItemMatches(workspace, query, kind),
    current = lines[active],
    product = workspace.products.find((product) => product.id === current?.productId),
    available = (id: string, unit: number) =>
      (workspace.stocks.find((v) => v.productId === id && v.warehouseId === warehouseId)?.qty ||
        0) / (workspace.products.find((product) => product.id === id)?.units[unit]?.factor || 1);
  useLayoutEffect(() => {
    if (!focus) return;
    const input = root.current?.querySelector<HTMLElement>(
      `[data-row="${focus.row}"][data-column="${focus.column}"]`,
    );
    input?.focus();
    if (input instanceof HTMLInputElement) input.select();
  }, [focus, lines.length]);
  const move = (row: number, column = 'item') => {
    setEditing(null);
    setOpen(false);
    setError('');
    setQuery('');
    onPendingChange(false);
    setFocus({ row, column, sequence: Date.now() });
  };
  const commit = (match: ItemMatch, index: number, next: 'row' | 'column') => {
    const line = invoiceEntryLine(match, kind, priceType, rate);
    onChange(
      index === lines.length
        ? [...lines, line]
        : lines.map((invoiceLine, i) => (i === index ? line : invoiceLine)),
    );
    setActive(index);
    move(
      next === 'row' ? Math.min(index + 1, lines.length + 1) : index,
      next === 'row' ? 'item' : 'unit',
    );
  };
  const choose = (index: number, next: 'row' | 'column') => {
    const name = workspace.products.find((product) => product.id === lines[index]?.productId)?.name;
    if (index < lines.length && query.trim() === name) {
      move(
        next === 'row' ? Math.min(index + 1, lines.length) : index,
        next === 'row' ? 'item' : 'unit',
      );
      return;
    }
    const exact = matches.find((m) => m.barcode) || matches[choice];
    if (!query.trim()) return;
    if (!exact) {
      setError('الصنف غير موجود');
      onPendingChange(true);
      return;
    }
    commit(exact, index, next);
  };
  const update = (index: number, key: keyof InvoiceLine, value: number) =>
    onChange(
      lines.map((invoiceLine, i) => {
        if (i !== index) return invoiceLine;
        if (key === 'unit') {
          const product = workspace.products.find(
            (product) => product.id === invoiceLine.productId,
          )!;
          return {
            ...invoiceLine,
            unit: value,
            price: +(
              (isSale ? product.units[value][priceType] : product.units[value].purchase) / rate
            ).toFixed(4),
          };
        }
        return { ...invoiceLine, [key]: value };
      }),
    );
  const search = (index: number) => {
    const p = workspace.products.find((product) => product.id === lines[index]?.productId),
      isEditing = editing === index;
    return (
      <div className="grid-item-search">
        <Input
          data-row={index}
          data-column="item"
          aria-label={'بحث الصنف في الصف ' + (index + 1)}
          autoComplete="off"
          autoFocus={!lines.length && index === 0}
          placeholder="اسم الصنف أو الباركود…"
          value={isEditing ? query : p?.name || ''}
          aria-expanded={isEditing && isOpen && matches.length > 0}
          aria-controls={isEditing ? 'invoice-grid-matches' : undefined}
          aria-invalid={isEditing && !!error}
          onFocus={() => {
            setActive(Math.min(index, Math.max(0, lines.length - 1)));
            if (editing !== index) {
              setEditing(index);
              setQuery(p?.name || '');
              setOpen(false);
              setChoice(0);
              setError('');
              onPendingChange(false);
            }
          }}
          onChange={(e) => {
            setEditing(index);
            setQuery(e.target.value);
            setChoice(0);
            setOpen(true);
            setError('');
            onPendingChange(!!e.target.value.trim() && e.target.value.trim() !== p?.name);
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
              e.preventDefault();
              setOpen(true);
              setChoice((v) =>
                !isOpen
                  ? 0
                  : Math.max(0, Math.min(matches.length - 1, v + (e.key === 'ArrowDown' ? 1 : -1))),
              );
            } else if (e.key === 'Enter') {
              e.preventDefault();
              choose(index, 'row');
            } else if (e.key === 'Tab' && !e.shiftKey && query.trim() && query.trim() !== p?.name) {
              e.preventDefault();
              choose(index, 'column');
            } else if (e.key === 'Escape') {
              setEditing(null);
              setOpen(false);
              setError('');
              onPendingChange(false);
            }
          }}
        />
        {isEditing && (error || (isOpen && query.trim() && !matches.length)) && (
          <small className="field-error" role="alert">
            الصنف غير موجود
          </small>
        )}
        {isEditing && isOpen && matches.length > 0 && (
          <div className="grid-item-results" id="invoice-grid-matches" role="listbox">
            {matches.map((m, i) => (
              <button
                key={m.product.id + ':' + m.unit}
                type="button"
                role="option"
                aria-selected={choice === i}
                className={choice === i ? 'active' : ''}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => commit(m, index, 'row')}
              >
                <strong>{m.product.name}</strong>
                <small>
                  {m.product.units[m.unit].name} · {m.barcode ? 'باركود الوحدة' : m.product.code}
                </small>
                <small className="invoice-hint">
                  المتاح: {fmt(available(m.product.id, m.unit))}
                </small>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };
  return (
    <section className="panel form-panel invoice-lines" ref={root}>
      <div className="form-section-title">
        <h2>
          أصناف الفاتورة <span className="muted text-sm">{lines.length} بنود</span>
        </h2>
        <p className="muted text-sm no-print">Enter للصف التالي · Tab للعمود التالي</p>
      </div>
      <div className="table-scroll invoice-grid-scroll">
        <table className="data-table line-table invoice-entry-grid">
          <thead>
            <tr>
              <th>
                <span className="grid-first-heading">
                  اسم الصنف / الباركود{' '}
                  {!isReadOnly && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label="إضافة صنف إلى الدليل"
                      title="إضافة صنف"
                      onClick={onAddProduct}
                    >
                      <Plus size={17} />
                    </Button>
                  )}
                </span>
              </th>
              <th>الوحدة</th>
              <th>
                الكمية{' '}
                {current && (
                  <small className="invoice-hint">
                    المتاح: {fmt(available(current.productId, current.unit))}{' '}
                    {product?.units[current.unit]?.name}
                  </small>
                )}
              </th>
              {!isSale && <th>زيادة مجانية</th>}
              <th>السعر · {currency}</th>
              <th>
                خصم %{' '}
                {product && (
                  <small className="invoice-hint">
                    المسموح:{' '}
                    {isSale
                      ? Math.min(product.maxDiscount, systemSettings(workspace).sales.maxDiscount)
                      : 100}
                    %
                  </small>
                )}
              </th>
              <th>الصافي</th>
              {!isReadOnly && <th>حذف</th>}
            </tr>
          </thead>
          <tbody>
            {lines.map((invoiceLine, index) => {
              const product = workspace.products.find(
                (product) => product.id === invoiceLine.productId,
              )!;
              return (
                <tr
                  key={index}
                  onFocus={() => setActive(index)}
                  onKeyDown={(e) => {
                    if (
                      e.key === 'Enter' &&
                      (e.target instanceof HTMLInputElement ||
                        e.target instanceof HTMLSelectElement) &&
                      (e.target as HTMLElement).dataset.column !== 'item'
                    ) {
                      e.preventDefault();
                      move(Math.min(index + 1, lines.length));
                    }
                  }}
                >
                  <td>
                    {isReadOnly ? <strong>{product.name}</strong> : search(index)}
                    <small className="block muted">{product.code}</small>
                  </td>
                  <td>
                    <Select
                      data-row={index}
                      data-column="unit"
                      disabled={isReadOnly}
                      aria-label={'الوحدة في الصف ' + (index + 1)}
                      value={invoiceLine.unit}
                      onChange={(e) => update(index, 'unit', +e.target.value)}
                    >
                      {product.units.map((u, j) => (
                        <option key={j} value={j}>
                          {u.name}
                        </option>
                      ))}
                    </Select>
                  </td>
                  <td>
                    <Field label={'كمية ' + product.name + ' *'}>
                      <Input
                        data-row={index}
                        data-column="qty"
                        aria-label={'كمية ' + product.name}
                        required
                        disabled={isReadOnly}
                        type="number"
                        min=".000001"
                        step="any"
                        value={invoiceLine.qty}
                        onChange={(e) => update(index, 'qty', +e.target.value)}
                      />
                    </Field>
                  </td>
                  {!isSale && (
                    <td>
                      <Input
                        aria-label={'المجاني في الصف ' + (index + 1)}
                        disabled={isReadOnly}
                        type="number"
                        min="0"
                        step="any"
                        value={invoiceLine.free}
                        onChange={(e) => update(index, 'free', +e.target.value)}
                      />
                    </td>
                  )}
                  <td>
                    <Field label={'سعر ' + product.name + ' *'}>
                      <Input
                        aria-label={'سعر ' + product.name}
                        disabled={isReadOnly}
                        type="number"
                        min="0"
                        step="any"
                        value={invoiceLine.price}
                        onChange={(e) => update(index, 'price', +e.target.value)}
                      />
                    </Field>
                  </td>
                  <td>
                    <Field label={'خصم الصف ' + (index + 1)}>
                      <Input
                        aria-label={'خصم الصف ' + (index + 1)}
                        disabled={isReadOnly}
                        type="number"
                        min="0"
                        max={
                          isSale
                            ? Math.min(
                                product.maxDiscount,
                                systemSettings(workspace).sales.maxDiscount,
                              )
                            : 100
                        }
                        step="any"
                        value={+invoiceLine.discount.toFixed(6)}
                        onChange={(e) => update(index, 'discount', +e.target.value)}
                      />
                    </Field>
                  </td>
                  <td className="numeric strong">
                    {fmt(Math.max(0, lineTotal({ ...invoiceLine, invoiceDiscount: 0 })))}
                  </td>
                  {!isReadOnly && (
                    <td>
                      <Button
                        type="button"
                        aria-label={'حذف الصف ' + (index + 1)}
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => {
                          onChange(lines.filter((invoiceLine, i) => i !== index));
                          move(Math.min(index, lines.length - 1));
                        }}
                      >
                        <Trash2 size={15} />
                      </Button>
                    </td>
                  )}
                </tr>
              );
            })}
            {!isReadOnly && (
              <tr className="invoice-new-row">
                <td>{search(lines.length)}</td>
                <td colSpan={isSale ? 6 : 7}>
                  <span className="muted">
                    ابحث عن صنف أو امسح الباركود؛ تُحمّل بياناته في هذا الصف
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
