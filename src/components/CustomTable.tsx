import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ArrowUpDown } from "lucide-react";

interface CustomTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  caption?: string;
  searchValues: Record<string, string>;
  sortConfig: SortConfig<T>;
  onSortChange?: (config: SortConfig<T>) => void;
  onSearchChange?: (values: Record<string, string>) => void;
}

const CustomTable = <T extends Record<string, any>>({
  columns,
  data,
  caption,
  searchValues,
  sortConfig,
  onSortChange,
  onSearchChange,
}: CustomTableProps<T>) => {
  // Helper functions
  const handleSort = (field: keyof T) => {
    if (!onSortChange) return;

    const direction = 
      sortConfig.field === field 
        ? sortConfig.direction === "asc"
          ? "desc"
          : sortConfig.direction === "desc"
            ? null
            : "asc"
        : "asc";

    onSortChange({ field, direction });
  };

  const handleSearch = (field: keyof T, value: string) => {
    if (!onSearchChange) return;

    onSearchChange({
      ...searchValues,
      [field]: value,
    });
  };

  const getSortIcon = (column: TableColumn<T>) => {
    if (!column.sortable) return null;

    const isActive = sortConfig.field === column.field;
    const direction = isActive ? sortConfig.direction : null;

    return (
      <ArrowUpDown
        className={`h-4 w-4 cursor-pointer transition-colors
          ${isActive ? "text-primary" : "text-gray-400"}
          ${direction === "asc" ? "rotate-180" : ""}
          hover:text-primary`}
        onClick={() => handleSort(column.field)}
      />
    );
  };

  const getColumnAlignment = (align?: string) => {
    switch (align) {
      case "right":
        return "text-right";
      case "center":
        return "text-center";
      default:
        return "text-left";
    }
  };

  // Render functions
  const renderHeaderCell = (column: TableColumn<T>, index: number) => (
    <TableHead
      key={index}
      className={`
        ${column.width ? `w-[${column.width}]` : ""}
        ${getColumnAlignment(column.align)}
      `}
    >
      <div className="flex items-center justify-between gap-2">
        <span>{column.header}</span>
        {getSortIcon(column)}
      </div>
    </TableHead>
  );

  const renderSearchCell = (column: TableColumn<T>, index: number) => (
    <TableHead key={`search-${index}`}>
      {column.searchable && (
        <Input
          placeholder={`Search ${column.header.toLowerCase()}...`}
          value={searchValues[column.field as string] || ""}
          onChange={(e) => handleSearch(column.field, e.target.value)}
          className="h-8"
        />
      )}
    </TableHead>
  );

  const renderDataCell = (row: T, column: TableColumn<T>, rowIndex: number, colIndex: number) => (
    <TableCell
      key={`${rowIndex}-${colIndex}`}
      className={getColumnAlignment(column.align)}
    >
      {column.render
        ? column.render(row[column.field], row)
        : row[column.field]}
    </TableCell>
  );

  return (
    <div className="w-full overflow-auto">
      <Table>
        {caption && <TableCaption>{caption}</TableCaption>}

        <TableHeader>
          <TableRow>
            {columns.map((column, index) => renderHeaderCell(column, index))}
          </TableRow>

          <TableRow>
            {columns.map((column, index) => renderSearchCell(column, index))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => 
                renderDataCell(row, column, rowIndex, colIndex)
              )}
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-4">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomTable;