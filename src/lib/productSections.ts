/**
 * Product custom sections from the CMS.
 * Keep in sync with the CMS (mahalaxmi-enterprises-cms/src/lib/productSections.ts).
 */

export type ProductSectionType = "text" | "list" | "table" | "images";

export interface ProductSection {
  id: string;
  type: ProductSectionType;
  title: string;
  hidden?: boolean;
  content?: string;
  items?: string[];
  topHeader?: string;
  tablePropertyHeader?: string;
  tableHeaders?: string[];
  propertiesTable?: Array<{ property: string; value?: string; values?: string[] }>;
  images?: string[];
}

/** Image URLs must be http(s) or site-relative (no javascript:/data: links). */
const isSafeUrl = (u: string) => /^(https?:\/\/|\/)/i.test(u.trim());

const TYPES: ProductSectionType[] = ["text", "list", "table", "images"];
const str = (v: unknown) => (v === null || v === undefined ? "" : String(v));

/** Visible, well-formed sections only. */
export function normalizeSections(raw: unknown): ProductSection[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((s: any) => s && typeof s === "object" && TYPES.includes(s.type) && !s.hidden)
    .map((s: any, i: number) => ({
      ...s,
      id: str(s.id) || `section-${i}`,
      title: str(s.title).trim(),
      items: Array.isArray(s.items) ? s.items.map(str).filter(Boolean) : [],
      images: Array.isArray(s.images) ? s.images.map(str).filter(isSafeUrl) : [],
    }));
}
