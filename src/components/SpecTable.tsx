"use client";

import React from "react";
import { normalizePropertiesTable } from "@/lib/propertiesTable";

interface SpecTableProps {
  title?: string;
  /** Text in the solid top banner bar; omitted/blank hides the bar */
  topHeader?: string;
  /** Title of the first (property name) column */
  propertyHeader?: string;
  tableHeaders: unknown;
  rows: unknown;
}

/** Product properties table card (Physico-Chemical Properties and custom table sections). */
export function SpecTable({
  title,
  topHeader,
  propertyHeader,
  tableHeaders,
  rows,
}: SpecTableProps) {
  const specTable = normalizePropertiesTable(tableHeaders, rows);
  if (specTable.rows.length === 0) return null;

  const propertyTitle = propertyHeader?.trim() || "";
  // Hide the property (first) column when it has no title and no row uses it
  const showPropertyCol = !!propertyTitle || specTable.rows.some((r) => r.property);
  const hasHeaderRow = specTable.headers.length > 0 || !!propertyTitle;
  const colCount = specTable.colCount;
  const banner = topHeader?.trim();
  const heading = title?.trim();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs pt-4">
      {heading && (
        <div className="px-6 pb-3">
          <h3 className="text-base sm:text-lg font-bold text-[#002b5c] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#eb1e25]" /> {heading}
          </h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-sans border-collapse">
          {(banner || hasHeaderRow) && (
            <thead>
              {banner && (
                <tr className="bg-[#002b5c] text-white">
                  <th
                    colSpan={colCount + (showPropertyCol ? 1 : 0)}
                    className="py-3 px-4 text-center font-extrabold uppercase border-b border-[#002b5c]"
                  >
                    {banner}
                  </th>
                </tr>
              )}
              {hasHeaderRow && (
                <tr className="bg-[#002b5c] text-white border-t border-white/20">
                  {showPropertyCol && (
                    <th
                      scope="col"
                      className="py-2 px-4 text-left font-bold border-r border-white/20 whitespace-pre-line"
                    >
                      {propertyTitle}
                    </th>
                  )}
                  {specTable.headers.length === 0 && (
                    <th scope="col" colSpan={colCount}>
                      <span className="sr-only">Value</span>
                    </th>
                  )}
                  {specTable.headers.map((hdr, hIdx) => (
                    <th
                      key={hIdx}
                      scope="col"
                      className="py-2 px-4 text-center font-bold border-r border-white/20 last:border-r-0 whitespace-pre"
                    >
                      {hdr}
                    </th>
                  ))}
                </tr>
              )}
            </thead>
          )}
          <tbody>
            {specTable.rows.map((row, rIdx) => (
              <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                {showPropertyCol && (
                  <th
                    scope="row"
                    className="py-2.5 px-4 font-semibold text-slate-700 border-b border-r border-slate-200 text-left min-w-[180px] whitespace-pre-line"
                  >
                    {row.property}
                  </th>
                )}
                {row.values ? (
                  row.values.map((v, vIdx) => (
                    <td
                      key={vIdx}
                      className="py-2.5 px-4 text-slate-900 font-bold border-b border-r border-slate-200 last:border-r-0 text-center whitespace-pre"
                    >
                      {v}
                    </td>
                  ))
                ) : (
                  <td
                    colSpan={colCount}
                    className="py-2.5 px-4 text-slate-900 font-bold border-b border-slate-200 text-center whitespace-pre-line"
                  >
                    {row.value}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
