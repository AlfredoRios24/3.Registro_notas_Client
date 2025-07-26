import React, { useState } from "react";
import "./Table.css";

interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean; // Nueva propiedad para controlar si se puede ordenar
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
}

function Table<T>({ data, columns }: TableProps<T>) {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (key: keyof T, sortable?: boolean) => {
    if (!sortable) return; // Ignorar si la columna no es sortable

    const isAsc = sortColumn === key && sortOrder === "asc";
    setSortColumn(key);
    setSortOrder(isAsc ? "desc" : "asc");
  };

  const sortedData = React.useMemo(() => {
    if (!sortColumn) return data;

    return [...data].sort((a, b) => {
      const valA = a[sortColumn];
      const valB = b[sortColumn];

      if (typeof valA === "string" && typeof valB === "string") {
        return sortOrder === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      if (typeof valA === "number" && typeof valB === "number") {
        return sortOrder === "asc" ? valA - valB : valB - valA;
      }

      // Para valores ReactNode u otros tipos, no ordenar
      return 0;
    });
  }, [data, sortColumn, sortOrder]);

  return (
    <table className="sortable-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={String(col.key)}
              onClick={() => handleSort(col.key, col.sortable)}
              style={{ cursor: col.sortable ? "pointer" : "default" }}
              aria-sort={
                sortColumn === col.key
                  ? sortOrder === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
              title={col.sortable ? "Ordenar" : undefined}
            >
              {col.label}{" "}
              {sortColumn === col.key ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td key={String(col.key)}>{row[col.key] as React.ReactNode}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
