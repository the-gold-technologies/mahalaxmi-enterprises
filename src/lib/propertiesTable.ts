/**
 * Normalizes a product's Physico-Chemical Properties table from the CMS.
 * Keep in sync with the CMS (mahalaxmi-enterprises-cms/src/lib/propertiesTable.ts).
 *
 *   tableHeaders:    names of the VALUE columns ([] = simple two-column table)
 *   propertiesTable: { property, values: [...] } per column, or { property, value } spanning all
 */

export interface NormalizedPropertyRow {
  property: string;
  /** One entry per column, or null when a single value spans every column */
  values: string[] | null;
  value: string;
}

export interface NormalizedPropertiesTable {
  headers: string[];
  colCount: number;
  rows: NormalizedPropertyRow[];
}

const PROPERTY_COLUMN_LABELS = [
  "property",
  "properties",
  "test property",
  "test property name",
  "parameter",
  "parameters",
  "characteristics",
];
const SINGLE_VALUE_LABELS = ["value", "values", "typical value", "typical values"];

const str = (v: unknown) => (v === null || v === undefined ? "" : String(v).trim());

export function normalizePropertiesTable(
  rawHeaders: unknown,
  rawRows: unknown,
): NormalizedPropertiesTable {
  const rows = (Array.isArray(rawRows) ? rawRows : [])
    .filter((r) => r && typeof r === "object")
    .map((r: any) => ({
      property: str(r.property),
      value: str(r.value),
      values: Array.isArray(r.values) && r.values.length > 0 ? r.values.map(str) : null,
    }))
    .filter((r) => r.property || r.value || r.values?.some(Boolean));

  const maxValues = rows.reduce((m, r) => Math.max(m, r.values?.length || 0), 0);
  let headers = Array.isArray(rawHeaders) ? rawHeaders.map(str) : [];

  // Legacy data saved headers as ["Property", "Value"]: the first one labels the property column
  if (
    headers.length > 0 &&
    PROPERTY_COLUMN_LABELS.includes(headers[0].toLowerCase()) &&
    (maxValues === 0 || maxValues === headers.length - 1)
  ) {
    headers = headers.slice(1);
  }
  if (
    headers.length === 1 &&
    maxValues === 0 &&
    SINGLE_VALUE_LABELS.includes(headers[0].toLowerCase())
  ) {
    headers = [];
  }

  const colCount = Math.max(headers.length, maxValues, 1);
  while (headers.length > 0 && headers.length < colCount) headers.push("");

  const padded = rows.map((r): { property: string; value: string; values: string[] | null } => {
    if (!r.values) return r;
    const values = r.values.slice(0, colCount);
    while (values.length < colCount) values.push("");
    return { ...r, values };
  });

  // Drop columns that are completely empty (no header text and no cell value)
  const keep = Array.from(
    { length: colCount },
    (_, c) => Boolean(headers[c]) || padded.some((r) => r.values?.[c]),
  );
  const keptCount = keep.filter(Boolean).length;
  // Spanning rows still need at least one column to sit in
  const finalCount = Math.max(keptCount, 1);
  const finalHeaders = keptCount ? headers.filter((_, c) => keep[c]) : [];

  return {
    headers: finalHeaders.some(Boolean) ? finalHeaders : [],
    colCount: finalCount,
    rows: padded
      .map((r) => {
        const values = r.values
          ? keptCount
            ? r.values.filter((_: string, c: number) => keep[c])
            : [""]
          : null;
        if (!values || finalCount === 1) {
          return { property: r.property, value: values ? values[0] : r.value, values: null };
        }
        return { property: r.property, value: r.value, values };
      })
      // A row is empty when neither its property nor any visible value has text
      .filter((r) => r.property || r.value || r.values?.some(Boolean)),
  };
}
